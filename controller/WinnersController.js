const Winners = require('../db/model/Winner'),
      knexFile = require('../knexfile'),
      knex = require('knex')(knexFile);

// Get All Winners.
exports.getWinners = (req, res) => {
  let page = Number(req.query.page);
  if(!page) {
    page = 0;
  }
  knex('customer')
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
    .limit(10)
    .offset(10 * page)
    .then((winners) => {
      const winnerCount = winners.length;
      res.render('winners', { winners, page, winnerCount });
    });
};

// Get Winners of a certain CSV Log.
exports.getWinnersByLog = (req, res) => {
  const id = req.params.id;
  knex('customer')
    .join(
      'csv_log',
      'customer.csv_log_id',
      'csv_log.id'
    )
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
    .where('csv_log.id', '=', id)
    .then((winners) => {
      res.render('winners-by-log', { winners, id });
    });
};
