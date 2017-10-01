const User = require('../models/user')

async function authenticateUser (values) {
  const user = await User.findByEmail(values.email)
  if (!user) {
    const err = new Error('User not found')
    err.status = 401
    throw err
  }
  const isValidUser = await user.validPassword(values.password)
  if (!isValidUser) {
    const err = new Error('Wrong password')
    err.status = 401
    throw err
  }

  return user
}

async function signUp (values) {
  const dupUser = await User.findByEmail(values.email)
  if (dupUser) {
    const err = new Error('This email is already a user')
    err.status = 400
    throw err
  }

  const newUser = await User.createUser(values)
  return newUser
}

module.exports = {
  authenticateUser,
  signUp
}
