const ReceiptModel = require('../models/receipt')
const UserModel = require('../models/user')

async function viewReceipt (userId, reserveId) {
  const receipt = await ReceiptModel.findByReservationId(reserveId)
  if (receipt.user_id !== userId) {
    const error = new Error('Only customer who make this reservation can view the receipt')
    error.status = 400
    throw error
  }
  return receipt
}

async function downloadReceipt (userId, reserveId) {
  const receipt = await ReceiptModel.findByReservationId(reserveId)
  const user = UserModel.findByUserId(userId)
  if (receipt.user_id !== user.user_id) {
    const error = new Error('Only the person who make this reservation can download the receipt')
    error.status = 400
    throw Error
  }

// Start Download File
}

module.exports = {
  viewReceipt,
  downloadReceipt
}
