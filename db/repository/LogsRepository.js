const Logs = require('../model/Log'),
      Model = require('objection').Model,
      knexFile = require('../../knexfile'),
      knex = require('knex')(knexFile);
      configs = require('../../config/configs');

Model.knex(knex);

module.exports = {
  getAllLogs: () => {
  	knex('csv_log')
      .join('product','csv_log.product_id','product.product_shopify_id')
      .select('csv_log.id','csv_log.created_at','csv_log.num_winners','product.name','csv_log.discount_code','csv_log.email_sent_date')
      .then((logs) => {
        return logs;
      });
    // return Logs
    //  .query()
    //  .select()
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
