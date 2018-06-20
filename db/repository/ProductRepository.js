const Product = require('../model/Product'),
      Model = require('objection').Model,
      knex = require('../connection'),
      configs = require('../../config/configs');

Model.knex(knex);

module.exports = {
  listProducts: (page = 0) => {
    return Product
    .query()
    .select(
      'id',
      'product_shopify_id',
      'name',
      'discount_code'
    )
    .offset(10 * page)
	  .page(page, configs.pageSize);
  },

  listProductById: (id) => {
  	return Product
    .query()
    .select(
      'product_shopify_id',
      'name',
      'discount_code'
    )
    .where({ id })
  },

  listProductByShopifyId: (product_shopify_id) => {
  	return Product
    .query()
    .select(
      'product_shopify_id',
      'name',
      'discount_code'
    )
    .where({ product_shopify_id })
  },

  createProduct: (name, product_shopify_id, discount_code) => {
  	return Product
    .query()
    .insert([{
      name,
      product_shopify_id,
      discount_code
    }])
  },

  updateProduct: (id, name, product_shopify_id, discount_code) => {
  	return Product
    .query()
    .where({ id })
    .update({
      name,
      product_shopify_id,
      discount_code
    })
  },
}
