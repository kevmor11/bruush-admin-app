const Import = require('../db/model/Import'),
      csvParser = require('csv-parse'),
      knexFile = require('../knexfile'),
      knex = require('knex')(knexFile);

// Get Import Upload Page.
exports.getImport = (req, res) => {
  res.render('import');
};

/**
Post info to import a CSV Log

Request:
csvFile - CSV File contents
productID - Shopify ID of Product belonging to CSV Log being created
discount_code - Discount Code of Product belonging to CSV Log being created

*/
exports.postImport = (req, res) => {
  const csvFile = req.file.buffer,
        productID = req.body.product,
        discount_code = 'DISCOUNTCODE';
        // TODO where to get discount code??

  try {
    csvParser(csvFile, { delimiter: ',' }, (err, data) => {
      if (err) {
        console.log("CSV Error: ", err);
      } else {
        knex('csv_log')
          .insert([{
            num_winners: (data.length + 1),
            product_id: productID,
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
                  product_id: productID,
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
      }
    });
  } catch (error) {
    console.log("Error: ", error.message);
  }
};
