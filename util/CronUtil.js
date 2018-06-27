const cron = require('node-cron'),
      WinnerRepository = require('../db/repository/WinnerRepository'),
      sendMail = require('./MailUtil');

module.exports = () => {
  cron.schedule('0 8 * * *', () => {
    WinnerRepository.listWinnersToBeMailed().then(customers => {
      customers.forEach((customer) => {
        // TODO customize emails
        var sentSuccessfully = sendMail(customer.email, 'Hello', `
          <ol>
            <li>Product - ${customer.name}</li>
            <li>Discount Code - ${customer.discount_code} ${customer.customer_unique_discount_code}</li>
            <li>Product URL - <a href="https://bruushdev.myshopify.com/cart/${customer.product_shopify_id}:1?discount=${customer.discount_code}">https://bruushdev.myshopify.com/cart/${customer.product_shopify_id}:1?discount=${customer.discount_code}</a></li>
            <li>
              Instructions - You have earned ${customer.discount_rule} a ${customer.name}.
              To redeem your prize, go to <a href="https://bruushdev.myshopify.com/cart/${customer.product_shopify_id}:1?discount=${customer.discount_code}">https://bruushdev.myshopify.com/cart/${customer.product_shopify_id}:1?discount=${customer.discount_code}</a> and enter your discount code upon checkout.
            </li>
          </ol>
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
