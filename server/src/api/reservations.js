const { Router } = require('express')
const _ = require('lodash')
const Moment = require('moment')
const AuthServ = require('../services/auth')
const ReserveModel = require('../models/reservation')
const ReserveServ = require('../services/reservation')
const UserModel = require('../models/user')
const ServiceModel = require('../models/service')
const EmailServ = require('../services/email')
const ReceiptModel = require('../models/receipt')
const PaymentAccountModel = require('../models/payment-account')

const ExpressJoi = require('express-joi-validator')
const Joi = require('joi')

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

router.post('/new', AuthServ.isAuthenticated, ExpressJoi({
  body: {
    date_reserved: Joi.string(),
    start_time: Joi.string(),
    end_time: Joi.string(),
    service_id: Joi.string(),
    employee_id: Joi.string(),
    payment_number: Joi.string()
  }
}), async (req, res, next) => {
  try {
    const user = await UserModel.findByUserId(req.user.user_id)
    if (!_.includes(user.payment_accounts, req.body.payment_number)) {
      const err = new Error('Invalid payment number')
      err.status = 400
      throw err
    }

    const dateReserved = req.body.date_reserved
    const startTime = req.body.start_time
    const endTime = req.body.end_time

    const service = await ServiceModel.findByServiceId(req.body.service_id)
    const price = service.price_per_hour * (parseInt(endTime) * 1.0 / 100 - parseInt(startTime) * 1.0 / 100)

    const dateCreated = Moment().format('YYYY-MM-DD')

    await ReserveServ.makeDepositPayment(user.user_id, price, req.body.payment_number)

    const body = Object.assign({}, req.body, {
      date_reserved: dateReserved,
      date_created: dateCreated,
      start_time: startTime,
      end_time: endTime,
      paid_status: 'deposit-paid',
      customer_id: req.user.user_id,
      price,
      employee_id: req.body.employee_id
    })
    const reserve = await ReserveModel.createReservation(body)
    const paymentAccount = await PaymentAccountModel.findByNumber(req.body.payment_number)
    const receiptInput = Object.assign({ payment_method: paymentAccount.method, reservation_id: reserve.reserve_id, payment_date: body.date_reserved, payment_type: 'deposit-paid', price: price }, body)
    await ReceiptModel.createReceipt(receiptInput)
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
    const reserve = await ReserveModel.findByReservationId(req.params.id)
    await ReserveServ.makeFullPayment(req.user.user_id, req.params.id, req.body.payment_number)
    const receiptInput = Object.assign({ customer_id: req.user.user_id, reservation_id: reserve.reserve_id, payment_type: 'full-paid', price: reserve.price, payment_date: reserve.date_reserved })
    await ReceiptModel.createReceipt(receiptInput)
    res.json({ success: true })
  } catch (error) {
    next(error)
  }
})

module.exports = router
