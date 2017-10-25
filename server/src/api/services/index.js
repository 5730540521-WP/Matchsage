const { Router } = require('express')
const _ = require('lodash')

const AuthService = require('services/auth')
const UserService = require('services/user')
const ServiceModel = require('models/service')

let router = Router()

const filteredServiceKeys = ['service_id', 'service_name', 'contact_number', 'owner_id']

// get all services
router.get('/', AuthService.isAuthenticated, async (req, res) => {
  const services = await ServiceModel.find()
  res.json({ services: _.map(services, service => _.pick(service, filteredServiceKeys)) })
})
// create a new service
router.post('/new', AuthService.isAuthenticated, async (req, res, next) => {
  try {
    const body = req.body
    body.owner_id = req.user
    const newService = await UserService.createService(body)
    res.json(_.pick(newService, filteredServiceKeys))
  } catch (error) {
    next(error)
  }
})

module.exports = router
