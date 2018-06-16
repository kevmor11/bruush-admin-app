const Product = require('../db/model/Product'),
      shopifyUrl = require('../constants/ShopifyConstants').baseUrl,
      request = require('request'),
      knexFile = require('../knexfile'),
      knex = require('knex')(knexFile);

// Get all products.
exports.getProducts = (req, res) => {
  let page = Number(req.query.page);
  if(!page) {
    page = 0;
  }
  knex
    .select(
      'id',
      'product_shopify_id',
      'name',
      'discount_code'
    )
    .from('product')
    .limit(10)
    .offset(10 * page)
    .then((products) => {
      const productCount = products.length;
      res.render('products', { products, page, productCount });
    });
};

/**
Display detail page for a specific product

Request:
id - ID of Product Being Shown
*/
// exports.detailProduct = (req, res) => {
//   const id = req.body.id;

//   try {
//     request(`${shopifyUrl}/products/${id}.json`, (err, response, body) => {
//       const product = JSON.parse(body).product;
//       res.render('product-by-id', { product });
//     });
//   } catch (error) {
//     return res.end(error.message);
//   }
// };

// Get Create Product page
exports.getCreateProduct = (req, res) => {
  const id = req.query.id;
  if(id) {
    knex
      .select(
        'product_shopify_id',
        'name',
        'discount_code'
      )
      .from('product')
      .where({ id })
      .then((product) => {
        product = product[0];
        res.render('edit-product', { product, id });
      });
  } else {
    const product = '';
    res.render('edit-product', { product });
  }
};

// Post info to create a product
exports.postCreateProduct = (req, res) => {
  const name = req.body.name,
        product_shopify_id = req.body.productid,
        discount_code = req.body.discountcode;

  knex('product')
    .insert([{
      name,
      product_shopify_id,
      discount_code
    }])
    .then((result) => {
      if(result) {
        res.render('success', { title: 'Product Uploaded' });
      }
    });
};

// Post info to update a product
exports.postUpdateProduct = (req, res) => {
  const name = req.body.name,
        product_shopify_id = req.body.productid,
        discount_code = req.body.discountcode,
        id = req.body.id;

  knex('product')
    .where({ id })
    .update({
      name,
      product_shopify_id,
      discount_code
    })
    .then((result) => {
      if(result) {
        res.render('success', { title: `Product ${name} Updated` });
      }
    });
};
