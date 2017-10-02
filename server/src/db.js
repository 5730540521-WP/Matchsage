const mongoose = require('mongoose')
const config = require('./config')

module.exports = () => {
  // connect to a database if needed, then pass it to `callback`:
  mongoose.connect(config.db)
}
