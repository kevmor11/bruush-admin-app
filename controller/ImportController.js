const ProductRepository = require('../db/repository/ProductRepository'),
      LogsRepository = require('../db/repository/LogsRepository'),
      WinnerRepository = require('../db/repository/WinnerRepository'),
      csvParser = require('csv-parse'),
      request = require('request'),
      uuidv1 = require('uuid/v1'),
      shopifyURL = require('../constants/ShopifyConstants').baseUrl;

// Get Import Upload Page.
exports.getImport = (req, res) => {
  ProductRepository.listProducts().then(products => {
    products = products.results;
    res.render('import', { products });
  });
};

/**
Post info to import a CSV Log

Request:
csvFile - CSV File contents
product_id - ID of Product belonging to CSV Log being created
discount_code - Discount Code of Product belonging to CSV Log being created

*/
exports.postImport = (req, res) => {
  const csvFile = req.file.buffer,
        product_id = Number(req.body.product),
        discountRule = req.body.discount;
  let discount_code = '',
      discount_rule_id = '';

  try {
    csvParser(csvFile, { delimiter: ',' }, (err, CSVdata) => {
      if (err) {
        console.log("CSV Error: ", err);
      } else {
        ProductRepository.listProductById(product_id).then(product => {
          product = product[0];
          discount_code = product.discount_code;
          discount_rule_id = product.discount_rule_id;

          LogsRepository.importLog(CSVdata.length, product_id, discount_code).then(result => {
            result = result[0];

            if(result) {
              const csv_log_id = result.id;

              CSVdata.forEach((row, index) => {
                if(discountRule === 'unique') {
                  // TODO implement uuid to get unqiue code
                  var code = uuidv1();
                  var formData = {
                    discount_code: {
                      code
                    }
                  };
                  request.post({
                    url: `${shopifyURL}/price_rules/${discount_rule_id}/discount_codes.json`,
                    form: formData
                  }, () => {
                    discount_code = null;
                    WinnerRepository.createWinner(row[0],row[1], row[2], product_id, csv_log_id, discount_code, code).then(result2 => {
                      if(result2 && index === (CSVdata.length - 1)) {
                        res.render('success', { title: 'CSV Import Uploaded' });
                      }
                    })
                  });
                } else {
                  code = null;
                  WinnerRepository.createWinner(row[0],row[1], row[2], product_id, csv_log_id, discount_code, code).then(result2 => {
                    if(result2 && index === (CSVdata.length - 1)) {
                      res.render('success', { title: 'CSV Import Uploaded' });
                    }
                  })
                }
              });
            } else {
              console.log("Error uploading CSV data to Customer table");
            }
          })
        });
      }
    });
  } catch (error) {
    console.log("Error: ", error.message);
  }
};
