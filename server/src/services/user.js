const PaymentAccountModel = require('../models/payment-account')
const UserModel = require('../models/user')

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

module.exports = {
  addCreditCard,
  addBankAccount
}
