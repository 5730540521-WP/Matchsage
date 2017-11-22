const ServiceModel = require('../models/service')
const UserModel = require('../models/user')
const ReserveModel = require('../models/reservation')
const EmployeeModel = require('../models/employee')
const Promise = require('bluebird')

async function createService (values) {
  // check if the caller's id is a service owner
  const user = await UserModel.findByUserId(values.owner_id)
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
  await UserModel.findOneAndUpdate({ user_id: values.owner_id }, { $push: {own_services: newService.service_id} })
  return newService
}

async function deleteService (userId, serviceId) {
  const service = await ServiceModel.findByServiceId(serviceId)
  if (service.owner_id !== userId) {
    const error = new Error('Unauthorized.')
    error.status = 400
    throw error
  }

  await ServiceModel.findOneAndRemove({ service_id: serviceId })
}

async function getAvailableEmployees ({ date, start_time, end_time, serviceId }) {
  const employees = await EmployeeModel.find({ work_for: serviceId })
  const avaiEmployees = await Promise.map(employees, async (employee) => {
    const reserve = await ReserveModel.findOne({
      date,
      service_id: serviceId,
      is_cancel: false,
      employee_id: employee.employee_id,
      $or: [{ start_time: { $gt: start_time, $lt: end_time } }, { end_time: { $gt: start_time, $lt: end_time } }]
    })
    if (!reserve) {
      return employee
    }
    return null
  })
  return avaiEmployees
}

async function addEmployee (serviceId, values) {
  const service = ServiceModel.findByServiceId(serviceId)
  if (!service) {
    const error = new Error('Service not found')
    error.status = 404
    throw error
  }

  values.work_for = serviceId
  const newEmployee = await EmployeeModel.createEmployee(values)
  await ServiceModel.findOneAndUpdate({ service_id: serviceId }, { $push: { employees: newEmployee.employee_id } })
}

module.exports = {
  createService,
  getAvailableEmployees,
  addEmployee,
  deleteService
}
