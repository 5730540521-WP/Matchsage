const mongoose = require('mongoose')
const Promise = require('bluebird')

const EmployeeSchema = new mongoose.Schema({
  employee_id: {
    type: String,
    required: true,
    unique: true
  },
  first_name: {
    type: String,
    index: true
  },
  last_name: {
    type: String,
    index: true
  },
  gender: {
    type: String,
    required: true
  },
  work_for: {
    type: String,
    required: true
  }
})

EmployeeSchema.methods = {
}

EmployeeSchema.statics = {

  findByEmployeeId: function (employeeId) {
    return Employee.findOne({ employee_id: employeeId })
  },

  createEmployee: async function (values) {
    const employeeCount = await Employee.find().count()
    values.employee_id = 'match-em-' + (employeeCount + 1).toString()
    return Employee.create(values)
  }
}

const Employee = mongoose.model('employee', EmployeeSchema)
Promise.promisifyAll(Employee)

module.exports = Employee
