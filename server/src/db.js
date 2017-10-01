const mongoose = require('mongoose')

module.exports = () => {
  // connect to a database if needed, then pass it to `callback`:
  mongoose.connect(process.env.MONGO_LOCAL)
}
