module.exports = {
  env: 'test',
  db: 'mongodb://localhost/Matchsage-test',
  port: process.env.PORT || 3003,
  bodyLimit: '100kb',
  corsHeaders: 'Link'
}
