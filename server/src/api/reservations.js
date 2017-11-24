const { Router } = require('express')
const _ = require('lodash')
const AuthServ = require('../services/auth')
const ReserveModel = require('../models/reservation')
const ReserveServ = require('../services/reservation')
const UserModel = require('../models/user')
const ServiceModel = require('../models/service')
const EmailServ = require('../services/email')

// Reservations api
let router = Router()

const filteredReservationKeys = require('../config/filter').reservation
router.get('/', AuthServ.isAuthenticated, async (req, res, next) => {
  try {
    const reserves = await ReserveModel.find(req.query)
    res.json({ reservations: _.map(reserves, reserve => _.pick(reserve, filteredReservationKeys)) })
  } catch (error) {
    next(error)
  }
})

router.get('/:id', AuthServ.isAuthenticated, async (req, res, next) => {
  try {
    const reserve = await ReserveModel.findByReservationId(req.params.id)
    const user = await UserModel.findByUserId(req.user.user_id)
    const service = await ServiceModel.findByServiceId(reserve.service_id)
    if (user.user_type === 'customer' && user.user_id !== reserve.customer_id) {
      const error = new Error('Only customer of this reservation can access the reservation.')
      error.status = 400
      throw error
    } else if (user.user_type === 'owner' && user.user_id !== service.owner_id) {
      const error = new Error('Only service owner of this reservation can access the reservation.')
      error.status = 400
      throw error
    }
    res.json(_.pick(reserve, filteredReservationKeys))
  } catch (error) {
    next(error)
  }
})

router.post('/new', AuthServ.isAuthenticated, async (req, res, next) => {
  try {
    const date = req.body.date || '2000-12-20'
    const startTime = req.body.start_time || '2500'
    const endTime = req.body.end_time || '2500'
    const paidStatus = req.body.paid_status || 'pending'

    const service = await ServiceModel.findByServiceId(req.body.service_id)
    const price = service.price_per_hour * (parseInt(endTime) * 1.0 / 100 - parseInt(startTime) * 1.0 / 100)
    const body = Object.assign({}, req.body, { date, start_time: startTime, end_time: endTime, paid_status: paidStatus, customer_id: req.user.user_id, price })
    const reserve = await ReserveModel.createReservation(body)
    res.json(reserve)
    await EmailServ.mailConfirmReservation(reserve.reserve_id)
  } catch (error) {
    next(error)
  }
})

router.get('/:id/cancel', AuthServ.isAuthenticated, async (req, res, next) => {
  try {
    await ReserveServ.cancelReservation(req.user.user_id, req.params.id)
    res.send({ success: true })
  } catch (error) {
    next(error)
  }
})

router.post('/:id/make-full-payment', AuthServ.isAuthenticated, async (req, res, next) => {
  try {
    await ReserveServ.makeFullPayment(req.user.user_id, req.params.id, req.body.payment_number)
    res.json({ success: true })
  } catch (error) {
    next(error)
  }
})

module.exports = router
