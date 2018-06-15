const Winners = require('../db/model/Winners'),
      knexFile = require('../knexfile'),
      knex = require('knex')(knexFile);

// Get Winners Page.
exports.getWinners = (req, res) => {
  knex('customer')
    .join('product','customer.product_id','product.product_shopify_id')
    .select('customer.id','customer.email','customer.num_referrals','product.name','customer.discount_code','customer.email_sent_date')
    .then((winners) => {
      res.render('winners', { winners });
    });
};


exports.postWinners = (req, res) => {

};

// Get Winners Page.
exports.getWinnersByLog = (req, res) => {
  res.render('winners-by-log');
};


exports.postWinnersByLog = (req, res) => {

};