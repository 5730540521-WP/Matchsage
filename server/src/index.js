const http = require('http')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const initializeDb = require('./db')
const middleware = require('./middleware')
const api = require('./api')
const path = require('path')
const config = require('./config.json')
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

app.use(express.static(path.join(__dirname, 'src')))
// connect to db
// initializeDb(db => {
// // internal middleware
//   app.use(middleware({ config, db }))
//
// api router
//   app.use('/api', api({ config, db }))
//
//   app.server.listen(process.env.PORT || config.port, () => {
//     console.log(`Started on port ${app.server.address().port}`)
//   })
// })

app.use(middleware())

app.use('/api', api)

app.server.listen(process.env.PORT || config.port, () => {
  console.log(`Started on port ${app.server.address().port}`)
})

module.exports = app
