const mongoose = require('mongoose')
const Promise = require('bluebird')
const bcrypt = require('bcrypt')

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
  },
  own_services: {
    type: [ String ],
    default: []
  },
  work_for: {
    type: String,
    default: null
  }
})

UserSchema.methods = {
  validPassword: function (password) {
    return bcrypt.compareSync(password, this.password)
  }
}

UserSchema.statics = {
  findByEmail: function (email) {
    return User.findOne({email})
  },

  findByUserId: function (userId) {
    return User.findOne({user_id: userId})
  },

  createUser: async function (values) {
    const userCount = await User.find().count()
    values.user_id = (userCount + 1).toString()
    values.password = await bcrypt.hashSync(values.password, bcrypt.genSaltSync(8), null)
    return User.create(values)
  }
}

const User = mongoose.model('user', UserSchema)
Promise.promisifyAll(User)

module.exports = User
