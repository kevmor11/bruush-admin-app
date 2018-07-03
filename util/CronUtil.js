const cron = require('node-cron'),
      WinnerRepository = require('../db/repository/WinnerRepository'),
      sendMail = require('./MailUtil');

module.exports = () => {
  cron.schedule('0 8 * * *', () => {
    WinnerRepository.listWinnersToBeMailed().then(customers => {
      if(customers.length > 0) {
        customers.forEach((customer) => {
          var sentSuccessfully = sendMail(customer.email, 'Hello', `
            <div style="text-align: center; margin: 0 15%;">
              <img src="cid:logo@cid" style="width: 100px; margin-bottom: 40px;">
              <h1 style="font-size: 26px;"><div style="font-size: 32px;">Congratulations!</div><br>You have earned ${customer.discount_rule} a ${customer.name}.</h1>
              <div style="font-size: 16px; margin-top: 20px;">To redeem your prize, click on the button below.<br><br>
              <a style="display: inline-block; text-decoration: none; padding: 1rem 1.5rem; font-size: 20px; border-radius: .25rem; background-color: #007bff; color: #fff;" href="https://bruushdev.myshopify.com/cart/${customer.product_shopify_id}:1?discount=${customer.discount_code}${customer.customer_unique_discount_code}">Redeem Prize</a>
              <br><br>OR<br><br>
              Copy paste this URL into your browser:<br><br>

              <a style="margin: 0 50px;" href="https://bruushdev.myshopify.com/cart/${customer.product_shopify_id}:1?discount=${customer.discount_code}${customer.customer_unique_discount_code}">https://bruushdev.myshopify.com/cart/${customer.product_shopify_id}:1?discount=${customer.discount_code}${customer.customer_unique_discount_code}.</a></div>

              <div style="font-size: 16px; margin-top: 20px;">Thank you for participating in the contest.</div>

              <footer style="margin-top: 50px; border-top: 1px solid #E7E7E7; background-color: #F9F9F9; padding: 20px 40px;">
                <a href="http://facebook.com" style="margin: 0 15px;"><img style="display: inline-block; height: 25px; padding-top: 3px;" src="cid:facebook@cid"></a>
                <a href="http://instagram.com" style="margin: 0 15px;"><img style="display: inline-block; height: 31px;" src="cid:instagram@cid"></a>
                <hr style="display: block; height: 1px; border: 0; border-top: 1px solid #E7E7E7; margin: 20px 0; padding: 0;"/>
                <div style="color: grey;">If you would like to unsubscribe from receiving these emails, please click <a href="www.bruush.com">here.</a></div>
              </footer>
            </div>
          `);
          var isSent = new Promise(resolve => {
            resolve(sentSuccessfully);
          });
          isSent.then(() => {
            WinnerRepository.setWinnersAsSent(customer.id).then(() => {
              console.log("Missed emails were resent.");
            })
          })
        })
      }
    })
  });
}
