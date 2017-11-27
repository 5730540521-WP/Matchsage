const PaymentAccountModel = require('../models/payment-account')
const UserModel = require('../models/user')
const ReserveModel = require('../models/reservation')
const ServiceModel = require('../models/service')
const _ = require('lodash')
const filteredReserveKeys = require('../config/filter').reservation

async function addCreditCard (userId, values) {
  const opts = Object.assign({}, values, {user_id: userId,
    method: 'credit-card',
    amount: Math.random() * 10000 + 2000})
  const newCreditCard = await PaymentAccountModel.createPayment(opts)
  await UserModel.findOneAndUpdate({ user_id: userId }, { $push: { payment_accounts: newCreditCard.number } })
}

async function addBankAccount (userId, values) {
  const opts = Object.assign({}, values, {user_id: userId,
    method: 'bank-account',
    amount: Math.random() * 10000 + 2000})
  const newBankAccount = await PaymentAccountModel.createPayment(opts)
  await UserModel.findOneAndUpdate({ user_id: userId }, { $push: { payment_accounts: newBankAccount.number } })
}

async function getReserveListByCustomer (userId) {
  const reserveList = await ReserveModel.find({customer_id: userId})
  return _.map(reserveList, reserve => _.pick(reserve, filteredReserveKeys))
}

async function deleteUser (userId) {
  const user = await UserModel.findByUserId(userId)
  if (user.user_type === 'owner') {
    const services = await ServiceModel.find({owner_id: userId})

    _.forEach(services, async function (serv) {
      await ReserveModel.update({service_id: serv.service_id}, {is_delete: true}, {multi: true})
    })
    await ServiceModel.update({owner_id: userId}, {is_delete: true}, {multi: true})
  } else if (user.user_type === 'customer') {
    await ReserveModel.update({customer_id: userId}, {is_delete: true}, {multi: true})
  }
  await UserModel.findOneAndUpdate({user_id: userId}, {is_delete: true})
}

module.exports = {
  addCreditCard,
  addBankAccount,
  getReserveListByCustomer,
  deleteUser
}
