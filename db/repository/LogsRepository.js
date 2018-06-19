const Log = require('../model/Log'),
      Model = require('objection').Model,
      knexFile = require('../../knexfile'),
      knex = require('knex')(knexFile);
      configs = require('../../config/configs');

Model.knex(knex);

module.exports = {
  listLogs: (page) => {
    return Log
    .query()
    .join(
      'product',
      'csv_log.product_id',
      'product.product_shopify_id'
    )
    .select(
      'csv_log.id',
      'csv_log.created_at',
      'csv_log.num_winners',
      'product.name',
      'csv_log.discount_code',
      'csv_log.email_sent_date'
    )
    .offset(10 * page)
	  .page(page, configs.pageSize);
  },

  importLog: (num_winners, product_id, discount_code) => {
    return Log
    .query()
    .insert([{
      num_winners,
      product_id,
      discount_code
    }], 'id')
  },

  setLogsAsSent: (id) => {
    return Log
    .query()
    .where({ id })
    .update({
      email_sent_date: new Date()
    })
  }
}
