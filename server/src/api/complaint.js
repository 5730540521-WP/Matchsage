const { Router } = require('express')
const _ = require('lodash')
const AuthServ = require('../services/auth')
const ComplaintModel = require('../models/complaint')
const ComplaintServ = require('../services/complaint')

// Complaint api
let router = Router()

//get list of complains (admin)
router.get('/', AuthServ.isAuthenticatedAdmin, async (req, res, next) => {
    try {
        const complaints = await ComplaintModel.find(req.query)
        res.json({ complaint: complaints })
    } catch (error){

        next (error)
    }
})

//Search complain list by service id (admin)
router.get('/:serviceid', AuthServ.isAuthenticatedAdmin, async (req, res, next) => {
    try {
        const complain = await ComplaintModel.findByServiceId(req.params.serviceid)
        res.json(_.pick(complain, []))
    } catch (error) {
        next(error)
    }
})

//create new complain (customer)
router.post('/new', AuthServ.isAuthenticated, async (req, res, next) => {
    try {
        const complaint = await ComplaintServ.createComplaint(req.body)
        res.json(complaint)
    } catch (error) {
        next(error)
    }
})

module.exports = router

//Done??