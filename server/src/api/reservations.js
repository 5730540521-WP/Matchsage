const { Router } = require('express')
const _ = require('lodash')
const AuthServ = require('../services/auth')
const ReserveModel = require('../models/reservation')
const ReserveServ = require('../services/reservation')

// Reservations api
let router = Router()

const filteredReserveKeys = ['reserve_id','service_id','customer_id','employee_id','start_time',
  'end_time','date','is_cancel','paid_status']

router.get('/', AuthServ.isAuthenticated, async (req, res, next) => {
  try {
    const reserves = await ReserveModel.find(req.query)
    res.json({ reservations: _.map(reserves, reserve => _.pick(reserve, [])) })
  } catch (error) {
    next(error)
  }
})

router.get('/:id', AuthServ.isAuthenticated, async (req, res, next) => {
  try {
    const reserve = await ReserveModel.findByReservationId(req.params.id)
    if(req.user.user_id !== reserve.customer_id && req.user.user_id !== reserve.service_id){
      const error = new Error('Only customer/service owner of this reservation can access the reservation.')
      error.status = 400
      throw error
    }
    res.json(_.pick(reserve, filteredReserveKeys))
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
    const body = Object.assign(req.body, { date, start_time: startTime, end_time: endTime, paid_status: paidStatus })
    const reserve = await ReserveModel.createReservation(body)
    res.json(reserve)
  } catch (error) {
    next(error)
  }
})

router.get('/:id/cancel', AuthServ.isAuthenticated, async (req, res, next) => {
  try {
    await ReserveServ.cancelReservation(req.user.user_id, req.params.id)
    res.send('Cancel reservation success')
  } catch (error) {
    next(error)
  }
})

module.exports = router
