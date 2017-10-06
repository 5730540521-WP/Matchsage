const { version } = require('../../package.json')
const { Router } = require('express')
const UserModel = require('../models/user')
const ServiceModel = require('../models/service')
const AuthService = require('../services/auth')
const UserService = require('../services/user')
const jwt = require('jsonwebtoken')

const _ = require('lodash')

const filteredUserKeys = [ 'user_id', 'email', 'first_name', 'last_name', 'user_type' ]
const filteredServiceKeys = [ 'service_id', 'service_name', 'contact_number', 'owner_id' ]

let api = Router()

// sign up
api.post('/signup', async (req, res, next) => {
  try {
    const newUser = await AuthService.signUp(req.body)
    res.json({ token: jwt.sign({ _id: newUser._id }, 'RESTFULAPIS') })
  } catch (error) {
    next(error)
  }
})

// authentication
api.post('/auth', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await AuthService.authenticateUser({ email, password })
    res.json({ token: jwt.sign({ _id: user._id }, 'RESTFULAPIS') })
  } catch (error) {
    next(error)
  }
})

// get all users
api.get('/users', isAuthenticated, async (req, res) => {
  const users = await UserModel.find()
  res.json({ users: _.map(users, user => _.pick(user, filteredUserKeys)) })
})

// get user detail
api.get('/users/:id', isAuthenticated, async (req, res, next) => {
  try {
    const user = await UserModel.findByUserId(req.params.id)
    res.json(_.pick(user, filteredUserKeys))
  } catch (error) {
    next(error)
  }
})

// create a new service
api.post('/services/new', isAuthenticated, async (req, res, next) => {
  try {
    const body = req.body
    body.owner_id = req.user
    const newService = await UserService.createService(body)
    res.json(_.pick(newService, filteredServiceKeys))
  } catch (error) {
    next(error)
  }
})

// get all services
api.get('/services', isAuthenticated, async (req, res) => {
  const services = await ServiceModel.find()
  res.json({ services: _.map(services, service => _.pick(service, filteredServiceKeys)) })
})

api.get('/', (req, res) => {
  res.json({ version })
})

function isAuthenticated (req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.user) return next()
  // if they aren't throw an error
  return res.status(401).json({ message: 'Unauthorized. Please log in before proceed.' })
}

module.exports = api
