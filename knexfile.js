// get app config if available
var appConfig = require(process.cwd() + '/config/app')

module.exports = {
  client: appConfig.client || 'mysql',
  migrations: {
    stub: __dirname + '/lib/templates/migration/template.js',
    directory: process.cwd() + '/database/migrations'
  },
  seeds: {
    directory: process.cwd() + '/database/seeds'
  }
}