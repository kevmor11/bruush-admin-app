const sendMail = require('../util/MailUtil'),
      WinnerRepository = require('../db/repository/WinnerRepository'),
      LogsRepository = require('../db/repository/LogsRepository');

// Send emails to all winners from a given csv_log.
exports.sendMailWinners = (req, res) => {
  const csv_log_id = Number(req.body.logid);

  WinnerRepository.listSubscribedWinnersByLog(csv_log_id).then(customers => {

    if(customers.length > 0) {
      WinnerRepository.setWinnersToBeSent(csv_log_id).then(result => {

        customers.forEach((customer, i) => {
          if (customer.discount_code === null) {
            customer.discount_code = '';
          }
          if (customer.customer_unique_discount_code === null) {
            customer.customer_unique_discount_code = '';
          }

<<<<<<< HEAD
          var sentSuccessfully = sendMail(customer.email,'You\'ve won a Prize',`
            <div style="text-align: center; margin: 0 15%;">
              <img src="cid:logo@cid" style="width: 100px; margin-bottom: 40px;">
              <h1 style="font-size: 26px;"><div style="font-size: 32px;">Congratulations!</div><br>You have earned ${customer.discount_rule} a ${customer.name}.</h1>
=======
          var sentSuccessfully = sendMail(customer.email,'You have Won a Prize!',`
            <div style="text-align: center; margin: 0 13%;">
              <img src="cid:logo@cid" style="width: 100px; margin-bottom: 30px;">
              <h1 style="font-size: 26px;"><div style="font-size: 30px;">Congratulations!</div><br>You have earned ${customer.discount_rule} a ${customer.name}.</h1>
>>>>>>> 4c235cd0bf5ac3ba12a5446cb464f12ff00b261e
              <div style="font-size: 16px; margin-top: 20px;">To redeem your prize, click on the button below.<br><br>
              <a style="display: inline-block; text-decoration: none; padding: 1rem 1.5rem; font-size: 20px; border-radius: .25rem; background-color: #007bff; color: #fff;" href="https://bruushdev.myshopify.com/cart/${customer.product_shopify_id}:1?discount=${customer.discount_code}${customer.customer_unique_discount_code}">Redeem Prize</a>
              <br><br>OR<br><br>
              Copy & Paste this URL into your browser:<br><br>

              <a style="margin: 0 50px;" href="https://bruushdev.myshopify.com/cart/${customer.product_shopify_id}:1?discount=${customer.discount_code}${customer.customer_unique_discount_code}">https://bruushdev.myshopify.com/cart/${customer.product_shopify_id}:1?discount=${customer.discount_code}${customer.customer_unique_discount_code}.</a></div>

              <div style="font-size: 16px; margin-top: 20px;">Thank you for participating in the contest.</div>

<<<<<<< HEAD
              <footer style="margin-top: 50px; border-top: 1px solid #E7E7E7; background-color: #F9F9F9; padding: 20px 40px;">
                <a href="http://facebook.com" style="margin: 0 15px;"><img style="display: inline-block; height: 25px; padding-top: 3px;" src="cid:facebook@cid"></a>
                <a href="http://instagram.com" style="margin: 0 15px;"><img style="display: inline-block; height: 31px;" src="cid:instagram@cid"></a>

=======
              <footer style="margin-top: 30px; border-top: 1px solid #E7E7E7; background-color: #F9F9F9; padding: 20px 40px;">
                <a href="http://facebook.com" style="margin: 0 15px;"><img style="display: inline-block; height: 25px; width: 13px;" src="cid:facebook@cid"></a>
                <a href="http://instagram.com" style="margin: 0 15px;"><img style="display: inline-block; height: 26px; width: 26px;" src="cid:instagram@cid"></a>
>>>>>>> 4c235cd0bf5ac3ba12a5446cb464f12ff00b261e
                <hr style="display: block; height: 1px; border: 0; border-top: 1px solid #E7E7E7; margin: 20px 0; padding: 0;"/>

                <div style="color: grey;">If you would like to unsubscribe from receiving these emails, please click <a href="${process.env.DOMAIN_PRIZE_APP}/unsubscribe/${customer.dashboard_code}">here.</a></div>
              </footer>
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
    } else {
      res.render('success', { title: 'Emails Sent' });
    }
  })
};
