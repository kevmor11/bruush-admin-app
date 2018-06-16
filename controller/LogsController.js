const Logs = require('../db/model/Log'),
      knexFile = require('../knexfile'),
      knex = require('knex')(knexFile),
      LogsRepository = require('../db/repository/LogsRepository');

// Get Logs Page.
exports.getLogs = (req, res) => {
  let page = Number(req.query.page);
  if(!page) {
    page = 0;
  }
  knex('csv_log')
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
    .limit(10)
    .offset(10 * page)
    .then((logs) => {
      const logsCount = logs.length;
      res.render('logs', { logs, page, logsCount });
    });
  // LogsRepository.getAllLogs().then(logs => {
  //   res.render('logs', { logs });
  // })
};
