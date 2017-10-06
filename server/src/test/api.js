const app = require('../index')
const chai = require('chai')
const request = require('supertest')
const _ = require('lodash')
const mongoose = require('mongoose')
const Promise = require('bluebird')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/user')

Promise.promisifyAll(jwt)

const User = require('../models/user')

const expect = chai.expect
describe('API tests', () => {
  const provider1 = {
    email: 'provider1@test.com',
    password: 'test',
    user_type: 'provider',
    first_name: 'john',
    last_name: 'doe'
  }

  const customer1 = {
    email: 'customer1@test.com',
    password: 'test',
    user_type: 'customer',
    first_name: 'wasin',
    last_name: 'watt'
  }

  let token = '', actorId = ''

  before(async () => {
    await UserModel.createUser(customer1)
  })

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
      .send(provider1)
      .expect(200)
      .then(async res => {
        expect(res.body).to.have.all.keys('token')
        token = `JWT ${res.body.token}`
        const { _id } = await jwt.verify(token.split(' ')[1], 'RESTFULAPIS')
        actorId = _id
        const user = await User.findById(_id)
        expect(user).to.be.an('object')
      })
    })
  })

  describe('# /api/auth endpoint', () => {
    it('Wrong email  should get 401', () => {
      return request(app)
      .post('/api/auth')
      .send({ email: 'sss', password: provider1.password })
      .expect(401)
    })
    it('Wrong password should get 401', () => {
      return request(app)
      .post('/api/auth')
      .send({ email: provider1.email, password: 'provider1.password' })
      .expect(401)
    })
    it('Authorized should be able to logged in', () => {
      return request(app)
      .post('/api/auth')
      .send({ email: provider1.email, password: provider1.password })
      .expect(200)
      .then(async res => {
        expect(res.body.token).to.be.equal(token.split(' ')[1])
      })
    })
  })

  describe('# /api/users endpoint', () => {
    it('Unauthorized should get 401', () => {
      return request(app)
      .get('/api/users')
      .expect(401)
    })
    it('Authorized should get all users', () => {
      return request(app)
      .get('/api/users')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .expect(200)
      .then(async res => {
        expect(res.body.users.length).to.equal(2)
        expect(res.body.users[0].email).to.equal(customer1.email)
      })
    })
  })

  describe('# /api/users/:id endpoint', () => {
    it('Should return user detail', () => {
      return request(app)
      .get('/api/users/1')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .expect(200)
      .then(async res => {
        expect(res.body).to.be.an('object')
        expect(res.body.user_id).to.equal('1')
      })
    })
  })

  describe('# /api/services/new', () => {
    it('Should create a new service', () => {
      return request(app)
      .post('/api/services/new')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({ service_name: 'service1' })
      .expect(200)
      .then(async res => {
        expect(res.body.service_name).to.equal('service1')
        const user = await UserModel.findById(actorId)
        expect(_.includes(user.services, res.body.service_id)).to.equal(true)
      })
    })
  })

  describe('# /api/services', () => {
    it('Should list all services', () => {
      return request(app)
      .get('/api/services')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .expect(200)
      .then(async res => {
        expect(res.body.services[0].service_id).to.equal('1')
      })
    })
  })
})
