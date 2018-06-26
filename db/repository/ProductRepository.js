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
      'product_url',
      'discount_rule_id',
      'discount_rule',
      'discount_code',
      'discount_code_usage'
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
      'product_url',
      'discount_rule_id',
      'discount_rule',
      'discount_code',
      'discount_code_usage'
    )
    .where({ id })
  },

  createProduct: (name, product_shopify_id, product_url, discount_rule_id, discount_rule, discount_code, discount_code_usage) => {
  	return Product
    .query()
    .insert([{
      name,
      product_shopify_id,
      product_url,
      discount_rule_id,
      discount_rule,
      discount_code,
      discount_code_usage
    }])
  },

  updateProduct: (id, name, product_shopify_id, product_url, discount_rule_id, discount_rule, discount_code, discount_code_usage) => {
  	return Product
    .query()
    .where({ id })
    .update({
      name,
      product_shopify_id,
      product_url,
      discount_rule_id,
      discount_rule,
      discount_code,
      discount_code_usage
    })
  },
}
