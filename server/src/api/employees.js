const { Router } = require('express')
const _ = require('lodash')

const AuthServ = require('../services/auth')
const RatingServ = require('../services/rating')

let router = Router()

router.post('/:id/rate', AuthServ.isAuthenticated, async (req, res, next) => {
  try {
    const opts = Object.assign(req.body, { employee_id: req.params.id, customer_id: req.user.user_id })
    await RatingServ.rate(opts)
    res.json({ success: true })
  } catch (error) {
    next(error)
  }
})

module.exports = router
