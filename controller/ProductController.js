const Product = require('../model/product'),
      shopifyUrl = require('../constants/ShopifyConstants').baseUrl,
      request = require('request');

// Search for a product by ID.
exports.product_search = (req, res) => {
  res.render('products');
};

// Display list of all Products.
exports.product_list = (req, res) => {
  res.send('NOT IMPLEMENTED: Product list');
};

// Display detail page for a specific product.
exports.product_detail = (req, res) => {
  const id = req.body.id;
  request(`${shopifyUrl}/products/${id}.json`, (err, response, body) => {
    if(err) {
      return res.end(err.message);
    }
    const product = JSON.parse(body).product;
    res.render('product-by-id', { product });
  }).on('error', (e) => {
    console.log(e);
  }).end();
};

// Display product create form on GET.
exports.product_create_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Product create GET');
};

// Handle product create on POST.
exports.product_create_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Product create POST');
};

// Display product delete form on GET.
exports.product_delete_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Product delete GET');
};

// Handle product delete on POST.
exports.product_delete_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Product delete POST');
};

// Display product update form on GET.
exports.product_update_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Product update GET');
};

// Handle product update on POST.
exports.product_update_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Product update POST');
};