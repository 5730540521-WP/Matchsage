const UserModel = require('../models/user')
const ServiceModel = require('../models/service')
const ComplaintModel = require('../models/complaint')
const EmployeeModel = require('../models/employee')

async function createComplaint (values) {
  const user = await UserModel.findByUserId(values.customer_id)
  if (!user || user.user_type === 'owner') {
    const error = new Error('Customer not found')
    error.status = 401
    throw error
  } 
  
  const service = await ServiceModel.findByServiceId(values.service_id)
  const employee = await EmployeeModel.findByEmployeeId(values.employee_id)

  if (!service && !employee) {
    const error = new Error('The service and employee that you are complaining does not exist')
    error.status = 401
    throw error
  }

  const newComplaint = await ComplaintModel.createComplaint(values)
  return newComplaint
}

module.exports = {
  createComplaint
}
