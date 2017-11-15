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

const filteredServiceKeys = ['service_id', 'service_name', 'contact_number', 'owner_id']

// search services
router.get('/', AuthServ.isAuthenticated, async (req, res) => {
  const rating = parseFloat(req.query.rating) || 0
  const services = await ServiceModel.findWithRegexp({ service_name: req.query.service_name, rating })
  res.json({ services: _.map(services, service => _.pick(service, filteredServiceKeys)) })
})

router.post('/new', AuthServ.isAuthenticated, async (req, res, next) => {
  try {
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

module.exports = router
