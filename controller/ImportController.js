const Import = require('../db/model/Import'),
      csvParser = require('csv-parse'),
      knexFile = require('../knexfile'),
      knex = require('knex')(knexFile);

// Get Import Upload Page.
exports.getImport = (req, res) => {
  knex('product')
    .select(
      'name',
      'product_shopify_id',
    )
    .then((products) => {
      res.render('import', { products });
    });
};

/**
Post info to import a CSV Log

Request:
csvFile - CSV File contents
product_shopify_id - Shopify ID of Product belonging to CSV Log being created
discount_code - Discount Code of Product belonging to CSV Log being created

*/
exports.postImport = (req, res) => {
  const csvFile = req.file.buffer,
        product_shopify_id = req.body.product;
  let discount_code = '';

  try {
    csvParser(csvFile, { delimiter: ',' }, (err, data) => {
      if (err) {
        console.log("CSV Error: ", err);
      } else {
        knex('product')
          .select('discount_code')
          .where({ product_shopify_id })
          .then((code) => {
            discount_code = code[0].discount_code;
            knex('csv_log')
              .insert([{
                num_winners: data.length,
                product_id: product_shopify_id,
                discount_code
              }], 'id')
              .then((result) => {
                const csv_log_id = result[0];
                if(result) {
                  data.forEach((row, index) => {
                    knex('customer').insert([{
                      email: row[0],
                      signup_date: row[1],
                      num_referrals: row[2],
                      product_id: product_shopify_id,
                      csv_log_id,
                      discount_code
                    }])
                    .then((result2) => {
                      if(result2 && index === (data.length - 1)) {
                        res.render('success', { title: 'CSV Import Uploaded' });
                      }
                    });
                  });
                } else {
                  console.log("Error uploading CSV data to Customer table");
                }
              });
          })
      }
    });
  } catch (error) {
    console.log("Error: ", error.message);
  }
};
