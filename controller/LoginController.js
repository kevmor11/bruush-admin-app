const Login = require('../db/model/users');

// Get Login Page.
exports.getLogin = (req, res) => {
  res.render('login');
};

/**
Post login information

Request:
username - Admin username
password - Admin password
*/
exports.postLogin = (req, res) => {
  const username = req.body.username,
        password = req.body.password;


};

// Logout
exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};
