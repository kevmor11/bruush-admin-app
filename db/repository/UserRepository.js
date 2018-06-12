const User = require('../model/User'),
      objection = require('objection'),
      Model = objection.Model,
      knex = require('../connection'),
      configs = require('../../config/configs');

Model.knex(knex);

module.exports = {
  getUserByUsername: (username) => {
  	return User
	  .query()
	  .where('username', '=', username)
  },

  listUsers: (page) => {

  	console.log(configs.pageSize);

  	return User
	  .query()
	  .page(page - 1, configs.pageSize);
  },

/*
  getById(id) {
    return User.query()
      .where('id', '=', id);
  },

  listByRetailerId(retailerId, page) {
    return Client.query()
      .where('retailerId', '=', retailerId)
      .eager('[referral, source]')
      .orderBy('firstName')
      .page(page, Config.clientPageSize);
  },
*/
}