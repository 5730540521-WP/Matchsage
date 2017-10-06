const mongoose = require('mongoose')
const config = require('./config')

module.exports = () => {
  mongoose.connect(config.db)
}
