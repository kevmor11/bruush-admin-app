const knexFile = require('../knexfile'),
      knex = require('knex')(knexFile),
      sendMail = require('../util/MailUtil'),
      MailerRepository = require('../db/repository/MailerRepository');

// Get Logs Page.
exports.sendMailWinners = (req, res) => {
  const csv_log_id = req.body.logid;

  knex('customer')
    .select(
      'id',
      'email',
      'discount_code',
    )
    .where({ csv_log_id })
    .then((customers) => {
      knex('customer')
        .where({ csv_log_id })
        .update({ email_to_be_sent: 1 })
        .then(() => {
          customers.forEach((customer, i) => {
            // TODO customize emails
            var sentSuccessfully = sendMail(customer.email,'Hello','<h1>Hello, World</h1>');
            var isSent = new Promise((resolve) => {
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
                  if(i === (customers.length - 1)) {
                    knex('csv_log')
                      .where({ id: csv_log_id })
                      .update({
                        email_sent_date: new Date()
                      })
                      .then(() => {
                        res.render('success', { title: 'Emails Sent' });
                      })
                  }
                })
            })
          })
        })
    });
};
