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
const ReserveModel = require('../models/reservation')
const RatingModel = require('../models/rating')
const AdminModel = require('../models/admin')

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

  let customer2 = {
    email: 'customer2@test.com',
    password: 'test',
    user_type: 'customer',
    first_name: 'Monkey',
    last_name: 'Luffy',
    gender: 'male'
  }

  let employee1 = {
    email: 'employee1@test.com',
    user_type: 'employee',
    work_for: 'match-ser-1',
    gender: 'female'
  }

  let admin1 = {
    email: 'admin1@test.com',
    password: 'test',
    first_name: 'pun',
    last_name: 'pun'
  }

  let service1 = {}
  let reserve1 = {}

  let cusToken = ''
  let ownerToken = ''
  let adminToken = ''
  let cusToken2 = ''

  before(async () => {
    owner1 = await UserModel.createUser(owner1)
    owner1 = await UserModel.findByEmail(owner1.email)
    ownerToken = jwt.sign({ user_id: owner1.user_id, user_type: owner1.user_type }, 'MATCHSAGE_USER')
    ownerToken = `JWT ${ownerToken}`
    customer2 = await UserModel.createUser(customer2)
    customer2 = await UserModel.findByEmail(customer2.email)
    cusToken2 = jwt.sign({user_id:customer2.user_id, user_type: customer2.user_type}, 'MATCHSAGE_USER')
    cusToken2 = `JWT ${cusToken2}`
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
        const { user_id } = await jwt.verify(cusToken.split(' ')[1], 'MATCHSAGE_USER')
        const user = await UserModel.findByUserId(user_id)
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

  describe('# /api/admin-signup endpoint', () => {
    it('should be able to sign up && user will appear in the database', () => {
      return request(app)
        .post('/api/admin-signup')
        .send(admin1)
        .expect(200)
        .then(async res => {
          expect(res.body).to.have.all.keys('token')
          adminToken = `JWT ${res.body.token}`
          const { admin_id } = await jwt.verify(adminToken.split(' ')[1], 'MATCHSAGE_ADMIN')
          const admin = await AdminModel.findByAdminId(admin_id)
          admin1 = admin
          expect(admin.email).to.equal('admin1@test.com')
        })
    })
  })

  describe('# /api/admin-auth endpoint', () => {
    it('Authorized admin should be able to logged in', () => {
      return request(app)
      .post('/api/admin-auth')
      .send({ email: admin1.email, password: 'test' })
      .expect(200)
      .then(async res => {
        expect(res.body.token).to.be.equal(adminToken.split(' ')[1])
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
      .get('/api/users?keyword=')
      .set('Accept', 'application/json')
      .set('Authorization', adminToken)
      .expect(200)
      .then(async res => {
        expect(res.body.users.length).to.equal(3)
      })
    })
    it('Authorized should get all users', () => {
      return request(app)
      .get('/api/users?user_type=owner&keyword=own')
      .set('Accept', 'application/json')
      .set('Authorization', adminToken)
      .expect(200)
      .then(async res => {
        expect(res.body.users.length).to.equal(1)
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
        const user = await UserModel.findByUserId(customer1.user_id)
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
        const user = await UserModel.findByUserId(owner1.user_id)
        expect(_.includes(user.own_services, res.body.service_id)).to.equal(true)
      })
    })
  })

  describe('# search services', () => {
    it('Should list all services', () => {
      return request(app)
      .get('/api/services')
      .set('Accept', 'application/json')
      .set('Authorization', cusToken)
      .expect(200)
      .then(async res => {
        expect(res.body.services[0].service_id).to.equal('match-ser-1')
      })
    })
    it('Should list services containing input string', () => {
      return request(app)
      .get('/api/services?service_name=ser&rating=1.5')
      .set('Accept', 'application/json')
      .set('Authorization', cusToken)
      .expect(200)
      .then(async res => {
        expect(res.body.services.length).to.equal(0)
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
        employee1 = employee
        expect(_.includes(service.employees, employee.employee_id)).to.equal(true)
        expect(employee.work_for).to.equal(service.service_id)
      })
    })
  })

  describe('# /api/services/:id/avai_employees', () => {
    it('Should get all available employee in paticular date and time', () => {
      return request(app)
      .get(`/api/services/${service1.service_id}/avai_employees`)
      .set('Accept', 'application/json')
      .set('Authorization', ownerToken)
      .expect(200)
      .then(async res => {
        expect(res.body.length).to.equal(1)
        expect(res.body[0].employee_id).to.equal('match-em-1')
      })
    })
  })

  describe('# /api/reservation/new', () => {
    it('Should create a new reservation', () => {
      return request(app)
      .post(`/api/reservations/new`)
      .set('Accept', 'application/json')
      .set('Authorization', cusToken)
      .send({ service_id: service1.service_id, customer_id: customer1.user_id, employee_id: employee1.employee_id })
      .expect(200)
      .then(async res => {
        reserve1 = res.body
        expect(res.body.service_id).to.equal(service1.service_id)
        expect(res.body.customer_id).to.equal(customer1.user_id)
        expect(res.body.employee_id).to.equal(employee1.employee_id)
      })
    })
  })

  describe('# /api/reservation/:id', () => {
    it('Unauthorized user should not be able to access to other\'s reservation', () => {
      return request(app)
      .get(`/api/reservations/${reserve1.reserve_id}/`)
      .set('Accept', 'application/json')
      .set('Authorization', cusToken2)
      .expect(400)
    })
  })

  describe('# /api/reservation/:id/cancel', () => {
    it('UnAuthorized customer should not be able to cancel other reservation', () => {
      return request(app)
      .get(`/api/reservations/${reserve1.reserve_id}/cancel`)
      .set('Accept', 'application/json')
      .set('Authorization', ownerToken)
      .expect(400)
    })

    it('Authorized customer should be able to cancel his own reservation', () => {
      return request(app)
      .get(`/api/reservations/${reserve1.reserve_id}/cancel`)
      .set('Accept', 'application/json')
      .set('Authorization', cusToken)
      .expect(200)
      .then(async () => {
        const reserve = await ReserveModel.findByReservationId(reserve1.reserve_id)
        expect(reserve.is_cancel).to.equal(true)
      })
    })
  })

  describe('# rate', () => {
    it('rate service should be successful', () => {
      return request(app)
      .post(`/api/services/${service1.service_id}/rate`)
      .set('Accept', 'application/json')
      .set('Authorization', cusToken)
      .send({ score: 4, rating_type: 'service' })
      .expect(200)
      .then(async () => {
        const rating = await RatingModel.findOne({ service_id: service1.service_id })
        const service = await ServiceModel.findByServiceId(service1.service_id)
        expect(rating.score).to.equal(4)
        expect(rating.score).to.equal(service.rating)
      })
    })
    it('rate employee should be successful', () => {
      return request(app)
      .post(`/api/employees/${employee1.employee_id}/rate`)
      .set('Accept', 'application/json')
      .set('Authorization', cusToken)
      .send({ score: 3.5, rating_type: 'employee' })
      .expect(200)
      .then(async () => {
        const rating = await RatingModel.findOne({ employee_id: employee1.employee_id })
        const employee = await EmployeeModel.findByEmployeeId(employee1.employee_id)
        expect(rating.score).to.equal(3.5)
        expect(rating.score).to.equal(employee.rating)
      })
    })
  })
})
