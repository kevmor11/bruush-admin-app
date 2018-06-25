exports.up = (knex, Promise) => {
  return knex.schema.createTable('product', (t) => {
    t.increments('id').primary();
    t.bigInteger('product_shopify_id').notNullable();
    t.string('name').notNullable();
    t.string('product_url').notNullable();
    t.bigInteger('discount_rule_id').notNullable();
    t.string('discount_rule').notNullable();
    t.string('discount_code').notNullable();
    t.timestamps(false, true);
  })
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('product');
};
