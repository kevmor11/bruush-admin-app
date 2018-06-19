const WinnerRepository = require('../db/repository/WinnerRepository');

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
