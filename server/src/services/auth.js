const User = require('../models/user')

async function authenticateUser (values) {
  const user = await User.findByEmail(values.email)
  if (!user) {
    const error = new Error('User not found')
    error.status = 401
    throw error
  }
  const isValidUser = await user.validPassword(values.password)
  if (!isValidUser) {
    const error = new Error('Wrong password')
    error.status = 401
    throw error
  }

  return user
}

async function signUp (values) {
  const dupUser = await User.findByEmail(values.email)
  if (dupUser) {
    const error = new Error('This email is already a user')
    error.status = 400
    throw error
  }

  const newUser = await User.createUser(values)
  return newUser
}

module.exports = {
  authenticateUser,
  signUp
}
