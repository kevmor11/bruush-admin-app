// Update with your config settings.
require('dotenv').config();

module.exports = {
  client: 'mysql',
  connection: {
      host : process.env.DATABASE_HOST,
      user : process.env.DATABASE_USER,
      password : process.env.DATABASE_PASSWORD,
      database : process.env.DATABASE_NAME
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};