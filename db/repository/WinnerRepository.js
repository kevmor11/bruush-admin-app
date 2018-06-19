const Winner = require('../model/Winner'),
      Model = require('objection').Model,
      knex = require('../connection'),
      configs = require('../../config/configs');

Model.knex(knex);

module.exports = {
  listWinners: (page) => {
    return Winner
    .query()
    .join(
      'product',
      'customer.product_id',
      'product.product_shopify_id'
    )
    .select(
      'customer.id',
      'customer.email',
      'customer.num_referrals',
      'product.name',
      'customer.discount_code',
      'customer.email_sent_date'
    )
    .offset(10 * page)
	  .page(page, configs.pageSize);
  },

  listWinnersByLog: (id, page) => {
    return Winner
    .query()
    .join(
      'product',
      'customer.product_id',
      'product.product_shopify_id'
    )
    .select(
      'customer.id',
      'customer.email',
      'customer.num_referrals',
      'product.name',
      'customer.discount_code',
      'customer.email_sent_date'
    )
    .where({ csv_log_id: id})
    .offset(10 * page)
	  .page(page, configs.pageSize);
  },

  createWinner: (email, signup_date, num_referrals, product_id, csv_log_id, discount_code) => {
    return Winner
    .query()
    .insert([{
      email,
      signup_date,
      num_referrals,
      product_id,
      csv_log_id,
      discount_code
    }])
  },

  setWinnersToBeSent: (csv_log_id) => {
    return Winner
    .query()
    .where({ id: csv_log_id })
    .update({ email_to_be_sent: 1 })
  },

  setWinnersAsSent: (id) => {
    return Winner
    .query()
    .where({ id })
    .update({
      email_has_been_sent: 1,
      email_to_be_sent: 0,
      email_sent_date: new Date()
    })
  },
}
