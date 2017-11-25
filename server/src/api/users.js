const { Router } = require('express')
const AuthServ = require('../services/auth')
const UserServ = require('../services/user')
const UserModel = require('../models/user')
const PaymentAccountModel = require('../models/payment-account')
const _ = require('lodash')
const ServiceModel = require('../models/service')

let router = Router()
const filters = require('../config/filter')

// search users admin purpose
router.get('/', AuthServ.isAuthenticated, async (req, res) => {
  const keyword = req.query.keyword || ''
  let opts = req.query
  delete opts.keyword
  const users = await UserModel.findWithRegexp(keyword, opts)
  res.json({ users: _.map(users, user => _.pick(user, filters.user)) })
})
// get user detail
router.get('/:id', AuthServ.isAuthenticated, async (req, res, next) => {
  try {
    const user = await UserModel.findByUserId(req.params.id)
    res.json(_.pick(user, filters.user))
  } catch (error) {
    next(error)
  }
})

router.post('/:id/add-credit-card', AuthServ.isAuthenticated, async (req, res, next) => {
  try {
    if (req.user.user_id !== req.params.id) {
      const error = new Error('Unauthorized')
      error.status = 401
      throw error
    }
    await UserServ.addCreditCard(req.user.user_id, req.body)
    res.json({ success: true })
  } catch (error) {
    next(error)
  }
})

router.post('/:id/add-bank-account', AuthServ.isAuthenticated, async (req, res, next) => {
  try {
    if (req.user.user_id !== req.params.id) {
      const error = new Error('Unauthorized')
      error.status = 401
      throw error
    }
    await UserServ.addBankAccount(req.user.user_id, req.body)
    res.json({ success: true })
  } catch (error) {
    next(error)
  }
})

router.get('/:id/payment_accounts', AuthServ.isAuthenticated, async (req, res, next) => {
  try {
    if (req.user.user_id !== req.params.id) {
      const error = new Error('Unauthorized')
      error.status = 401
      throw error
    }
    const accounts = await PaymentAccountModel.findByUserId(req.user.user_id)
    res.json({ payment_accounts: _.map(accounts, account => _.pick(account, filters.payment)) })
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

router.get('/:id/reservations', AuthServ.isAuthenticated, async (req, res, next) => {
  try {
    const user = await UserModel.findByUserId(req.user.user_id)
    if (user.user_id !== req.params.id) {
      const error = new Error('Unauthorized')
      error.status = 401
      throw error
    }
    if (user.user_type !== 'customer') {
      const error = new Error(`Invalid user type. expected 'customer' but get ${user.user_type}.`)
      error.status = 401
      throw error
    }
    const reserveList = await UserServ.getReserveListByCustomer(user.user_id)
    res.json({reservations: reserveList})
  } catch (error) {
    next(error)
  }
})

router.get('/:id/delete', AuthServ.isAuthenticatedAdmin, async (req, res, next) => {
  try {
    await UserServ.deleteUser(req.params.id)
    res.json({success: true})
  } catch (error) {
    next(error)
  }
})

module.exports = router
