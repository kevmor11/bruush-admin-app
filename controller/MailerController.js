const sendMail = require('../util/MailUtil'),
      WinnerRepository = require('../db/repository/WinnerRepository'),
      LogsRepository = require('../db/repository/LogsRepository');

// Get Logs Page.
exports.sendMailWinners = (req, res) => {
  const csv_log_id = Number(req.body.logid);

  WinnerRepository.listWinnersByLog(csv_log_id).then(customers => {
    customers = customers.results;

    WinnerRepository.setWinnersToBeSent(csv_log_id).then(result => {
      customers.forEach((customer, i) => {
        // TODO customize emails
        var sentSuccessfully = sendMail(customer.email,'Hello','<h1>Hello, World</h1>');
        var isSent = new Promise((resolve) => {
          resolve(sentSuccessfully);
        });

        isSent.then(() => {
          WinnerRepository.setWinnersAsSent(customer.id).then(result => {

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
