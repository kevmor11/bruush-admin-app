const cron = require('node-cron'),
      knexFile = require('../knexfile'),
      knex = require('knex')(knexFile),
      sendMail = require('./MailUtil');

module.exports = () => {
  cron.schedule('0 8 * * *', () => {
  // cron.schedule('* * * * *', () => {
  knex('customer')
    .select('id','email','discount_code')
    .where({ email_to_be_sent: 1 })
    .then(customers => {
      customers.forEach((customer) => {
        // TODO customize emails
        var sentSuccessfully = sendMail(customer.email, 'Hello', '<h1>Hello, World</h1>');
        var isSent = new Promise(resolve => {
          resolve(sentSuccessfully);
        });
        isSent.then(() => {
          knex('customer')
            .where({ id: customer.id })
            .update({
              email_has_been_sent: 1,
              email_to_be_sent: 0,
              email_sent_date: new Date()
            })
            .then(() => {
              console.log("Missed emails were resent.");
            })
        })
      })
    })
  });
}