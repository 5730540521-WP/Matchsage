const mongoose = require('mongoose')
const Promise = require('bluebird')

const UserSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true
  },
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
    index: true
  },
  last_name: {
    type: String,
    index: true
  },
  user_type: {
    type: String,
    required: true
  }
})

const User = mongoose.model('user', UserSchema)
Promise.promisifyAll(User)

module.exports = User
