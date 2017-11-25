const { Router } = require('express')
const _ = require('lodash')

const ExpressJoi = require('express-joi-validator')
const Joi = require('joi')

const AuthServ = require('../services/auth')
const RatingServ = require('../services/rating')

let router = Router()

router.post('/:id/rate', AuthServ.isAuthenticated, ExpressJoi({
  body: {
    score: Joi.number().required(),
    rating_type: Joi.string().required().valid('employee'),
    price: Joi.number().optional(),
    payment_date: Joi.string().optional()
  }
}), async (req, res, next) => {
  try {
    const opts = Object.assign(req.body, { employee_id: req.params.id, customer_id: req.user.user_id })
    await RatingServ.rate(opts)
    res.json({ success: true })
  } catch (error) {
    next(error)
  }
})

module.exports = router

//Done validating