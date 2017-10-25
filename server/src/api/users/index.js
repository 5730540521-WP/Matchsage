const { Router } = require('express')
const AuthService = require('services/auth')
const UserModel = require('models/user')
const _ = require('lodash')

let router = Router()
const filteredUserKeys = ['user_id', 'email', 'first_name', 'last_name', 'user_type']

router.get('/', AuthService.isAuthenticated, async (req, res) => {
  const users = await UserModel.find()
  res.json({ users: _.map(users, user => _.pick(user, filteredUserKeys)) })
})

// get user detail
router.get('/:id', AuthService.isAuthenticated, async (req, res, next) => {
  try {
    const user = await UserModel.findByUserId(req.params.id)
    res.json(_.pick(user, filteredUserKeys))
  } catch (error) {
    next(error)
  }
})

module.exports = router
