const mongoose = require('mongoose')
const Promise = require('bluebird')

const ServiceSchema = new mongoose.Schema({
  service_id: {
    type: String,
    required: true,
    unique: true
  },
  service_name: {
    type: String,
    required: true,
    unique: true
  },
  owner_id: {
    type: String,
    required: true,
    default: '1'
  },
  contact_number: {
    type: String,
    default: 'XXXXX'
  }
})

ServiceSchema.statics = {
  findByServiceId: function (serviceId) {
    return Service.findOne({service_id: serviceId})
  },
  createService: function (values) {
    const serviceCount = Service.find().count()
    const serviceId = serviceCount + 1
    values.service_id = serviceId
    return Service.create(values)
  }
}

const Service = mongoose.model('service', ServiceSchema)
Promise.promisifyAll(Service)
