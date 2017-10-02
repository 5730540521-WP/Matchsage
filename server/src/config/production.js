module.exports = {
  env: 'production',
  db: process.env.MONGO_URI,
  port: process.env.PORT || 3002,
  bodyLimit: '100kb',
  corsHeaders: 'Link'
}
