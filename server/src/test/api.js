const chai = require('chai')
const request = require('supertest')
const _ = require('lodash')
const mongoose = require('mongoose')
const Promise = require('bluebird')
const jwt = require('jsonwebtoken')
const Moment = require('moment')

const app = require('../')
const UserModel = require('../models/user')
const ServiceModel = require('../models/service')
const EmployeeModel = require('../models/employee')
const ReserveModel = require('../models/reservation')
const RatingModel = require('../models/rating')
const AdminModel = require('../models/admin')
const PaymentAccountModel = require('../models/payment-account')

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

  let owner2 = {
    email: 'owner2@test.com',
    password: 'test',
    user_type: 'owner',
    first_name: 'Roronoa',
    last_name: 'Zoro',
    gender: 'male'
  }

  let customer1 = {
    email: 'wasinwatt@gmail.com',
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
    first_name: 'John1',
    last_name: 'JJ',
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
  let service2 = {}
  let reserve1 = {}
  let reserve2 = {}
  let reserve3 = {}
  let employee2 = {
    email: 'employee2@test.com',
    user_type: 'employee',
    first_name: 'Jack',
    last_name: 'the ripper',
    work_for: 'match-ser-4',
    gender: 'female'
  }

  let serviceTestRemove = {service_name: 'service-test-remove'}
  let serviceTestRemove2 = {service_name: 'service-test-remove2'}

  let serviceTestRemovewUser = {service_name: 'service-test-remove-w/user'}
  let serviceTestRemovewUser2 = {service_name: 'service-test-remove-w/user2'}
  let reserveTestRemovewUser = {}
  let reserveTestRemovewUser2 = {}

  let customerTestDel = {
    email: 'customerDel@test.com',
    password: 'test',
    user_type: 'customer',
    first_name: 'die',
    last_name: 'tmr',
    gender: 'male'
  }

  let cusToken = ''
  let ownerToken = ''
  let adminToken = ''
  let cusToken2 = ''
  let ownerToken2 = ''
  let cusTokenTestDel = ''
  let payment1 = {number: '1', amount: 10000000, company: 'Task world'}

  before(async () => {
    owner1 = await UserModel.createUser(owner1)
    ownerToken = jwt.sign({ user_id: owner1.user_id, user_type: owner1.user_type }, 'MATCHSAGE_USER')
    ownerToken = `JWT ${ownerToken}`
    owner2 = await UserModel.createUser(owner2)
    ownerToken2 = jwt.sign({ user_id: owner2.user_id, user_type: owner2.user_type }, 'MATCHSAGE_USER')
    ownerToken2 = `JWT ${ownerToken2}`
    customer2 = await UserModel.createUser(customer2)
    cusToken2 = jwt.sign({user_id: customer2.user_id, user_type: customer2.user_type}, 'MATCHSAGE_USER')
    cusToken2 = `JWT ${cusToken2}`
    serviceTestRemove.owner_id = owner1.user_id
    serviceTestRemove = await ServiceModel.createService(serviceTestRemove)
    serviceTestRemove2.owner_id = owner1.user_id
    serviceTestRemove2 = await ServiceModel.createService(serviceTestRemove2)
    customerTestDel = await UserModel.createUser(customerTestDel)
    cusTokenTestDel = jwt.sign({user_id: customerTestDel.user_id, user_type: customerTestDel.user_type}, 'MATCHSAGE_USER')
    cusTokenTestDel = `JWT ${cusTokenTestDel}`
    employee2 = await EmployeeModel.createEmployee(employee2)
    reserve2 = await ReserveModel.createReservation({
      customer_id: customer2.user_id,
      service_id: serviceTestRemove.service_id,
      employee_id: employee2.employee_id,
      start_time: '0000',
      end_time: '0300',
      date_reserved: '2048-13-32',
      date_created: Moment().format('YYYY-MM-DD')
    })
    reserve3 = await ReserveModel.createReservation({
      customer_id: customer2.user_id,
      service_id: serviceTestRemove.service_id,
      employee_id: employee2.employee_id,
      start_time: '0000',
      end_time: '0300',
      date_reserved: '2048-13-32',
      date_created: Moment().format('YYYY-MM-DD')
    })
    serviceTestRemovewUser.owner_id = customerTestDel.user_id
    serviceTestRemovewUser = await ServiceModel.createService(serviceTestRemovewUser)
    serviceTestRemovewUser2.owner_id = customerTestDel.user_id
    serviceTestRemovewUser2 = await ServiceModel.createService(serviceTestRemovewUser2)
    reserveTestRemovewUser = await ReserveModel.createReservation({
      customer_id: customerTestDel.user_id,
      service_id: serviceTestRemovewUser.service_id,
      employee_id: employee2.employee_id,
      start_time: '0000',
      end_time: '0300',
      date_reserved: '2048-13-32',
      date_created: Moment().format('YYYY-MM-DD')
    })
    reserveTestRemovewUser2 = await ReserveModel.createReservation({
      customer_id: customerTestDel.user_id,
      service_id: serviceTestRemovewUser2.service_id,
      employee_id: employee2.employee_id,
      start_time: '0000',
      end_time: '0300',
      date_reserved: '2048-13-32',
      date_created: Moment().format('YYYY-MM-DD')
    })
  })

  after(() => {
    mongoose.connection.db.dropDatabase()
  })

  describe('# check connection', () => {
    it('should get the software version', () => {
      return request(app)
      .get('/api')
      .expect(200)
      .then(res => {
        expect(res.body.version).to.equal('1.0.0')
      })
    })
  })

  describe('# user signup', () => {
    it('should be able to sign up && user will appear in the database', () => {
      const tmpMail = customer1.email
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
        expect(user.email).to.equal(tmpMail)
      })
    })
  })

  describe('# user auth', () => {
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
          cusToken = `JWT ${res.body.token}`
        })
    })
  })

  describe('# admin signup', () => {
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

  describe('# admin auth', () => {
    it('Authorized admin should be able to logged in', () => {
      return request(app)
      .post('/api/admin-auth')
      .send({ email: admin1.email, password: 'test' })
      .expect(200)
      .then(async res => {
        adminToken = `JWT ${res.body.token}`
      })
    })
  })

  describe('# search users', () => {
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
        expect(res.body.users.length).to.equal(5)
      })
    })
    it('Authorized should get all users', () => {
      return request(app)
      .get('/api/users?user_type=owner&keyword=own')
      .set('Accept', 'application/json')
      .set('Authorization', adminToken)
      .expect(200)
      .then(async res => {
        expect(res.body.users.length).to.equal(2)
        expect(res.body.users[0].is_delete).to.equal(false)
      })
    })
  })

  describe('# see user', () => {
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

  describe('# update user', () => {
    it('Should update the user data', () => {
      const update = {
        first_name: 'Robert'
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
        expect(user.first_name).to.equal(update.first_name)
      })
    })
  })

  describe('# delete user', () => {
    it('Admin should able to delete the user data', () => {
      const tmpId = customerTestDel.user_id
      const tmpSerId1 = serviceTestRemovewUser.serviceId
      const tmpSerId2 = serviceTestRemovewUser2.serviceId
      const tmpReserId1 = reserveTestRemovewUser.reserve_id
      const tmpReserId2 = reserveTestRemovewUser2.reserve_id
      console.log(customerTestDel)
      return request(app)
      .get(`/api/users/${customerTestDel.user_id}/delete`)
      .set('Accept', 'appication/json')
      .set('Authorization', adminToken)
      .expect(200)
      .then(async res => {
        const user = await UserModel.findByUserId(tmpId)
        expect(user).to.equal(null)
        const ser1 = await ServiceModel.findByServiceId(tmpSerId1)
        expect(ser1).to.equal(null)
        const ser2 = await ServiceModel.findByServiceId(tmpSerId2)
        expect(ser2).to.equal(null)
        const reser1 = await ReserveModel.findByReservationId(tmpReserId1)
        expect(reser1).to.equal(null)
        const reser2 = await ReserveModel.findByReservationId(tmpReserId2)
        expect(reser2).to.equal(null)
      })
    })
  })

  describe('# revive user', () => {
    it('Admin should be able to revive deleted user', () => {
      return request(app)
      .get(`/api/users/${customerTestDel.user_id}/revive`)
      .set('Accept', 'appication/json')
      .set('Authorization', adminToken)
      .expect(200)
      .then(async res => {
        const user = await UserModel.findByUserId(customerTestDel.user_id)
        expect(user.user_id).to.equal(customerTestDel.user_id)
      })
    })
  })

  describe('# add payment', () => {
    it('should be able to add credit card', () => {
      return request(app)
      .post(`/api/users/${customer1.user_id}/add-credit-card`)
      .set('Accept', 'application/json')
      .set('Authorization', cusToken)
      .send({ number: 'xxxxxxxxxxxxxxxx', company: 'visa' })
      .expect(200)
      .then(async res => {
        const user = await UserModel.findByUserId(customer1.user_id)
        const card = await PaymentAccountModel.findByNumber('xxxxxxxxxxxxxxxx')
        expect(card.user_id).to.equal(customer1.user_id)
        expect(card.amount).to.gte(2000)
        expect(user.payment_accounts[0]).to.equal('xxxxxxxxxxxxxxxx')
        payment1 = await PaymentAccountModel.findByNumber(user.payment_accounts[0])
        customer1 = await UserModel.findByUserId(customer1.user_id)
      })
    })
    it('should be able to add bank account', () => {
      return request(app)
      .post(`/api/users/${customer1.user_id}/add-bank-account`)
      .set('Accept', 'application/json')
      .set('Authorization', cusToken)
      .send({ number: 'yyyyyyyyyyyyyyyy', company: 'kasikorn' })
      .expect(200)
      .then(async res => {
        const user = await UserModel.findByUserId(customer1.user_id)
        const account = await PaymentAccountModel.findByNumber('yyyyyyyyyyyyyyyy')
        expect(account.user_id).to.equal(customer1.user_id)
        expect(account.company).to.equal('kasikorn')
        expect(account.amount).to.gte(2000)
        expect(_.includes(user.payment_accounts, 'yyyyyyyyyyyyyyyy')).to.equal(true)
      })
    })
  })

  describe('# get payment accounts', () => {
    it('Should list all correct payment accounts of a user', () => {
      return request(app)
      .get(`/api/users/${customer1.user_id}/payment_accounts`)
      .set('Accept', 'application/json')
      .set('Authorization', cusToken)
      .expect(200)
      .then(async res => {
        expect(res.body.payment_accounts.length).to.equal(2)
      })
    })
  })

  describe('# create service', () => {
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
      .get('/api/services/search?service_name=ser&rating=1.5')
      .set('Accept', 'application/json')
      .set('Authorization', cusToken)
      .expect(200)
      .then(async res => {
        expect(res.body.services.length).to.equal(0)
      })
    })
  })

  describe('# see service', () => {
    it('should get service detail', () => {
      return request(app)
      .get(`/api/services/${service1.service_id}`)
      .set('Accept', 'application/json')
      .set('Authorization', cusToken)
      .expect(200)
      .then(async res => {
        expect(res.body.service_id).to.equal(service1.service_id)
      })
    })
  })

  describe('# update service', () => {
    const update = {
      service_name: 'service_new'
    }

    /* it('Other should not able to update the service data', () => {
      return request(app)
      .post(`/api/services/${service1.service_id}/update`)
      .set('Accept', 'application/json')
      .set('Authorization', ownerToken2)
      .send(update)
      .expect(401)
    }) */

    it('Owner should able to update the service data', () => {
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

    const update1 = {
      service_name: 'service_new_again'
    }
    it('Admin should able to update the service data', () => {
      return request(app)
      .post(`/api/services/${service1.service_id}/update`)
      .set('Accept', 'application/json')
      .set('Authorization', adminToken)
      .send(update1)
      .expect(200)
      .then(async () => {
        const service = await ServiceModel.findByServiceId(service1.service_id)
        expect(service.service_name).to.be.equal('service_new_again')
      })
    })
  })

  describe('# remove service', () => {
    it('Owner should able to remove the specified service', () => {
      const tmpId = serviceTestRemove.service_id
      const tmpReserveId2 = reserve2.reserve_id
      const tmpReserveId3 = reserve3.reserve_id
      return request(app)
      .get(`/api/services/${serviceTestRemove.service_id}/delete`)
      .set('Accept', 'application/json')
      .set('Authorization', ownerToken)
      .expect(200)
      .then(async res => {
        const serv = await ServiceModel.findByServiceId(tmpId)
        expect(serv).to.equal(null)
        let tmpRes = await ReserveModel.findByReservationId(tmpReserveId2)
        expect(tmpRes).to.equal(null)
        tmpRes = await ReserveModel.findByReservationId(tmpReserveId3)
        expect(tmpRes).to.equal(null)
      })
    })

    it('Should able to add new service', () => {
      return request(app)
      .post('/api/services/new')
      .set('Accept', 'application/json')
      .set('Authorization', ownerToken)
      .send({ service_name: 'service2' })
      .expect(200)
      .then(async res => {
        expect(res.body.service_name).to.equal('service2')
        service2 = res.body
        const user = await UserModel.findByUserId(owner1.user_id)
        expect(_.includes(user.own_services, service2.service_id)).to.equal(true)
      })
    })

    it('Admin should able to remove the specified service', () => {
      const tmpId = serviceTestRemove2.service_id
      return request(app)
      .get(`/api/services/${serviceTestRemove2.service_id}/delete`)
      .set('Accept', 'application/json')
      .set('Authorization', adminToken)
      .expect(200)
      .then(async res => {
        const serv = await ServiceModel.findByServiceId(tmpId)
        expect(serv).to.equal(null)
      })
    })
  })

  describe('# add employee', () => {
    it('Should add an employee to the service', () => {
      return request(app)
      .post(`/api/services/${service1.service_id}/add_employee`)
      .set('Accept', 'application/json')
      .set('Authorization', ownerToken)
      .send(employee1)
      .expect(200)
      .then(async res => {
        const service = await ServiceModel.findByServiceId(service1.service_id)
        const employee = await EmployeeModel.findByEmployeeId(res.body.employee_id)
        employee1 = employee
        expect(_.includes(service.employees, employee.employee_id)).to.equal(true)
        expect(employee.work_for).to.equal(service.service_id)
      })
    })
  })

  describe('# get available employees', () => {
    it('Should get all available employee in paticular date and time', () => {
      return request(app)
      .post(`/api/services/${service1.service_id}/avai_employees`)
      .set('Accept', 'application/json')
      .set('Authorization', ownerToken)
      .expect(200)
      .then(async res => {
        expect(res.body.length).to.equal(1)
        expect(res.body[0].employee_id).to.equal(employee1.employee_id)
      })
    })
  })

  describe('# create reservation', () => {
    it('Should create a new reservation', () => {
      console.log(customer1)
      const tmpAmount = payment1.amount
      const body = {
        service_id: service1.service_id,
        employee_id: employee1.employee_id,
        start_time: '0100',
        end_time: '0300',
        date_reserved: '29-12-2017',
        payment_number: payment1.number
      }
      return request(app)
      .post(`/api/reservations/new`)
      .set('Accept', 'application/json')
      .set('Authorization', cusToken)
      .send(body)
      .expect(200)
      .then(async res => {
        reserve1 = res.body
        expect(res.body.service_id).to.equal(service1.service_id)
        expect(res.body.customer_id).to.equal(customer1.user_id)
        expect(res.body.employee_id).to.equal(employee1.employee_id)
        payment1 = await PaymentAccountModel.findByNumber(payment1.number)
        expect(payment1.amount).to.equal(tmpAmount - res.body.price * 0.3)
      })
    })
  })

  describe('# see reservation', () => {
    it('Unauthorized customer should not be able to access to other\'s reservation', () => {
      return request(app)
      .get(`/api/reservations/${reserve1.reserve_id}/`)
      .set('Accept', 'application/json')
      .set('Authorization', cusToken2)
      .expect(400)
    })
    it('Unauthorized service owner should not be able to access to other\'s reservation', () => {
      return request(app)
      .get(`/api/reservations/${reserve1.reserve_id}/`)
      .set('Accept', 'application/json')
      .set('Authorization', ownerToken2)
      .expect(400)
    })
    it('Authorized should be able to access resservation', () => {
      return request(app)
      .get(`/api/reservations/${reserve1.reserve_id}/`)
      .set('Accept', 'application/json')
      .set('Authorization', cusToken)
      .expect(200)
      .then(async () => {
        const reserve = await ReserveModel.findByReservationId(reserve1.reserve_id)
        expect(reserve.customer_id).to.equal(customer1.user_id)
      })
    })
  })

  describe('# make full payment for reservation', () => {
    it('UnAuthorized customer should not be able to pay for other\'s reservation', () => {
      return request(app)
      .post(`/api/reservations/${reserve1.reserve_id}/make-full-payment`)
      .set('Accept', 'application/json')
      .set('Authorization', ownerToken)
      .send({payment_number: customer1.payment_accounts[0]})
      .expect(401)
    })

    it('Authorized customer should be able to pay for his own reservation', () => {
      const tmpAmount = payment1.amount
      return request(app)
      .post(`/api/reservations/${reserve1.reserve_id}/make-full-payment`)
      .set('Accept', 'application/json')
      .set('Authorization', cusToken)
      .send({payment_number: customer1.payment_accounts[0]})
      .expect(200)
      .then(async () => {
        const reserve = await ReserveModel.findByReservationId(reserve1.reserve_id)
        expect(reserve.paid_status).to.equal('fully-paid')
        payment1 = await PaymentAccountModel.findByNumber(payment1.number)
        expect(payment1.amount).to.equal(tmpAmount - reserve.price * 0.7)
      })
    })
  })

  describe('# cancel reservation', () => {
    it('UnAuthorized customer should not be able to cancel other reservation', () => {
      return request(app)
      .get(`/api/reservations/${reserve1.reserve_id}/cancel`)
      .set('Accept', 'application/json')
      .set('Authorization', ownerToken)
      .expect(401)
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

  // add complaint test
  describe('# complaint', () => {
    it('should create a new complaint', () => {
      return request(app)
      .post(`/api/complaints/new/`)
      .set('Accept', 'application/json')
      .set('Authorization', cusToken)
      .send({ service_id: service1.service_id, complaint_type: 'service' })
      .expect(200)
      .then(async res => {
        expect(res.body.service_id).to.equal(service1.service_id)
        expect(res.body.customer_id).to.equal(customer1.user_id)
        expect(res.body.complaint_type).to.equal('service')
      })
    })
    it('should list all complaints', () => {
      return request(app)
      .get(`/api/complaints/`)
      .set('Accept', 'application/json')
      .set('Authorization', adminToken)
      .expect(200)
      .then(async res => {
        expect(res.body.complaint[0].complaint_id).to.equal('match-com-1')
      })
    })
  })

  // add receipt test
  describe('# receipt', () => {
    /* it('should be able to create new receipt', () => {
      return request(app)
      .post(`/api/receipts/new`)
      .set('Accept', 'application/json')
      .set('Authorization', cusToken)
      .send({ customer_id: customer1.user_id, reservation_id: reserve1.reserve_id })
      .expect(200)
      .then(async res => {
        expect(res.body.customer_id).to.equal(customer1.user_id)
        expect(res.body.reservation_id).to.equal(reserve1.reserve_id)
      })
    })
    new receipt move to created on new reservation*/
    it('should list all receipts', () => {
      return request(app)
      .get(`/api/receipts/`)
      .set('Accept', 'application/json')
      .set('Authorization', cusToken)
      .expect(200)
      .then(async res => {
        expect(res.body.receipt[0].receipt_id).to.equal('match-rec-1')
      })
    })

    it('should be able to show receipt for specific reservation', () => {
      return request(app)
      .get(`/api/receipts/${reserve1.reserve_id}`)
      .set('Accept', 'application/json')
      .set('Authorization', cusToken)
      .expect(200)
      .then(async res => {
        expect(res.body.reservation_id).to.equal(reserve1.reserve_id)
      })
    })

    it('should be able to download the pdf receipt', () => {
      return request(app)
      .get(`/api/receipts/${reserve1.reserve_id}/download`)
      .set('Accept', 'application/pdf')
      .set('Authorization', cusToken)
      .expect(200)
    })
  })
})
