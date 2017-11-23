const PaymentAccountModel = require('../models/payment-account')
const UserModel = require('../models/user')
const ReserveModel = require('../models/reservation')
const ServiceModel = require('../models/service')
const _ = require('lodash')

async function addCreditCard (userId, values) {
  const opts = Object.assign({}, values, { user_id: userId, method: 'credit-card' })
  const newCreditCard = await PaymentAccountModel.createPayment(opts)
  await UserModel.findOneAndUpdate({ user_id: userId }, { $push: { payment_accounts: newCreditCard.number } })
}

async function addBankAccount (userId, values) {
  const opts = Object.assign({}, values, { user_id: userId, method: 'bank-account' })
  const newBankAccount = await PaymentAccountModel.createPayment(opts)
  await UserModel.findOneAndUpdate({ user_id: userId }, { $push: { payment_accounts: newBankAccount.number } })
}

async function getReserveListByCustomer (userId) {
  const reserveList = await ReserveModel.find({customer_id: userId})
  return _.map(reserveList, reserve => _.pick(reserve, 'reserve_id'))
}

module.exports = {
  addCreditCard,
  addBankAccount,
  getReserveListByCustomer
}
