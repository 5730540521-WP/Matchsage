const mongoose = require('mongoose')
const promise = require('bluebird')

const RatingSchema = new mongoose.Schema({
  score: {
    type: Number,
    required: true
  },
  customer_id: {
    type: String,
    required: true
  },
  rating_type: {
    type: String,
    required: true
  },
  service_id: {
    type: String
  },
  employee_id: {
    type: String
  }
})

RatingSchema.statics = {
}

const Rating = mongoose.model('rating', RatingSchema)
promise.promisifyAll(Rating)

module.exports = Rating
