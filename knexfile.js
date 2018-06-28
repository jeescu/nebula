
module.exports = {
  client: 'mysql',
  migrations: {
    stub: __dirname + '/lib/templates/migration/template.js',
    directory: process.cwd() + '/database/migrations'
  }
}