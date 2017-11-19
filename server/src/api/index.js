const { version } = require('../../package.json')
const { Router } = require('express')
const AuthServ = require('../services/auth')
const jwt = require('jsonwebtoken')
const userRoute = require('./users')
const serviceRoute = require('./services')
const reserveRoute = require('./reservations')
const employeeRoute = require('./employees')
const complaintRouter = require('./complaint')

const _ = require('lodash')

let api = Router()

api.use('/users', userRoute)
api.use('/services', serviceRoute)
api.use('/reservations', reserveRoute)
api.use('/employees', employeeRoute)
api.use('/complaint', complaintRouter)

// user signup
api.post('/signup', async (req, res, next) => {
  try {
    const newUser = await AuthServ.signup(req.body)
    res.json({ token: jwt.sign({ user_id: newUser.user_id, user_type: newUser.user_type }, 'MATCHSAGE_USER') })
  } catch (error) {
    next(error)
  }
})

// user authentication
api.post('/auth', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await AuthServ.authenticateUser({ email, password })
    res.json({ token: jwt.sign({ user_id: user.user_id, user_type: user.user_type }, 'MATCHSAGE_USER') })
  } catch (error) {
    next(error)
  }
})

// admin signup
api.post('/admin-signup', async (req, res, next) => {
  try {
    const newAdmin = await AuthServ.signupAdmin(req.body)
    res.json({ token: jwt.sign({ admin_id: newAdmin.admin_id }, 'MATCHSAGE_ADMIN') })
  } catch (error) {
    next(error)
  }
})

// admin authentication
api.post('/admin-auth', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const admin = await AuthServ.authenticateAdmin({ email, password })
    res.json({ token: jwt.sign({ admin_id: admin.admin_id }, 'MATCHSAGE_ADMIN') })
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
