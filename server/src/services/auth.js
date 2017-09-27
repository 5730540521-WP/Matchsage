import UserService from './user'
import _ from 'lodash'

async function authenticateUser (values) {
  const user = await UserService.findByEmail(values.email)
  if (!user || !(user.password === values.password)) {
    const err = new Error('Unauthorized')
    err.status = 400
    throw err
  }

  const filteredUserKeys = [ 'user_id', 'email', 'first_name', 'last_name' ]
  return _.pick(user, filteredUserKeys)
}

async function signUp (values) {
  const dupUser = await UserService.findByEmail(values.email)
  if (dupUser) {
    const err = new Error('This email is already a user')
    err.status = 400
    throw err
  }

  const newUser = await UserService.createUser(values)
  return newUser
}

module.exports = {
  authenticateUser,
  signUp
}
