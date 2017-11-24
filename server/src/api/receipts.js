const { Router } = require('express')
const _ = require('lodash')
const AuthServ = require('../services/auth')
const ReceiptModel = require('../models/receipt')
const UserModel = require('../models/user')
const ReceiptService = require('../services/receipt')

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

// create new receipt
router.post('/new', AuthServ.isAuthenticated, async (req, res, next) => {
  try {
    // console.log(req)
    const receipt = await ReceiptModel.createReceipt(req.body)
    res.json(receipt)
  } catch (error) {
    next(error)
  }
})

// show specific receipt by reservation ID
router.get('/:id', AuthServ.isAuthenticated, async (req, res, next) => {
  try {
    const receipt = await ReceiptModel.findByReservationId(req.params.id)
    const user = await UserModel.findByUserId(req.user.user_id)
    if (receipt.customer_id !== user.user_id) {
      const error = new Error('Only customer who make this reservation can view this receipt')
      error.status = 400
      throw error
    }
    res.json(receipt)
  } catch (error) {
    next(error)
  }
})

router.get('/:id/download', AuthServ.isAuthenticated, async (req, res, next) => {
  try {
    const receipt = await ReceiptModel.findByReservationId(req.params.id)
    const user = await UserModel.findByUserId(receipt.customer_id)
    
    if (receipt.customer_id !== req.user.user_id) {
      const error = new Error('Only customer who make this reservation can download this receipt')
      error.status = 400
      throw error
    }
    const DnReceipt = ReceiptService.downloadReceipt(user.user_id, receipt.reservation_id)

    res.download('receipt.pdf')
  } catch (error) {
    next(error)
  }
})

module.exports = router
