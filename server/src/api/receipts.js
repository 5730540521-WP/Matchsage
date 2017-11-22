const { Router } = require('express')
const _ = require('lodash')
const AuthServ = require('../services/auth')
const ReceiptModel = require('../models/receipt')
const UserModel = require('../models/user')

let router = Router()

// show list of receipt of those user
router.get('/', AuthServ.isAuthenticated, async(req, res, next) => {
  try {
    //  need to add pick only with same uesr_id
    const receipts = await ReceiptModel.find(req.query)
    res.json({ receipt: receipts })
  } catch (error) {
    next(error)
  }
})

// show specific receipt by reservation ID
router.get('/:id', AuthServ.isAuthenticated, async (req, res, next) => {
  try {
    const receipt = await ReceiptModel.findByReservationId(req.param.id)
    const user = await UserModel.findByUserId(req.user.user_id)
    if (receipt.user_id !== user.user_id) {
      const error = new Error('Only customer who make this reservation can view this receipt')
      error.status = 400
      throw error
    }
    res.json(receipt)
  } catch (error) {
    next(error)
  }
})

// create new receipt
router.post('/new', AuthServ.isAuthenticated, async (req, res, next) => {
  try {
    // console.log(req)
    const receipt = await ReceiptModel.createReceipt(req.body)
    console.log('here', receipt)
    res.json(receipt)
  } catch (error) {
    next(error)
  }
})

module.exports = router
