const Import = require('../db/model/Import'),
      csvParser = require('csv-parse'),
      knex = require('../knexfile');

// Get Winners Page.
exports.getImport = (req, res) => {
  res.render('import');
};

exports.postImport = (req, res) => {
  const csvFile = req.file.buffer,
        productID = req.body.product,
        discount_code = '';
        // TODO where to get discount code??

  csvParser(csvFile, {
    delimiter: ','
  }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const csvInsert = new Promise((resolve, reject) => {
        const query = knex('csv_log').insert([
          { num_winners: (data.length + 1) },
          { product_id: productID },
          { discount_code /* TODO get discount code */ }
        ]);
        resolve(query);
        reject(new Error('The csv_log insert query failed'));
      });

      csvInsert.then(() => {
        data.forEach((row) => {
          try {
            const query = knex('customer').insert([
              { email: row[0] },
              { created_date: row[1] },
              { num_referrals: row[2] },
              { product_id: productID },
              { discount_code /* TODO get discount code */ }
            ]);

            if(query) {
              res.render('import-success');
            }
          } catch (error) {
            console.log("The customer insert query failed");
            return res.end(error.message);
          }
        });
      });
    }
  });
};
