
const config = {
  MONGO_URI: process.env.MONGO_URI,
  port: 3001,
  bodyLimit: '100kb',
  corsHeaders: 'Link'
}

module.exports = config
