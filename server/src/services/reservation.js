const ReserveModel = require('../models/reservation')
const UserModel = require('../models/user')
const PaymentAccountModel = require('../models/payment-account')
const _ = require('lodash')

async function cancelReservation (userId, reserveId) {
  const reserve = await ReserveModel.findByReservationId(reserveId)
  const user = await UserModel.findByUserId(userId)
  if (reserve.customer_id !== user.user_id) {
    const error = new Error('Only customer who make this reservation can cancel the reservation.')
    error.status = 401
    throw error
  }
  await ReserveModel.cancelReservation(reserveId)
}

async function makeFullPayment (userId, reserveId, paymentNumber) {
  const reserve = await ReserveModel.findByReservationId(reserveId)
  const user = await UserModel.findByUserId(userId)
  if (reserve.customer_id !== user.user_id) {
    console.log('A: ', reserve.customer_id, 'B: ', user.user_id, 'RESERVE:', reserveId)
    const error = new Error('Only customer who make this reservation can make payment on this reservation.')
    error.status = 401
    throw error
  }
  if (_.includes(user.payment_accounts, paymentNumber) === false) {
    const error = new Error('Wrong credit-card/bank-account number.')
    error.status = 400
    throw error
  }
  const paymentAccount = await PaymentAccountModel.findByNumber(paymentNumber)
  if (paymentAccount.amount < reserve.price) {
    const error = new Error('Not enough credit in your payment account.')
    error.status = 400
    throw error
  }
  await PaymentAccountModel.subtractAmountFrom(paymentNumber, reserve.price * 0.7)
  await ReserveModel.findOneAndUpdate({reserve_id: reserveId}, {paid_status: 'fully-paid'})
}

async function makeDepositPayment (userId, price, paymentNumber) {
  const user = await UserModel.findByUserId(userId)

  if (_.includes(user.payment_accounts, paymentNumber) === false) {
    const error = new Error('Wrong credit-card/bank-account number.')
    error.status = 400
    throw error
  }
  const paymentAccount = await PaymentAccountModel.findByNumber(paymentNumber)
  if (paymentAccount.amount < price) {
    const error = new Error('Not enough credit in your payment account.')
    error.status = 400
    throw error
  }
  await PaymentAccountModel.subtractAmountFrom(paymentNumber, price * 0.3)
}

module.exports = {
  cancelReservation,
  makeFullPayment,
  makeDepositPayment
}
