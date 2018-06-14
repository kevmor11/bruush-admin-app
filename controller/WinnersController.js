const Winners = require('../db/model/Winners');

// Get Winners Page.
exports.getWinners = (req, res) => {
  res.render('winners');
};


exports.postWinners = (req, res) => {

};

// Get Winners Page.
exports.getWinnersByLog = (req, res) => {
  res.render('winners-by-log');
};


exports.postWinnersByLog = (req, res) => {

};