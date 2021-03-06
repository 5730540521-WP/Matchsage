const mongoose = require('mongoose')
const Promise = require('bluebird')

const ComplaintSchema = new mongoose.Schema({
  complaint_id: {
    type: String,
    required: true
  },
  customer_id: {
    type: String,
    required: true
  },
  service_id: {
    type: String
  },
  employee_id: {
    type: String
  },
  title: {
    type: String,
    default: 'Title'
  },
  note: {
    type: String,
    default: 'This service / employee is not satisfying'
  },
  complaint_type: {
    type: String,
    required: true
  }
})

ComplaintSchema.methods = {
}

ComplaintSchema.statics = {

  findByComplaintId: function (complaintId) {
    return Complaint.findOne({ complaint_id: complaintId })
  },

  findByServiceId: function (serviceId) {
    return Complaint.findOne({ service_id: serviceId })
  },

  createComplaint: async function (values) {
    const complaintCount = await Complaint.find().count()
    values.complaint_id = 'match-com-' + (complaintCount + 1).toString()
    return Complaint.create(values)
  }
}

const Complaint = mongoose.model('complaint', ComplaintSchema)

Promise.promisifyAll(Complaint)

module.exports = Complaint
