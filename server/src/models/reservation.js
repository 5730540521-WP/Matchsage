const mongoose = require('mongoose')
const Promise = require('bluebird')

const ReservationSchema = new mongoose.Schema({
  reserve_id: {
    type: String,
    required: true
  },
  service_id: {
    type: String,
    required: true
  },
  customer_id: {
    type: String,
    required: true
  },
  employee_id: {
    type: String,
    required: true
  },
  start_time: {
    type: String,
    required: true
  },
  end_time: {
    type: String,
    required: true
  },
  date_reserved: {
    type: String,
    required: true
  },
  date_created: {
    type: String,
    required: true
  },
  is_cancel: {
    type: Boolean,
    required: true,
    default: false
  },
  paid_status: {
    type: String,
    required: true,
    default: 'deposit-paid'
  },
  price: {
    type: Number,
    required: true,
    default: 500
  },
  is_delete: {
    type: Boolean,
    required: true,
    default: false
  }
})

ReservationSchema.methods = {
}

ReservationSchema.statics = {

  findByReservationId: function (reserveId) {
    return Reservation.findOne({ reserve_id: reserveId, is_delete: false })
  },

  createReservation: async function (values) {
    const reserveCount = await Reservation.find().count()
    values.reserve_id = 'match-res-' + (reserveCount + 1).toString()
    values.is_cancel = false
    return Reservation.create(values)
  },

  cancelReservation: async function (reserveId) {
    const cancelReserve = await Reservation.findOneAndUpdate({ reserve_id: reserveId }, { is_cancel: true })
    return cancelReserve
  }
}

const Reservation = mongoose.model('reservation', ReservationSchema)

Promise.promisifyAll(Reservation)

module.exports = Reservation
