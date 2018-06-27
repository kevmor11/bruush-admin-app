exports.up = (knex, Promise) => {
  return knex.schema.createTable('csv_log', (t) => {
    t.increments('id').primary();
    t.integer('num_winners');
    t.bigInteger('product_id').notNullable();
    t.string('discount_code');
    t.datetime('email_sent_date').defaultTo(null);
    t.timestamps(false, true);
  })
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('csv_log');
};
