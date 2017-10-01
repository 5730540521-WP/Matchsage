const { version } = require('../../package.json')
const { Router } = require('express')
// const UserService = require( '../services/user'
const UserModel = require('../models/user')
const AuthService = require('../services/auth')

const _ = require('lodash')

const filteredUserKeys = [ 'email', 'first_name', 'last_name' ]

let api = Router()

api.post('/signup', async (req, res) => {
  try {
    const newUser = await AuthService.signUp(req.body)
    res.json(_.pick(newUser, filteredUserKeys))
  } catch (error) {
    console.error(error)
    return res.status(error.status).send(error.message)
  }
})

api.post('/auth', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await AuthService.authenticateUser({ email, password })
    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(error.status).send(error.message)
  }
})

  // users
api.get('/users', async (req, res) => {
  const users = await UserModel.find({})
  res.json(_.map(users, user => _.pick(user, filteredUserKeys)))
})

api.get('/', (req, res) => {
  res.json({ version })
})

module.exports = api
