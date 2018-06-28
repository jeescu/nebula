// Update with your config settings.
// @TODO: this can be on a separate project

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host : 'localhost',
      port: "3306",
      user : 'xproj_dev',
      password : 'xproj_dev',
      database : 'xproj_dev'
    },
    pool: { 
      min: 2, 
      max: 10 
    },
    migrations: {
      stub: 'migrations/templates/template.js'
    }
  },

  staging: {
    client: 'mysql',
    connection: {
        host : 'localhost',
        port: "3306",
        user : 'xproj-dev',
        password : 'xproj-dev',
        database : 'xproj-dev'
    },
    pool: { 
        min: 2, 
        max: 10 
    }
  },

  production: {
    client: 'mysql',
    connection: {
        host : 'localhost',
        port: "3306",
        user : 'xproj-dev',
        password : 'xproj-dev',
        database : 'xproj-dev'
    },
    pool: { 
        min: 2, 
        max: 10 
    }
  }

};
