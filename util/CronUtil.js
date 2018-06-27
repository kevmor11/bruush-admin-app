const cron = require('node-cron'),
      WinnerRepository = require('../db/repository/WinnerRepository'),
      sendMail = require('./MailUtil');

module.exports = () => {
  cron.schedule('0 8 * * *', () => {
    WinnerRepository.listWinnersToBeMailed().then(customers => {
      customers.forEach((customer) => {
        var sentSuccessfully = sendMail(customer.email, 'Hello', `
          <div style="text-align: center;">
            <img src="cid:logo@cid" style="width: 250px;">
            <h2>You have earned ${customer.discount_rule} a ${customer.name}.</h2>
            <h4>To redeem your prize, go to <a href="https://bruushdev.myshopify.com/cart/${customer.product_shopify_id}:1?discount=${customer.discount_code}${customer.customer_unique_discount_code}">https://bruushdev.myshopify.com/cart/${customer.product_shopify_id}:1?discount=${customer.discount_code}${customer.customer_unique_discount_code}</a>.</h4>
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
    })
  });
}
