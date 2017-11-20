const mongoose = require('mongoose')
const Promise = require('bluebird')

const ComplaintSchema = new mongoose.Schema({
    complaint_id:{
        type: String,
        required: true
    },
    customer_id:{
        type: String,
        required: true
    },
    service_id:{
        type: String,
        require: true
    },
    note:{
        type: String,
        default: "This service is not satisfying"
    }
})

ComplaintSchema.methods ={
}

ComplaintSchema.statics = {

    //Search by Complaint id
    findByComplaintId: function(complaintId) {
        return Complaint.findOne({ complaint_id: complaintId })
    },

    //Create new Complaint
    createComplaint: async function (values) {
        const complaintCount = await Complaint.find().count()
        values.complaint_id = 'match-com-' + (complaintCount + 1).toString()
        return Complaint.create(values)
    }
}





const Complaint = mongoose.model('complaint', ComplaintSchema)

Promise.promisifyAll(Complaint)

module.exports = Complaint

//Done??
