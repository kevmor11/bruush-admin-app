exports.up = (knex, Promise) => {
  return knex.schema.createTable('customer', (t) => {
    t.increments('id').primary();
    t.string('email').notNullable();
    t.integer('num_referrals').notNullable();
    t.integer('product_id').notNullable();
    t.integer('csv_log_id');
    t.string('discount_code').notNullable();
    t.date('email_sent_date').defaultTo(null);
    t.date('signup_date').defaultTo(null);
    t.timestamps(false, true);
  })
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('customer');
};
