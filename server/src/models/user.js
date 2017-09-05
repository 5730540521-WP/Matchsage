import mongoose from 'mongoose'
import Promise from 'bluebird'

const User = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    index: true,
  },
  last_name: {
    type: String,
    index: true,
  },
})

User.statics.createUser = email => {
  // const count = this.find({}).count()
  return m.create({
    email,
    password: 'wasin'
  })
}

mongoose.model('user', User)

const m = mongoose.model('user')
Promise.promisifyAll(m)

module.exports = m
