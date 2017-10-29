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
    type: Number,
    required: true
  },
  end_time: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  is_cancel: {
    type: Boolean,
    required: true,
    default: false
  }
})

ReservationSchema.methods = {
}

ReservationSchema.statics = {

  findByReservationId: function (reserveId) {
    return Reservation.findOne({ reserve_id: reserveId })
  },

  createReservation: async function (values) {
    const reserveCount = await Reservation.find().count()
    values.reservation_id = (reserveCount + 1).toString()
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
