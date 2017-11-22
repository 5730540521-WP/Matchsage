// import { RegExp } from 'core-js/library/web/timers'

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
  },
  employees: {
    type: [ String ],
    default: []
  },
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  address: {
    type: String,
    required: true,
    default: 'Siam'
  }
})

ServiceSchema.methods = {
}

ServiceSchema.statics = {
  findByServiceId: function (serviceId) {
    return Service.findOne({ service_id: serviceId })
  },

  findByName: function (serviceName) {
    return Service.findOne({ service_name: serviceName })
  },

  findWithRegexp: function ({ service_name, rating }) {
    return Service.find({ service_name: new RegExp(service_name, 'i'), rating: { $gte: rating } }).sort({ rating: -1 })
  },

  createService: async function (values) {
    const serviceCount = await Service.find().count()
    values.service_id = 'match-ser-' + (serviceCount + 1).toString()
    return Service.create(values)
  },

  updateService: async function (serviceId, values) {
    return Service.findOneAndUpdate({ service_id: serviceId }, values)
  },

  removeService: async function (serviceId) {
    return Service.findOneAndRemove({ service_id: serviceId })
  }
}

const Service = mongoose.model('service', ServiceSchema)
Promise.promisifyAll(Service)

module.exports = Service
