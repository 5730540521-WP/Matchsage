const mongoose = require('mongoose')
const promise = require('bluebird')

const ReceiptSchema = new mongoose.Schema({
    user_id: {
        type: String,
        requireed: true
    },

    reservation_id: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    payment_date: {
        type: String,
        required: true
    }
})

ReceiptSchema.static = {
    
    findByReservationId: function (reservationId){
        return Receipt.findOne({ reservation_id: reservationId })
    },

    createReceipt: async function (values) {
        const receiptCount = await Receipt.find().count()
        values.receipt_id = 'match-rec-' + (receiptCount + 1).toString()
        return Receipt.create(values)
    }
}

const Receipt = mongoose.model('receipt', ReceiptSchema)
promise.promisifyAll(Receipt)

module.exports = Receipt