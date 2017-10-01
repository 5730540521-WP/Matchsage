const UserModel = require('../models/user')

async function createUser (values) {
  const userCount = await UserModel.find().count()
  values.user_id = (userCount + 1).toString()
  return UserModel.create(values)
}

module.exports = {
  createUser
}
