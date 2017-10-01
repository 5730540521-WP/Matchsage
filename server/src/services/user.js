const UserModel = require('../models/user')

async function createUser (values) {
  const userCount = await UserModel.find().count()
  values.user_id = (userCount + 1).toString()
  return UserModel.create(values)
}

function findByEmail (email) {
  return UserModel.findOne({email})
}

function findByUserId (userId) {
  return UserModel.findOne({user_id: userId})
}

module.exports = {
  createUser,
  findByEmail,
  findByUserId
}
