const mongoose = require('mongoose')
const Promise = require('bluebird')

const PaymentAccountSchema = new mongoose.Schema({
  method: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true,
    default: 2000
  },
  user_id: {
    type: String,
    required: true
  }
})

PaymentAccountSchema.statics = {
  findByNumber: function (number) {
    return PaymentAccount.findOne({number})
  },

  createPayment: function (values) {
    return PaymentAccount.create(values)
  },

  subtractAmountFrom: function (number, amount) {
    return PaymentAccount.findOneAndUpdate({ number }, { $inc: { amount: -amount } })
  }
}

const PaymentAccount = mongoose.model('paymentinfo', PaymentAccountSchema)

Promise.promisifyAll(PaymentAccount)

module.exports = PaymentAccount
