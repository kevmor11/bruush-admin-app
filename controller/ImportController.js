const Import = require('../db/model/Import'),
      csvParser = require('csv-parse'),
      knex = require('../knexfile');

// Get Winners Page.
exports.getImport = (req, res) => {
  res.render('import');
};

exports.postImport = (req, res) => {
  const csvFile = req.file.buffer,
        csvData = [],
        productID = req.body.product;

  csvParser(csvFile, {
    delimiter: ','
  }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      data.forEach((row) => {
        const query = knex('csv_log').insert([
          { email: row[0] },
          { created_date: row[1] },
          { num_referrals: row[2] },
          { product_id: productID }
        ]);

        if(query) {
          res.render('import-success');
        }
      });
    }
  });
};
