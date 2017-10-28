const UserModel = require('../models/user')
const ReserveModel = require('../models/reservation')
const _ = require('lodash')

async function getAvailableProviders ({ date, startTime, endTime, serviceId }) {
  const providers = await UserModel.find({ work_for: serviceId, user_type: 'provider' })
  let avaiProviders = []
  _.forEach(providers, async (provider) => {
    const reserve = await ReserveModel.findOne({
      date,
      service_id: serviceId,
      is_cancel: false,
      provider_id: provider.user_id,
      $or: [{ start_time: { $gt: startTime, $lt: endTime } }, { end_time: { $gt: startTime, $lt: endTime } }]
    })
    if (!reserve) {
      avaiProviders.append(provider)
    }
  })
  return avaiProviders
}

module.exports = {
  getAvailableProviders
}
