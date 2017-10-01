const http = require('http')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const initializeDb = require('./db')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const api = require('./api')
const path = require('path')
const config = require('./config')
require('dotenv').config()

let app = express()
app.server = http.createServer(app)
initializeDb()
// logger
app.use(morgan('dev'))

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
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jwt.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIS', (err, decode) => {
      if (err) req.user = undefined
      req.user = decode
      next()
    })
  } else {
    req.user = undefined
    next()
  }
})

// add api here
app.use('/api', api)

app.server.listen(process.env.PORT || config.port, () => {
  console.log(`Started on port ${app.server.address().port}`)
})

module.exports = app
