const { version } = require('../../package.json')
const { Router } = require('express')
const UserModel = require('../models/user')
const AuthService = require('../services/auth')
const jwt = require('jsonwebtoken')

const _ = require('lodash')

const filteredUserKeys = [ 'email', 'first_name', 'last_name' ]

let api = Router()

api.post('/signup', async (req, res) => {
  try {
    const newUser = await AuthService.signUp(req.body)
    const filteredUser = _.pick(newUser, filteredUserKeys)
    res.json({ token: jwt.sign(filteredUser, 'RESTFULAPIS') })
  } catch (error) {
    console.error(error)
    return res.status(error.status).json({ message: error.message })
  }
})

api.post('/auth', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await AuthService.authenticateUser({ email, password })
    const filteredUser = _.pick(user, filteredUserKeys)
    res.json({ token: jwt.sign(filteredUser, 'RESTFULAPIS') })
  } catch (error) {
    console.error(error)
    res.status(error.status).json({ message: error.message })
  }
})

  // users
api.get('/users', isAuthenticated, async (req, res) => {
  const users = await UserModel.find({})
  res.json({ Users: _.map(users, user => _.pick(user, filteredUserKeys)), actor: req.user
  })
})

api.get('/', (req, res) => {
  res.json({ version })
})

function isAuthenticated (req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.user) return next()
  // if they aren't redirect them to the home page
  return res.status(401).json({ message: 'Unauthorized. Please log in before proceed.' })
}

module.exports = api
