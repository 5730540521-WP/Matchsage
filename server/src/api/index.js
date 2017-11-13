const { version } = require('../../package.json')
const { Router } = require('express')
const AuthService = require('../services/auth')
const jwt = require('jsonwebtoken')
const userRoute = require('./users')
const serviceRoute = require('./services')
const reserveRoute = require('./reservations')
const employeeRoute = require('./employees')

const _ = require('lodash')

let api = Router()

api.use('/users', userRoute)
api.use('/services', serviceRoute)
api.use('/reservations', reserveRoute)
api.use('/employees', employeeRoute)

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

// logout
api.post('/signout', (req, res) => {
  res.send('Logout successful!')
})

api.get('/', (req, res) => {
  res.json({ version })
})

module.exports = api
