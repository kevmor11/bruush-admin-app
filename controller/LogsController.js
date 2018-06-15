const Logs = require('../db/model/Logs'),
      knexFile = require('../knexfile'),
      knex = require('knex')(knexFile);

// Get Logs Page.
exports.getLogs = (req, res) => {
  knex('csv_log')
  .join('product','csv_log.product_id','product.product_shopify_id')
  .select('csv_log.id','csv_log.created_at','csv_log.num_winners','product.name','csv_log.discount_code','csv_log.email_sent_date')
    .then((logs) => {
      res.render('logs', { logs });
    });
};


exports.postLogs = (req, res) => {

};
