const Product = require('../db/model/Product'),
      shopifyUrl = require('../constants/ShopifyConstants').baseUrl,
      request = require('request');

// Search for a product by ID.
exports.getProductById = (req, res) => {
  res.render('products');
};

/**
Display detail page for a specific product

Request:
id - ID of Product Being Shown
*/
exports.detailProduct = (req, res) => {
  const id = req.body.id;

  try {
    request(`${shopifyUrl}/products/${id}.json`, (err, response, body) => {
      const product = JSON.parse(body).product;
      res.render('product-by-id', { product });
    });
  } catch (error) {
    return res.end(error.message);
  }
};

// Get Product Edit page
exports.getCreateProduct = (req, res) => {
  res.render('edit-product');
};

// Post info to add a product
exports.postCreateProduct = (req, res) => {
  const name = req.body.name,
        productId = req.body.productid,
        discountCode = req.body.discountcode;
};
