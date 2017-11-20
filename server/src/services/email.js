const mailer = require('gmail-send')
const ReserveModel = require('../models/reservation')
const UserModel = require('../models/user')
const ServiceModel = require('../models/service')

async function mailConfirmReservation (reserveId) {
  const reserve = await ReserveModel.findByReservationId(reserveId)
  const cust = await UserModel.findByUserId(reserve.customer_id)
  const service = await ServiceModel.findByServiceId(reserve.service_id)
  var send = mailer({
    user: process.env.EMAIL || '',
    pass: process.env.EMAIL_PASS || '',
    to: [cust.email],
    subject: 'reservation cofirmed!!',
    text: `Hello ${cust.first_name},\n\nyour reservation: ${reserve.reserve_id}\nat ${service.service_name}\nfrom ${reserve.start_time}-${reserve.end_time} is confirmed\n\n enjoy your massage with Matchsage :)`
  })
  send({}, function (err, res) {
    // console.log('send() callback returned: err:', err, '; res:', res, 'send to', cust.email)
    if (err) {
      throw err
    }
  })
}

module.exports = {
  mailConfirmReservation
}
