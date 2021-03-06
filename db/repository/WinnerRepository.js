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
      'product.id'
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
      'product.id'
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
    .where({ csv_log_id: id })
    .offset(10 * page)
	  .page(page, configs.pageSize);
  },

  listSubscribedWinnersByLog: (id) => {
    return Winner
    .query()
    .join(
      'product',
      'customer.product_id',
      'product.id'
    )
    .select(
      'customer.id',
      'customer.email',
      'customer.dashboard_code',
      'customer.num_referrals',
      'product.name',
      'product.product_shopify_id',
      'product.product_url',
      'product.discount_rule',
      'customer.discount_code',
      'customer.email_sent_date',
      'customer.customer_unique_discount_code'
    )
    .where({
      csv_log_id: id,
      unsubscribed: 0
    })
  },

  listWinnersToBeMailed: () => {
    return Winner
    .query()
    .select('id','email','discount_code','customer_unique_discount_code')
    .where({
      email_to_be_sent: 1,
      unsubscribed: 0
    })
  },

  createWinner: (email, dashboard_code, signup_date, num_referrals, product_id, csv_log_id, discount_code, customer_unique_discount_code) => {
    return Winner
    .query()
    .insert([{
      email,
      dashboard_code,
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
    .where({
      id: csv_log_id,
      unsubscribed: 0
    })
    .update({ email_to_be_sent: 1 })
  },

  setWinnersAsSent: (id) => {
    return Winner
    .query()
    .where({
      id,
      unsubscribed: 0
    })
    .update({
      email_has_been_sent: 1,
      email_to_be_sent: 0,
      email_sent_date: new Date()
    })
  },

  unsubscribeWinner: (dashboard_code) => {
    return Winner
    .query()
    .where({ dashboard_code })
    .update({ unsubscribed: 1 })
  },
}
