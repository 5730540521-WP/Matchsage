const mongoose = require('mongoose')
const Promise = require('bluebird')

const ReceiptSchema = new mongoose.Schema({
  receipt_id: {
    type: String,
    required: true
  },
  customer_id: {
    type: String,
    required: true
  },
  reservation_id: {
    type: String,
    required: true
  },
  payment_type: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    default: 1000
  },
  payment_date: {
    type: String,
    required: true,
    default: 'TEMP DATE'
  }
})

ReceiptSchema.statics = {

  findByReservationId: function (reservationId) {
    return Receipt.findOne({ reservation_id: reservationId })
  },
  createReceipt: async function (values) {
    const receiptCount = await Receipt.find().count()
    values.receipt_id = 'match-rec-' + (receiptCount + 1).toString()
    return Receipt.create(values)
  }
}

const Receipt = mongoose.model('receipt', ReceiptSchema)
Promise.promisifyAll(Receipt)

module.exports = Receipt
