const Product = require('../model/product');

// Display list of all Authors.
exports.product_list = (req, res) => {
  res.send('NOT IMPLEMENTED: Product list');
};

// Display detail page for a specific product.
exports.product_detail = (req, res) => {
  res.send('NOT IMPLEMENTED: Product detail: ' + req.params.id);
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