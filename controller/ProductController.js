const ProductRepository = require('../db/repository/ProductRepository'),
      shopifyUrl = require('../constants/ShopifyConstants').baseUrl,
      request = require('request');

// Get all products.
exports.getProducts = (req, res) => {
  let page = Number(req.query.page);
  if(!page) {
    page = 0;
  }
  ProductRepository.listProducts(page).then(products => {
    products = products.results;
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

/**
Get Create Product page

Request:
id - ID of Product being Edited, if one exists
*/
exports.getCreateProduct = (req, res) => {
  const id = req.query.id;
  let title = '';

  if(id) {
    ProductRepository.listProductById(id).then(product => {
      product = product[0];
      title = 'Edit';
      res.render('edit-product', { product, id, title });
    });
  } else {
    const product = '';
    title = 'Add';
    res.render('edit-product', { product, title });
  }
};

/**
Post info to create a product

Request:
name - Name of Product being created
product_shopify_id - Shopify ID of Product being created
discount_code - Discount Code of Product being created
*/
exports.postCreateProduct = (req, res) => {
  const name = req.body.name,
        product_shopify_id = req.body.productid,
        discount_code = req.body.discountcode;

  // checking to see if shopify ID is already used by another product
    // because it must be unique per each product registered
  ProductRepository.checkShopifyIdUnique(product_shopify_id).then(result => {
    if (result.length > 0) {
      res.render('product-error');
    } else {
      ProductRepository.createProduct(name, product_shopify_id, discount_code).then(product => {
        product = product[0];
        if(product) {
          res.render('success', { title: 'Product Uploaded' });
        }
      });
    }
  })
};

/**
Post info to update a product

Request:
name - Name of Product being updated
product_shopify_id - Shopify ID of Product being updated
discount_code - Discount Code of Product being updated
id - ID of Product being updated

*/
exports.postUpdateProduct = (req, res) => {
  const name = req.body.name,
        product_shopify_id = req.body.productid,
        discount_code = req.body.discountcode,
        id = req.body.id;

  ProductRepository.updateProduct(id, name, product_shopify_id, discount_code).then(product => {
    if(product) {
      res.render('success', { title: `Product ${name} Updated` });
    }
  });
};
