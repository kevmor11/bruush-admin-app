const sendMail = require('../util/MailUtil'),
      WinnerRepository = require('../db/repository/WinnerRepository'),
      LogsRepository = require('../db/repository/LogsRepository');

// Send emails to all winners from a given csv_log.
exports.sendMailWinners = (req, res) => {
  const csv_log_id = Number(req.body.logid);

  WinnerRepository.listWinnersByLogNoPagination(csv_log_id).then(customers => {

    WinnerRepository.setWinnersToBeSent(csv_log_id).then(result => {
      customers.forEach((customer, i) => {
        // TODO customize emails
        var sentSuccessfully = sendMail(customer.email,'Hello','<h1>Hello, World</h1>');
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
