exports.up = (knex, Promise) => {
  return knex.schema.createTable('product', (t) => {
    t.increments('id').primary();
    t.integer('product_shopify_id').notNullable();
    t.string('name').notNullable();
    t.string('discount_code').notNullable();
    t.timestamps(false, true);
  })
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('product');
};
