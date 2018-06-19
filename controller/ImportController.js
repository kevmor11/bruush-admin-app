const ProductRepository = require('../db/repository/ProductRepository'),
      LogsRepository = require('../db/repository/LogsRepository'),
      WinnerRepository = require('../db/repository/WinnerRepository'),
      csvParser = require('csv-parse');

// Get Import Upload Page.
exports.getImport = (req, res) => {
  ProductRepository.listProducts(0).then(products => {
    products = products.results;
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
        product_shopify_id = Number(req.body.product);
  let discount_code = '';

  try {
    csvParser(csvFile, { delimiter: ',' }, (err, data) => {
      if (err) {
        console.log("CSV Error: ", err);
      } else {
        ProductRepository.listProductByShopifyId(product_shopify_id).then(product => {
          product = product[0];
          discount_code = product.discount_code;

          LogsRepository.importLog(data.length, product_shopify_id, discount_code).then(result => {
            result = result[0];

            if(result) {
              const csv_log_id = result.id;

              data.forEach((row, index) => {
                WinnerRepository.createWinner(row[0],row[1], row[2], product_shopify_id, csv_log_id, discount_code).then(result2 => {
                  if(result2 && index === (data.length - 1)) {
                    res.render('success', { title: 'CSV Import Uploaded' });
                  }
                })
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
