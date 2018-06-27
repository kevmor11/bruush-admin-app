const sendMail = require('../util/MailUtil'),
      WinnerRepository = require('../db/repository/WinnerRepository'),
      LogsRepository = require('../db/repository/LogsRepository');

// Send emails to all winners from a given csv_log.
exports.sendMailWinners = (req, res) => {
  const csv_log_id = Number(req.body.logid);

  WinnerRepository.listWinnersByLogNoPagination(csv_log_id).then(customers => {

    WinnerRepository.setWinnersToBeSent(csv_log_id).then(result => {
      customers.forEach((customer, i) => {
        if (customer.discount_code === null) {
          customer.discount_code = '';
        }
        if (customer.customer_unique_discount_code === null) {
          customer.customer_unique_discount_code = '';
        }
        // TODO customize emails
        var sentSuccessfully = sendMail(customer.email,'Hello',`
          <div style="text-align: center;">
            <img src="cid:logo@cid" style="width: 250px;">
            <h2>You have earned ${customer.discount_rule} a ${customer.name}.</h2>
            <h4>To redeem your prize, go to <a href="https://bruushdev.myshopify.com/cart/${customer.product_shopify_id}:1?discount=${customer.discount_code}${customer.customer_unique_discount_code}">https://bruushdev.myshopify.com/cart/${customer.product_shopify_id}:1?discount=${customer.discount_code}${customer.customer_unique_discount_code}</a>.</h4>
          </div>
        `);
        var isSent = new Promise((resolve) => {
          resolve(sentSuccessfully);
        });

        isSent.then(() => {
          WinnerRepository.setWinnersAsSent(customer.id).then(result => {

            // On the last iteration of the array, render the success page
            if(i === (customers.length - 1)) {
              LogsRepository.setLogsAsSent(csv_log_id).then(result => {
                res.render('success', { title: 'Emails Sent' });
              })
            }
          })
        })
      })
    })
  })
};
