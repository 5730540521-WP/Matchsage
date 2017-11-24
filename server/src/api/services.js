const { Router } = require('express')
const _ = require('lodash')

const AuthServ = require('../services/auth')
const ServiceServ = require('../services/service')
const RatingServ = require('../services/rating')
const ServiceModel = require('../models/service')
const EmployeeModel = require('../models/employee')
const UserModel = require('../models/user')

// Services api
let router = Router()

const filteredServiceKeys = require('../config/filter').filteredServiceKeys

// search services
router.get('/', AuthServ.isAuthenticated, async (req, res) => {
  req.query.is_delete = false
  const services = await ServiceModel.find(req.query)
  res.json({ services: _.map(services, service => _.pick(service, filteredServiceKeys)) })
})

router.get('/search', AuthServ.isAuthenticated, async (req, res) => {
  const rating = parseFloat(req.query.rating) || 0
  const services = await ServiceModel.findWithRegexp({ service_name: req.query.service_name, rating })
  res.json({ services: _.map(services, service => _.pick(service, filteredServiceKeys)) })
})

router.get('/:id', AuthServ.isAuthenticated, async (req, res, next) => {
  try {
    const service = await ServiceModel.findOne({ service_id: req.params.id, is_delete: false })
    res.json(_.pick(service, filteredServiceKeys))
  } catch (error) {
    next(error)
  }
})

router.post('/new', AuthServ.isAuthenticated, async (req, res, next) => {
  try {
    const user = await UserModel.findByUserId(req.user.user_id)
    if (user.user_type !== 'owner') {
      const err = new Error('Unauthorized. Invalid user type.')
      err.status = 401
      throw err
    }
    const body = req.body
    body.owner_id = req.user.user_id
    const newService = await ServiceServ.createService(body)
    res.json(_.pick(newService, filteredServiceKeys))
  } catch (error) {
    next(error)
  }
})

router.get('/:id/avai_employees', AuthServ.isAuthenticated, async (req, res) => {
  const date = req.query.date || '2000-12-20'
  const startTime = req.query.start_time || '2500'
  const endTime = req.query.end_time || '2500'
  const serviceId = req.params.id
  const employees = await ServiceServ.getAvailableEmployees({ date, start_time: startTime, end_time: endTime, serviceId })
  res.send(employees)
})

router.get('/:id/employees', AuthServ.isAuthenticated, async(req, res) => {
  const serviceId = req.params.id
  const options = Object.assign(req.query, { work_for: serviceId })
  const employees = await EmployeeModel.find(options)
  res.json({ employees })
})

router.post('/:id/add_employee', AuthServ.isAuthenticated, async (req, res, next) => {
  try {
    await ServiceServ.addEmployee(req.params.id, req.body)
    res.json({ success: true })
  } catch (error) {
    next(error)
  }
})

router.post('/:id/update', AuthServ.isAuthenticated, async (req, res, next) => {
  try {
    await ServiceModel.updateService(req.params.id, req.body)
    res.json({ success: true })
  } catch (error) {
    next(error)
  }
})

router.post('/:id/rate', AuthServ.isAuthenticated, async (req, res, next) => {
  try {
    const opts = Object.assign(req.body, { service_id: req.params.id, customer_id: req.user.user_id })
    await RatingServ.rate(opts)
    res.json({ success: true })
  } catch (error) {
    next(error)
  }
})

router.get('/:id/delete', AuthServ.isAuthenticated, async (req, res, next) => {
  try {
    if (req.admin) {
      await ServiceServ.deleteService('admin', req.params.id)
    } else {
      await ServiceServ.deleteService(req.user.user_id, req.params.id)
    }
    res.json({ success: true })
  } catch (error) {
    next(error)
  }
})

router.get('/:id/reservations', AuthServ.isAuthenticated, async (req, res, next) => {
  try {
    const service = await ServiceModel.findByServiceId(req.params.id)
    if (service.owner_id !== req.user.user_id) {
      const error = new Error('UnAuthorized. Only service owner can access this information.')
      error.status = 401
      throw error
    }
    const reserveList = await ServiceServ.getReservations(req.params.id)
    res.json({reservations: reserveList})
  } catch (error) {
    next(error)
  }
})

/* async function validate (req) {
  if (req.admin) return
  const user = await UserModel.findByUserId(req.user.user_id)
  const service = await ServiceModel.findByServiceId(req.params.id)
  if (user.user_type !== 'owner') {
    const err = new Error('Unauthorized. Invalid user type.')
    err.status = 401
    throw err
  }
  if (user.user.id !== service.owner_id) {
    const err = new Error('Unauthorized. Only owner of this service can access this information.')
    err.status = 401
    throw err
  }
} */

module.exports = router
