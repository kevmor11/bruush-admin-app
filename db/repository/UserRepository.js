const User = require('../model/User');
const objection = require('objection');
const Model = objection.Model;
const knex = require('../connection');
Model.knex(knex);

module.exports = {
  getUserByUsername: (username) => {
  	return User
	  .query()
	  .where('username', '=', username)
  },

/*
  getById(id) {
    return User.query()
      .where('id', '=', id);
  },

  asyncGet(id) {
    const query = async () => {
      const clients = await Client.query()
      .where('id', '=', id);

      let client = null;
      if (clients && clients.length > 0) {
        client = clients[0];
      }
      return client;
    }

    return query();
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