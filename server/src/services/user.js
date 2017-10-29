// const EmployeeModel = require('../models/employee')
// const ReserveModel = require('../models/reservation')
// const _ = require('lodash')

// async function getAvailableEmployees ({ date, startTime, endTime, serviceId }) {
//   const employees = await EmployeeModel.find({ work_for: serviceId })
//   let avaiemployees = []
//   _.forEach(employees, async (employee) => {
//     const reserve = await ReserveModel.findOne({
//       date,
//       service_id: serviceId,
//       is_cancel: false,
//       employee_id: employee.user_id,
//       $or: [{ start_time: { $gt: startTime, $lt: endTime } }, { end_time: { $gt: startTime, $lt: endTime } }]
//     })
//     if (!reserve) {
//       avaiemployees.append(employee)
//     }
//   })
//   return avaiemployees
// }

// module.exports = {
//   getAvailableEmployees
// }
