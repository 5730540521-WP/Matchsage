const { Router } = require('express')
const _ = require('lodash')
const AuthServ = require('../services/auth')
const ReserveModel = require('../models/reservation')
const ReserveServ = require('../services/reservation')

// Reservations api
let router = Router()

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
    res.json(_.pick(reserve, []))
  } catch (error) {
    next(error)
  }
})

router.post('/new', AuthServ.isAuthenticated, async (req, res, next) => {
  try {
    const date = req.body.date || '2000-12-20'
    const startTime = req.body.start_time || '2500'
    const endTime = req.body.end_time || '2500'
    const body = Object.assign(req.body, { date, start_time: startTime, end_time: endTime })
    const reserve = await ReserveModel.createReservation(body)
    res.json(reserve)
  } catch (error) {
    next(error)
  }
})

router.get('/:id/cancel', AuthServ.isAuthenticated, async (req, res, next) => {
  try {
    await ReserveServ.cancelReservation(req.user._id, req.params.id)
    res.send('Cancel reservation success')
  } catch (error) {
    next(error)
  }
})

module.exports = router
