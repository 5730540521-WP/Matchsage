import { version } from '../../package.json'
import { Router } from 'express'
// import UserService from '../services/user'
import UserModel from '../models/user'
import AuthService from '../services/auth'

import _ from 'lodash'

const filteredUserKeys = [ 'email', 'first_name', 'last_name' ]

export default ({ config, db }) => {
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

  // api.post('/user/new', async (req, res) => {
  //   const body = req.body
  //   const user = await UserService.createUser(body)
  //   res.send(`${user.email} user created.`)
  // })

  api.get('/', (req, res) => {
    res.json({ version })
  })

  return api
}
