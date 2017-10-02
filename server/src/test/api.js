const app = require('../index')
const chai = require('chai')
const request = require('supertest')
const _ = require('lodash')
const mongoose = require('mongoose')

const User = require('../models/user')

const expect = chai.expect
describe('API tests', () => {
  const user1 = {
    email: 'test@test.com',
    password: 'test',
    user_type: 'provider',
    first_name: 'john',
    last_name: 'doe'
  }

  after(() => {
    mongoose.connection.db.dropDatabase()
  })
  describe('# /api endpoint', () => {
    it('should get the software version', () => {
      return request(app)
      .get('/api')
      .expect(200)
      .then(res => {
        expect(res.body.version).to.equal('1.0.0')
      })
    })
  })
  describe('# /api/signup endpoint', () => {
    it('should be able to sign up && user will appear in the database', () => {
      return request(app)
      .post('/api/signup')
      .send(user1)
      .expect(200)
      .then(async res => {
        expect(res.body).to.have.all.keys('token')
        const user = await User.findByEmail(user1.email)
        expect(user).to.be.an('object')
      })
    })
  })
  describe('# /api/users endpoint', () => {
    it('Unauthorized should get 401', () => {
      return request(app)
      .get('/api/users')
      .expect(401)
    })
    // it('Authorized should get all users', () => {
    //   return request(app)
    //   .get('/api/users'
    // })
  })
})
