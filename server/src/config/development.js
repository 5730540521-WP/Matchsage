module.exports = {
  env: 'development',
  db: 'mongodb://localhost/Matchsage',
  port: process.env.PORT || 3001,
  bodyLimit: '100kb',
  corsHeaders: 'Link'
}
