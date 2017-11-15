const UserModel = require('../models/user')
const AdminModel = require('../models/admin')

async function authenticateUser (values) {
  const user = await UserModel.findByEmail(values.email)
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

async function signup (values) {
  const dupUser = await UserModel.findByEmail(values.email)
  if (dupUser) {
    const error = new Error('This email is already a user')
    error.status = 400
    throw error
  }

  const newUser = await UserModel.createUser(values)
  return newUser
}

async function authenticateAdmin (values) {
  const admin = await AdminModel.findByEmail(values.email)
  if (!admin) {
    const error = new Error('Admin not found')
    error.status = 401
    throw error
  }
  const isValidAdmin = await admin.validPassword(values.password)
  if (!isValidAdmin) {
    const error = new Error('Wrong password')
    error.status = 401
    throw error
  }

  return admin
}

async function signupAdmin (values) {
  const admin = await AdminModel.findByEmail(values.email)
  if (admin) {
    const error = new Error('This email is already a admin')
    error.status = 400
    throw error
  }

  const newAdmin = await AdminModel.createAdmin(values)
  return newAdmin
}

function isAuthenticated (req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.user || req.admin) return next()
  // if they aren't throw an error
  return res.status(401).json({ message: 'Unauthorized. Please log in before proceed.' })
}

function isAuthenticatedAdmin (req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.admin) return next()
  // if they aren't throw an error
  return res.status(401).json({ message: 'Admin Unauthorized. Please log in before proceed.' })
}

module.exports = {
  authenticateUser,
  signup,
  isAuthenticated,
  authenticateAdmin,
  signupAdmin,
  isAuthenticatedAdmin
}
