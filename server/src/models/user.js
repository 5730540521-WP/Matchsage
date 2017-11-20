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
    index: true,
    required: true
  },
  last_name: {
    type: String,
    index: true,
    required: true
  },
  gender: {
    type: String,
    require: true
  },
  user_type: {
    type: String,
    required: true
  },
  own_services: {
    type: [ String ],
    default: []
  },
  payment_accounts: {
    type: [ String ],
    default: []
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

  findWithRegexp: function (keyword, opts) {
    const filter = Object.assign({}, opts, {
      $or: [
        { email: new RegExp(keyword, 'i') },
        { first_name: new RegExp(keyword, 'i') },
        { last_name: new RegExp(keyword, 'i') }
      ]
    })
    return User.find(filter).sort({ user_id: 1 })
  },

  createUser: async function (values) {
    const userCount = await User.find().count()
    values.user_id = 'match-user-' + (userCount + 1).toString()
    values.password = await bcrypt.hashSync(values.password, bcrypt.genSaltSync(8), null)
    return User.create(values)
  }
}

const User = mongoose.model('user', UserSchema)
Promise.promisifyAll(User)

module.exports = User
