const setTimeout = require('timers').setTimeout

const ReceiptModel = require('../models/receipt')
const UserModel = require('../models/user')
const Pdf = require('pdfkit')
const fs = require('fs')
const Promise = require('bluebird')
Promise.promisifyAll(fs)

async function viewReceipt (userId, receiptId) {
  const receipt = await ReceiptModel.findByReceiptId(receiptId)
  if (receipt.user_id !== userId) {
    const error = new Error('Only customer who make this reservation can view the receipt')
    error.status = 400
    throw error
  }
  return receipt
}

async function downloadReceipt (userId, receiptId) {
  const receipt = await ReceiptModel.findByReceiptId(receiptId)
  const user = await UserModel.findByUserId(receipt.customer_id)
  if (receipt.customer_id !== user.user_id) {
    const error = new Error('Only the person who make this reservation can download the receipt')
    error.status = 400
    throw Error
  }
  // return Promise.resolve().then(async () => {
    // let pendingStepCount = 2

    // const stepFinished = () => {
    //   if (--pendingStepCount === 0) {
    //     resolve()
    //   }
    // }
  var tempReceipt = new Pdf()
  var ws = await fs.createWriteStream(`tmp/receipt-${receiptId}.pdf`)
    // ws.on('close', stepFinished)
  tempReceipt.pipe(ws)

  tempReceipt.font('Times-Roman')
    .fontSize(30)
    .text(`     Receipt No. ${receipt.receipt_id} \n
    Value Customer:  ${user.first_name}   ${user.last_name}\n
    Service : ${receipt.reservation_id}\n
    Payment_method : ${receipt.payment_method}\n
    Price: ${receipt.price}`, 100, 100)
  tempReceipt.end()
    // stepFinished()
    // ws.on('close', () => {
    // })
  // })
}

module.exports = {
  viewReceipt,
  downloadReceipt
}
