### Startup Steps

 * Clone repo and run `npm i` from root
 * Create database and get credentials
 * Run migrations with `knex migrate:latest`
 * Create .env and add contents
 * Run `npm run dev` to start app in dev mode

## Knex Commands

 - `knex migrate:make [migration name]` to create a new migration
 - Once migrations are written - `knex migrate:latest` to run the migration
 - `knex migrate:rollback` to rollback the most recent batch of migrations

## .env Contents

 - SHOPIFY_API_KEY
 - SHOPIFY_API_PASSWORD
 - DATABASE_HOST
 - DATABASE_USER
 - DATABASE_PASSWORD
 - DATABASE_NAME
 - SHOPIFY_DISCOUNT_ID
 - SHOPIFY_STORE_URL
 - SEND_FROM_MAIL
 - PORT
 - AWS_ACCESS_KEY_ID
 - AWS_SECRET_ACCESS_KEY