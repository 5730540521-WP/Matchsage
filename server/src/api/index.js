const { version } = require('../../package.json')
const { Router } = require('express')
const AuthService = require('../services/auth')
const jwt = require('jsonwebtoken')
const apiUsers = require('./users')
const apiServices = require('./services')
const apiReserves = require('./reservations')

const _ = require('lodash')

let api = Router()

api.use('/users', apiUsers)
api.use('/services', apiServices)
api.use('/reservations', apiReserves)

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
  req.user = undefined
  res.send('Logout successful!')
})

api.get('/', (req, res) => {
  res.json({ version })
})

module.exports = api
