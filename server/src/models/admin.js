const mongoose = require('mongoose')
const Promise = require('bluebird')
const bcrypt = require('bcrypt')

const AdminSchema = new mongoose.Schema({
  admin_id: {
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
  }
})

AdminSchema.methods = {
  validPassword: function (password) {
    return bcrypt.compareSync(password, this.password)
  }
}

AdminSchema.statics = {
  findByEmail: function (email) {
    return Admin.findOne({ email })
  },

  findByAdminId: function (adminId) {
    return Admin.findOne({ admin_id: adminId })
  },

  findWithRegexp: function (keyword, opts) {
    const filter = Object.assign({}, opts, {
      $or: [
        { email: new RegExp(keyword, 'i') },
        { first_name: new RegExp(keyword, 'i') },
        { last_name: new RegExp(keyword, 'i') }
      ]
    })
    return Admin.find(filter).sort({ admin_id: 1 })
  },

  createAdmin: async function (values) {
    const adminCount = await Admin.find().count()
    values.admin_id = 'match-admin-' + (adminCount + 1).toString()
    values.password = await bcrypt.hashSync(values.password, bcrypt.genSaltSync(8), null)
    return Admin.create(values)
  }
}

const Admin = mongoose.model('admin', AdminSchema)
Promise.promisifyAll(Admin)

module.exports = Admin
