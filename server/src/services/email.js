const mailer = require('gmail-send')
const UserModel = require('../models/user')

async function mailConfirmReservation (userId, reservId) {
  const user = await UserModel.findByUserId(userId)
  var send = mailer({
    user: 'matchsageCU@gmail.com',
    pass: process.env.EMAIL_PASS,
    to: [user.email],
    subject: 'reservation cofirmed!!',
    text: 'your reservation on \nreservation id:  is confirmed'
  })
  send({}, function (err, res) {
    console.log('send() callback returned: err:', err, '; res:', res, 'send to', user.email)
    if (err) {
      throw err
    }
  })
}

module.exports = {
  mailConfirmReservation
}
