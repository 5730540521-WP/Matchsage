const mailer = require('gmail-send')
const ReserveModel = require('../models/reservation')
const UserModel = require('../models/user')
const ServiceModel = require('../models/service')
const AdminModel = require('../models/admin')

var send = mailer({
  user: process.env.EMAIL || '',
  pass: process.env.EMAIL_PASS || '',
  to: [],
  subject: 'template',
  text: ''
})

async function mailConfirmReservation (reserveId) {
  const reserve = await ReserveModel.findByReservationId(reserveId)
  const cust = await UserModel.findByUserId(reserve.customer_id)
  const service = await ServiceModel.findByServiceId(reserve.service_id)

  send({
    to: [cust.email],
    subject: 'reservation cofirmed!!',
    text: `Hello ${cust.first_name},\n\nyour reservation: ${reserve.reserve_id}\nat ${service.service_name}\nfrom ${reserve.start_time}-${reserve.end_time} is confirmed\n\nEnjoy your massage with Matchsage :)`
  }, function (err, res) {
    console.log('confirm reserve callback returned: err:', err, '; res:', res, 'send to', cust.email)
    if (err) {
      err.status = 550
      throw err
    }
  })
}

async function mailConfirmSignUp (userId) {
  const user = await UserModel.findByUserId(userId)
  send({ to: [user.email],
    subject: 'Greeting!!',
    text: `Hello ${user.first_name},\n\nThank you for joining us on Matchsage\n\nEnjoy your massage with Matchsage :)`
  }, function (err, res) {
    console.log('confirm sign up callback returned: err:', err, '; res:', res, 'send to', user.email)
    if (err) {
      err.status = 550
      throw err
    }
  })
}

async function mailConfirmSignUpAdmin (adminId) {
  const admin = await AdminModel.findByAdminId(adminId)
  send({ to: [admin.email],
    subject: 'Admin registration confirmed!!',
    text: `Hello ${admin.first_name},\n\nyour regstration as admin is confirmed!!`}
  , function (err, res) {
    console.log('confirm admin sign up callback returned: err:', err, '; res:', res, 'send to', admin.email)
    if (err) {
      err.status = 550
      throw err
    }
  })
}

module.exports = {
  mailConfirmReservation,
  mailConfirmSignUp,
  mailConfirmSignUpAdmin
}
