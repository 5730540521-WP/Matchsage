const { Router } = require('express')
const _ = require('lodash')

const AuthServ = require('../services/auth')
const ServiceServ = require('../services/service')
const ServiceModel = require('../models/service')
const EmployeeModel = require('../models/employee')
// Services api
let router = Router()

const filteredServiceKeys = ['service_id', 'service_name', 'contact_number', 'owner_id']

// search services
router.get('/', AuthServ.isAuthenticated, async (req, res) => {
  const services = await ServiceModel.find(req.query)
  res.json({ services: _.map(services, service => _.pick(service, filteredServiceKeys)) })
})

router.post('/new', AuthServ.isAuthenticated, async (req, res, next) => {
  try {
    const body = req.body
    body.owner_id = req.user._id
    const newService = await ServiceServ.createService(body)
    res.json(_.pick(newService, filteredServiceKeys))
  } catch (error) {
    next(error)
  }
})

router.get('/:id/avai_employees', AuthServ.isAuthenticated, async (req, res) => {
  const { date, start_time, end_time } = req.query
  const serviceId = req.params.id
  const employees = await ServiceServ.getAvailableEmployees({ date, start_time, end_time, serviceId })
  return employees
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

module.exports = router
