const User = require('../model/User'),
      Model = require('objection').Model,
      knex = require('../connection'),
      configs = require('../../config/configs');

Model.knex(knex);

module.exports = {
  getUserByUsername: (username) => {
  	return User
    .query()
    .select('username', 'password')
	  .where('username', '=', username)
  }
}
