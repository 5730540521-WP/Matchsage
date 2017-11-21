const { Router } = require('express')
const AuthServ = require('../services/auth')
const UserServ = require('../services/user')
const UserModel = require('../models/user')
const _ = require('lodash')

let router = Router()
const filteredUserKeys = ['user_id', 'email', 'first_name', 'last_name', 'gender', 'user_type', 'address', 'contact']

// search users admin purpose
router.get('/', AuthServ.isAuthenticated, async (req, res) => {
  const keyword = req.query.keyword || ''
  let opts = req.query
  delete opts.keyword
  const users = await UserModel.findWithRegexp(keyword, opts)
  res.json({ users: _.map(users, user => _.pick(user, filteredUserKeys)) })
})
// get user detail
router.get('/:id', AuthServ.isAuthenticated, async (req, res, next) => {
  try {
    const user = await UserModel.findByUserId(req.params.id)
    res.json(_.pick(user, filteredUserKeys))
  } catch (error) {
    next(error)
  }
})

router.post('/add-credit-card', AuthServ.isAuthenticated, async (req, res, next) => {
  try {
    await UserServ.addCreditCard(req.user.user_id, req.body)
    res.json({ success: true })
  } catch (error) {
    next(error)
  }
})

router.post('/add-bank-account', AuthServ.isAuthenticated, async (req, res, next) => {
  try {
    await UserServ.addBankAccount(req.user.user_id, req.body)
    res.json({ success: true })
  } catch (error) {
    next(error)
  }
})

// update user detail
router.post('/:id/update', AuthServ.isAuthenticated, async (req, res, next) => {
  try {
    if (req.user.user_id !== req.params.id) {
      const error = new Error('Unauthorized')
      error.status = 401
      throw error
    }
    await UserModel.findOneAndUpdate({ user_id: req.params.id }, req.body)
    res.json({ success: true })
  } catch (error) {
    next(error)
  }
})

module.exports = router
