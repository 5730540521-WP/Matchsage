const Service = require('../models/service')
const User = require('../models/user')

async function createService (values) {
  // check if the caller's id is a service provider
  const user = await User.findById(values.owner_id)
  if (user.user_type !== 'provider') {
    const error = new Error('Only service provider can create a service.')
    error.status = 400
    throw error
  }

  const dupService = await Service.findByName(values.service_name)
  if (dupService) {
    const error = new Error('Duplicated service name.')
    error.status = 400
    throw error
  }

  const newService = await Service.createService(values)
  await User.findByIdAndUpdate(values.owner_id, { $push: {services: newService.service_id} })
  return newService
}

module.exports = {
  createService
}
