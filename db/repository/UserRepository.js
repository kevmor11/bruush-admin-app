const User = require('../model/User');
const objection = require('objection');
const Model = objection.Model;
const knex = require('../connection');
Model.knex(knex);

const configs = require('../../config/configs');

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