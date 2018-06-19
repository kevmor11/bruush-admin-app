const knexFile = require('../knexfile'),
      knex = require('knex')(knexFile),
      sendMail = require('../util/MailUtil'),
      MailerRepository = require('../db/repository/MailerRepository');

// Get Logs Page.
exports.sendMailWinners = (req, res) => {
  const csv_log_id = req.body.logid;
  // TODO
    // 2. update time that email was sent for csv_log and customer
    // 5. run a cron-job in app.js that loops through all customers that need emails sent that have not been sent yet
    // 6. send remaining emails
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
            var sentSuccessfully = sendMail(customer.email,'Hello','Testing');
            console.log("SENT", sentSuccessfully);
            // TODO sentSuccessfully is not finished by the time the it enters the next block so it returns undefined
            if(sentSuccessfully) {
              knex('customer')
                .where({ id: customer.id })
                .update({
                  email_has_been_sent: 1,
                  email_to_be_sent: 0,
                  email_sent_date: knex.fn.now()
                })
                .then(() => {
                  if(i === (customers.length -1)) {
                    knex('csv_log')
                      .where({ id: csv_log_id })
                      .update({
                        email_sent_date: knex.fn.now()
                      })
                      .then(() => {
                          res.render('success', { title: 'Emails Sent' });
                      })
                  }
                })
            } else {
              console.log("An Email Was Not Sent");
            }
          })
        })
    });
};
