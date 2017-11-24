// import { RegExp } from 'core-js/library/web/timers'

const mongoose = require('mongoose')
const Promise = require('bluebird')
const UserModel = require('./user')
const _ = require('lodash')

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
    required: true
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
  },
  price_per_hour: {
    type: Number,
    required: true,
    default: 500
  },
  is_delete: {
    type: Boolean,
    required: true,
    default: false
  }
})

ServiceSchema.methods = {
}

ServiceSchema.statics = {
  findByServiceId: function (serviceId) {
    return Service.findOne({ service_id: serviceId, is_delete: false })
  },

  findByName: function (serviceName) {
    return Service.findOne({ service_name: serviceName, is_delete: false })
  },

  findWithRegexp: function ({ service_name, rating }) {
    return Service.find({ service_name: new RegExp(service_name, 'i'), rating: { $gte: rating }, is_delete: false }).sort({ rating: -1 })
  },

  createService: async function (values) {
    const serviceCount = await Service.find().count()
    values.service_id = 'match-ser-' + (serviceCount + 1).toString()
    return Service.create(values)
  },

  updateService: async function (serviceId, values) {
    return Service.findOneAndUpdate({ service_id: serviceId, is_delete: false }, values)
  },

  deleteService: async function (serviceId) {
    return Service.findOneAndUpdate({ service_id: serviceId, is_delete: false }, {is_delete: true})
  }
}

const Service = mongoose.model('service', ServiceSchema)
Promise.promisifyAll(Service)

module.exports = Service
