const Winner = require('../model/Winner'),
      Model = require('objection').Model,
      knex = require('../connection'),
      configs = require('../../config/configs');

Model.knex(knex);

module.exports = {
  listWinners: (page = 0) => {
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
      'customer.email_sent_date',
      'customer.customer_unique_discount_code'
    )
    .offset(10 * page)
	  .page(page, configs.pageSize);
  },

  listWinnersByLog: (id, page = 0) => {
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
      'customer.email_sent_date',
      'customer.customer_unique_discount_code'
    )
    .where({ csv_log_id: id})
    .offset(10 * page)
	  .page(page, configs.pageSize);
  },

  listWinnersByLogNoPagination: (id) => {
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
      'customer.email_sent_date',
      'customer.customer_unique_discount_code'
    )
    .where({ csv_log_id: id})
  },

  listWinnersToBeMailed: () => {
    return Winner
    .query()
    .select('id','email','discount_code','customer_unique_discount_code')
    .where({ email_to_be_sent: 1 })
  },

  createWinner: (email, signup_date, num_referrals, product_id, csv_log_id, discount_code, customer_unique_discount_code) => {
    return Winner
    .query()
    .insert([{
      email,
      signup_date,
      num_referrals,
      product_id,
      csv_log_id,
      discount_code,
      customer_unique_discount_code
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
