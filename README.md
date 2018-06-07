## AWS.SES Config

`aws-config.json` file must contain accessKeyId, secretAccessKey, and AWS region and be stored in the root directory.

Credentials can be created here:

https://docs.aws.amazon.com/ses/latest/DeveloperGuide/smtp-credentials.html

## Knex Commands

 - Once migrations are written - `knex migrate:latest` to run the migration
 - `knex migrate:rollback` to rollback the most recent batch of migrations

## .env Contents

 - SHOPIFY_API_KEY
 - SHOPIFY_API_SECRET
 - DATABASE_HOST
 - DATABASE_USER
 - DATABASE_PASSWORD
 - DATABASE_NAME
 - DATABASE_URL