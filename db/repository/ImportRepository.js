// const Import = require('../model/Import'),
//       Model = require('objection').Model,
//       knexFile = require('../../knexfile'),
//       knex = require('knex')(knexFile);
//       configs = require('../../config/configs');

// Model.knex(knex);

// module.exports = {
//   listLogs: (page) => {
//     return Import
//     .query()
//     .join(
//       'product',
//       'csv_log.product_id',
//       'product.product_shopify_id'
//     )
//     .select(
//       'csv_log.id',
//       'csv_log.created_at',
//       'csv_log.num_winners',
//       'product.name',
//       'csv_log.discount_code',
//       'csv_log.email_sent_date'
//     )
//     .offset(10 * page)
// 	  .page(page, configs.pageSize);
//   }
// }
