// Update with your config settings.
require('dotenv').config();

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      filename: './db/connection'
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: process.env.DATABASE_URL + '?ssl=true',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
