const UserModel = require ('../models/user')
const ServiceModel = require('../models/service')
const ComplaintModel = require('../models/complaint')

async function createComplaint (values) {
    const user = await UserModel.findByUserId(values.customer_id)
    if(!user || user.user_type === 'owner'){
        const error = new Error('Customer not found')
        error.status = 401
        throw error
    }

    await ComplaintModel.createComplaint(values)
}

module.exports = {
    complain
}

