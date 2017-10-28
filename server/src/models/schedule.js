const mongoose = require('mongoose')
const Promise = require('bluebird')

const ScheduleSchema = new mongoose.Schema({
})

ScheduleSchema.methods = {
}

ScheduleSchema.statics = {
  findByEmail: function (email) {
    return User.findOne({ email })
  },

  findByUserId: function (userId) {
    return User.findOne({ user_id: userId })
  },

  createUser: async function (values) {
    const userCount = await User.find().count()
    values.user_id = (userCount + 1).toString()
    values.password = await bcrypt.hashSync(values.password, bcrypt.genSaltSync(8), null)
    return User.create(values)
  }
}

const User = mongoose.model('user', ScheduleSchema)
Promise.promisifyAll(User)

module.exports = User
