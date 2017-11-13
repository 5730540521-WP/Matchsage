const { Router } = require('express')
const _ = require('lodash')

const AuthServ = require('../services/auth')
const RatingServ = require('../services/rating')
const UserModel = require('../models/user')

let router = Router()

router.post('/:id/rate', AuthServ.isAuthenticated, async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user._id)
    const opts = Object.assign(req.body, { employee_id: req.params.id, customer_id: user.user_id })
    await RatingServ.rate(opts)
    res.json({ success: true })
  } catch (error) {
    next(error)
  }
})

module.exports = router
