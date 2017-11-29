const http = require('http')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const session = require('express-session')

require('dotenv').config()

const initializeDb = require('./db')
const api = require('./api')

const config = require('./config')

let app = express()
app.server = http.createServer(app)
initializeDb()
// logger
app.use(morgan('dev'))

//tmp file
app.use(express.static(path.join('tmp')))

// 3rd party middleware
app.use(cors({
  exposedHeaders: config.corsHeaders
}))

app.use(bodyParser.json({
  limit: config.bodyLimit
}))

app.use(cookieParser())
app.use(session({
  // Here we are creating a unique session identifier
  secret: 'bkung-loves-wongnai',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

app.use(express.static(path.join(__dirname, 'src')))
// middlewares
app.use((req, res, next) => {
  // get decoded actor information from token
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jwt.verify(req.headers.authorization.split(' ')[1], 'MATCHSAGE_USER', (error, decode) => {
      if (error) req.user = undefined
      req.user = decode
      next()
    })
  } else {
    req.user = undefined
    next()
  }
})

// optimize later
app.use((req, res, next) => {
  // get decoded actor information from token
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jwt.verify(req.headers.authorization.split(' ')[1], 'MATCHSAGE_ADMIN', (error, decode) => {
      if (error) req.admin = undefined
      req.admin = decode
      next()
    })
  } else {
    req.admin = undefined
    next()
  }
})
// add api here
app.use('/api', api)

app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.status)
  res.json({ error: err.message })
})

app.server.listen(process.env.PORT || config.port, () => {
  console.log(`Started on port ${app.server.address().port}`)
})

module.exports = app
