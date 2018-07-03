const WinnerRepository = require('../db/repository/WinnerRepository'),
      request = require('request');

// Get All Winners.
exports.getWinners = (req, res) => {
  let page = Number(req.query.page);
  if(!page) {
    page = 0;
  }

  WinnerRepository.listWinners(page).then(winners => {
    winners = winners.results;
    const winnerCount = winners.length;
    res.render('winners', { winners, page, winnerCount });
  });
};

// Get Winners of a certain CSV Log.
exports.getWinnersByLog = (req, res) => {
  const id = req.params.id;
  let page = Number(req.query.page);
  if(!page) {
    page = 0;
  }

  WinnerRepository.listWinnersByLog(id, page).then(winners => {
    winners = winners.results;
    const winnerCount = winners.length;
    res.render('winners-by-log', { winners, id, page, winnerCount });
  });
};

// unsubscribe a customer from emails
exports.unsubscribeCustomer = (req, res) => {
  const dashboard_code = req.params.dashboard_code;

  WinnerRepository.unsubscribeWinner(dashboard_code).then(result => {
    res.redirect(`${process.env.DOMAIN_ARYIES}/unsubscribe/${dashboard_code}`);
  });
};