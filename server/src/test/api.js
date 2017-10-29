const chai = require('chai')
const request = require('supertest')
const _ = require('lodash')
const mongoose = require('mongoose')
const Promise = require('bluebird')
const jwt = require('jsonwebtoken')

const app = require('../')
const UserModel = require('../models/user')
const ServiceModel = require('../models/service')
const EmployeeModel = require('../models/employee')

Promise.promisifyAll(jwt)

const expect = chai.expect
describe('API tests', () => {
  let owner1 = {
    email: 'owner1@test.com',
    password: 'test',
    user_type: 'owner',
    first_name: 'john',
    last_name: 'doe',
    gender: 'male'
  }

  let customer1 = {
    email: 'customer1@test.com',
    password: 'test',
    user_type: 'customer',
    first_name: 'wasin',
    last_name: 'watt',
    gender: 'male'
  }

  let employee1 = {
    email: 'employee1@test.com',
    user_type: 'employee',
    work_for: 'match-ser-1',
    gender: 'female'
  }

  let service1 = {}

  let cusToken = ''
  let ownerToken = ''

  before(async () => {
    owner1 = await UserModel.createUser(owner1)
    owner1 = await UserModel.findByEmail(owner1.email)
    ownerToken = jwt.sign({ _id: owner1._id }, 'RESTFULAPIS')
    ownerToken = `JWT ${ownerToken}`
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
      .send(customer1)
      .expect(200)
      .then(async res => {
        expect(res.body).to.have.all.keys('token')
        cusToken = `JWT ${res.body.token}`
        const { _id } = await jwt.verify(cusToken.split(' ')[1], 'RESTFULAPIS')
        const user = await UserModel.findById(_id)
        customer1 = user
        expect(user.email).to.equal('customer1@test.com')
      })
    })
  })

  describe('# /api/auth endpoint', () => {
    it('Wrong email  should get 401', () => {
      return request(app)
      .post('/api/auth')
      .send({ email: 'sss', password: customer1.password })
      .expect(401)
    })
    it('Wrong password should get 401', () => {
      return request(app)
      .post('/api/auth')
      .send({ email: customer1.email, password: 'customer1.password' })
      .expect(401)
    })
    it('Authorized should be able to logged in', () => {
      return request(app)
      .post('/api/auth')
      .send({ email: customer1.email, password: 'test' })
      .expect(200)
      .then(async res => {
        expect(res.body.token).to.be.equal(cusToken.split(' ')[1])
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
      .set('Authorization', cusToken)
      .expect(200)
      .then(async res => {
        expect(res.body.users.length).to.equal(2)
      })
    })
  })

  describe('# /api/users/:id endpoint', () => {
    it('Should return user detail', () => {
      return request(app)
      .get('/api/users/match-user-1')
      .set('Accept', 'application/json')
      .set('Authorization', cusToken)
      .expect(200)
      .then(async res => {
        expect(res.body).to.be.an('object')
        expect(res.body.user_id).to.equal('match-user-1')
      })
    })
  })

  describe('# /api/users/:id/update endpoint', () => {
    it('Should update the user data', () => {
      const update = {
        email: 'update_customer@test.com'
      }
      return request(app)
      .post(`/api/users/${customer1.user_id}/update`)
      .set('Accept', 'appication/json')
      .set('Authorization', cusToken)
      .send(update)
      .expect(200)
      .then(async res => {
        const user = await UserModel.findById(customer1._id)
        expect(res.body.success).to.equal(true)
        expect(user.email).to.equal(update.email)
      })
    })
  })

  describe('# /api/services/new', () => {
    it('Should create a new service', () => {
      return request(app)
      .post('/api/services/new')
      .set('Accept', 'application/json')
      .set('Authorization', ownerToken)
      .send({ service_name: 'service1' })
      .expect(200)
      .then(async res => {
        expect(res.body.service_name).to.equal('service1')
        service1 = res.body
        const user = await UserModel.findById(owner1._id)
        expect(_.includes(user.own_services, res.body.service_id)).to.equal(true)
      })
    })
  })

  describe('# /api/services', () => {
    it('Should list all services', () => {
      return request(app)
      .get('/api/services')
      .set('Accept', 'application/json')
      .set('Authorization', ownerToken)
      .expect(200)
      .then(async res => {
        expect(res.body.services[0].service_id).to.equal('match-ser-1')
      })
    })
  })

  describe('# /api/services/:id/update', () => {
    const update = {
      service_name: 'service_new'
    }
    it('Should update the service data', () => {
      return request(app)
      .post(`/api/services/${service1.service_id}/update`)
      .set('Accept', 'application/json')
      .set('Authorization', ownerToken)
      .send(update)
      .expect(200)
      .then(async () => {
        const service = await ServiceModel.findByServiceId(service1.service_id)
        expect(service.service_name).to.be.equal('service_new')
      })
    })
  })

  describe('# /api/services/:id/add_employee', () => {
    it('Should add an employee to the service', () => {
      return request(app)
      .post(`/api/services/${service1.service_id}/add_employee`)
      .set('Accept', 'application/json')
      .set('Authorization', ownerToken)
      .send(employee1)
      .expect(200)
      .then(async () => {
        const service = await ServiceModel.findByServiceId(service1.service_id)
        const employee = await EmployeeModel.findOne()
        expect(_.includes(service.employees, employee.employee_id)).to.equal(true)
        expect(employee.work_for).to.equal(service.service_id)
      })
    })
  })
})
