const ReserveModel = require('../models/reservation')
const UserModel = require('../models/user')

async function cancelReservation (userId, reserveId) {
  const reserve = await ReserveModel.findByReservationId(reserveId)
  const user = await UserModel.findByUserId(userId)
  if (reserve.customer_id !== user.user_id) {
    const error = new Error('Only customer who make this reservation can cancel the reservation.')
    error.status = 400
    throw error
  }

  await ReserveModel.cancelReservation(reserveId)
}

module.exports = {
  cancelReservation
}
