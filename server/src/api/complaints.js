const { Router } = require('express')
const _ = require('lodash')
const AuthServ = require('../services/auth')
const ComplaintModel = require('../models/complaint')
const ComplaintServ = require('../services/complaint')
const UserModel = require('../models/user')

const ExpressJoi = require('express-joi-validator')
const Joi = require('joi')

// Complaint api
let router = Router()

const filteredComplaintKeys = ['complaint_id', 'customer_id', 'service_id']

// get list of complains (admin)
router.get('/', AuthServ.isAuthenticatedAdmin, async (req, res, next) => {
  try {
    const complaints = await ComplaintModel.find(req.query)
    res.json({ complaint: complaints })
  } catch (error) {
    next(error)
  }
})

// Search complain list by service id (admin)
router.get('/:id', AuthServ.isAuthenticatedAdmin, async (req, res, next) => {
  try {
    const complaint = await ComplaintModel.findByComplaintId(req.params.id)
    const user = await UserModel.findByUserId(req.user.user_id)
    if (user.user_type === 'admin') {
      res.json(_.pick(complaint, filteredComplaintKeys))
    } else {
      const error = new Error('Your user does not have the authorities, Only admin can view complaints')
      error.status = 400
      throw error
    }
  } catch (error) {
    next(error)
  }
})

// create new complain (customer)
router.post('/new', AuthServ.isAuthenticated, ExpressJoi({
  body: {
    service_id: Joi.string(),
    employee_id: Joi.string(),
    complaint_type: Joi.string()
  }
}), async (req, res, next) => {
  try {
    const complaint = await ComplaintServ.createComplaint(req.user.user_id, req.body)
    res.json(complaint)
  } catch (error) {
    next(error)
  }
})

module.exports = router
// Done??
// Done Validate
