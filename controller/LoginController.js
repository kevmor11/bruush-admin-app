const UserRepository = require('../db/repository/UserRepository');

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

  UserRepository.getUserByUsername(username).then(result => {
    console.log("Result: ", result);
  });
};

// Logout
exports.logout = (req, res) => {
  req.logout();
  res.redirect('/login');
};

exports.hello = (req, res) => {
  UserRepository.getUserByUsername('kenneth').then(results => {
  	console.log(results);
  });

  res.render('login');
};

/*
exports.hello2 = (req, res) => {
  const getUserByUsername = async () => {
  	const user = await UserRepository.getUserByUsername('kenneth');
  	console.log(user);

  	res.render('login');
  };

  return getUserByUsername();
};
*/

exports.listUsers = (req, res) => {
  const page = req.params.page;
  UserRepository.listUsers(page).then(result => {
  	console.log(result);
  });

  res.render('login');
};