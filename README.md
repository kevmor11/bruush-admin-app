## AWS.SES Config

`aws-config.json` file must contain accessKeyId, secretAccessKey, and AWS region and be stored in the root directory.

### aws-config.json example

{
  "accessKeyId": "ABCDE",
  "secretAccessKey": "12345",
  "region": "us-west-2"
}

Credentials can be created here:

https://docs.aws.amazon.com/ses/latest/DeveloperGuide/smtp-credentials.html

## Knex Commands

 - Once migrations are written - `knex migrate:latest` to run the migration
 - `knex migrate:rollback` to rollback the most recent batch of migrations

## .env Contents

 - SHOPIFY_API_KEY
 - SHOPIFY_API_PASSWORD
 - DATABASE_HOST
 - DATABASE_USER
 - DATABASE_PASSWORD
 - DATABASE_NAME
 - DATABASE_URL
 - SHOPIFY_DISCOUNT_ID
 - SHOPIFY_STORE_URL
 - SEND_FROM_MAIL