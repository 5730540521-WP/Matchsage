const UserModel = require('../models/user')
const ServiceModel = require('../models/service')
const EmployeeModel = require('../models/employee')
const RatingModel = require('../models/rating')

async function rate (values) {
  const user = await UserModel.findByUserId(values.customer_id)
  if (!user || user.user_type === 'owner') {
    const error = new Error('Customer not found')
    error.status = 401
    throw error
  }
  if (values.rating_type === 'service') {
    if (!values.service_id) {
      const error = new Error('Service id is required')
      error.status = 400
      throw error
    }

    const service = await ServiceModel.findByServiceId(values.service_id)
    if (!service) {
      const error = new Error('Service not found')
      error.status = 401
      throw error
    }

    const rating = await RatingModel.create({
      rating_type: values.rating_type,
      customer_id: values.customer_id,
      service_id: values.service_id,
      score: values.score
    })

    const ratingCount = await RatingModel.find({service_id: values.service_id}).count()
    const newRating = (service.rating * (ratingCount - 1) + values.score) / ratingCount
    await ServiceModel.findOneAndUpdate({ service_id: values.service_id }, { rating: newRating })
    return rating
  } else if (values.rating_type === 'employee') {
    if (!values.employee_id) {
      const error = new Error('Employee id is required')
      error.status = 400
      throw error
    }

    const employee = await EmployeeModel.findByEmployeeId(values.employee_id)
    if (!employee) {
      const error = new Error('Employee not found')
      error.status = 401
      throw error
    }

    const rating = await RatingModel.create({
      rating_type: values.rating_type,
      customer_id: values.customer_id,
      employee_id: values.employee_id,
      score: values.score
    })

    const ratingCount = await RatingModel.find({ employee_id: values.employee_id }).count()
    const newRating = (employee.rating * (ratingCount - 1) + values.score) / ratingCount
    await EmployeeModel.findOneAndUpdate({ employee_id: values.employee_id }, { rating: newRating })
    return rating
  }
}

module.exports = {
  rate
}
