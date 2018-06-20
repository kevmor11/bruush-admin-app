const cron = require('node-cron'),
      WinnerRepository = require('../db/repository/WinnerRepository'),
      knexFile = require('../knexfile'),
      knex = require('knex')(knexFile),
      sendMail = require('./MailUtil');

module.exports = () => {
  cron.schedule('0 8 * * *', () => {
    WinnerRepository.listWinnersToBeMailed().then(customers => {
      customers.forEach((customer) => {
        // TODO customize emails
        var sentSuccessfully = sendMail(customer.email, 'Hello', '<h1>Hello, World</h1>');
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
