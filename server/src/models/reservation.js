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
  }
})

const Reservation = mongoose.model('reservation', ReservationSchema)

Promise.promisifyAll(Reservation)

module.exports = Reservation
