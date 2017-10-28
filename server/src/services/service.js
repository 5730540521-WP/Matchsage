const ServiceModel = require('../models/service')
const UserModel = require('../models/user')
const ReserveModel = require('../models/reservation')

async function createService (values) {
  // check if the caller's id is a service provider
  const user = await UserModel.findById(values.owner_id)
  if (user.user_type !== 'owner') {
    const error = new Error('Only service owner can create a service.')
    error.status = 400
    throw error
  }

  const dupService = await ServiceModel.findByName(values.service_name)
  if (dupService) {
    const error = new Error('Duplicated service name.')
    error.status = 400
    throw error
  }

  const newService = await ServiceModel.createService(values)
  await UserModel.findByIdAndUpdate(values.owner_id, { $push: {own_services: newService.service_id} })
  return newService
}

// async function isAvailable ({ serviceId, date, startTime, endTime }) {
//   const reserve = await ReserveModel.findOne({
//     date,
//     service_id: serviceId,
//     is_cancel: false,
//     $or: [ { start_time: { $gt: startTime, $lt: endTime } }, { end_time: { $gt: startTime, $lt: endTime } } ]
//   })
//   if (reserve) return false
//   return true
// }

module.exports = {
  createService
}
