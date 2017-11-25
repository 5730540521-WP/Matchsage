const UserModel = require('../models/user')
const ServiceModel = require('../models/service')
const ComplaintModel = require('../models/complaint')
const EmployeeModel = require('../models/employee')

async function createComplaint (userId, values) {
  const user = await UserModel.findByUserId(userId)
  if (!user || user.user_type === 'owner') {
    const error = new Error('Customer not found')
    error.status = 401
    throw error
  }
  if(values.complaint_type === 'service') {
    const service = await ServiceModel.findByServiceId(values.service_id) 
    if(!service) {
      const error = new Error('Service to complaint not found')
      error.status = 401
      throw error
    } 
  } else if (values.complaint_type === 'employee') {
    const employee = await EmployeeModel.findByEmployeeId(values.employee_id)
    if(!employee){
      const error = new Error('Employee to complaint not found')
      error.status = 401
      throw error
    }
  } 

  const opts = Object.assign({}, values, { customer_id: userId })
  const newComplaint = await ComplaintModel.createComplaint(opts)
  return newComplaint
}

module.exports = {
  createComplaint
}
