const { Router } = require('express')
const _ = require('lodash')
const AuthServ = require('../services/auth')
const ReserveModel = require('../models/reservation')

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
    const reserve = await ReserveModel.createReservation(req.body)
    res.json(_.pick(reserve, []))
  } catch (error) {
    next(error)
  }
})

router.post('/cancel/:id', AuthServ.isAuthenticated, async (req, res, next) => {
  try {
    await ReserveModel.cancelReservation(req.params.id)
    res.send('Cancel reservation success')
  } catch (error) {
    next(error)
  }
})

module.exports = router
