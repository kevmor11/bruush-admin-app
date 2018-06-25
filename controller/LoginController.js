const UserRepository = require('../db/repository/UserRepository'),
      bcrypt = require('bcrypt');

// Get Login Page.
exports.getLogin = (req, res) => {
  if(req.session.user_id) {
    res.redirect('/dashboard');
  } else {
    res.render('login');
  }
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

  UserRepository.getUserByUsername(username).then(user => {
    user = user[0];

    if(user) {
      const queryUsername = user.username,
            queryPassword = user.password;

      function authenticated(username, password) {
        if (queryUsername === username && bcrypt.compareSync(password, queryPassword, 10)) {
          return true;
        }
      }

      const authenticatedUser = authenticated(username, password);

      if (authenticatedUser) {
        req.session["user_id"] = queryUsername;
        res.redirect("/dashboard");
      } else {
        res.status(403).send("<div style='margin: 16em; text-align: center;'><h1>Login Credentials were incorrect, please try again.</h1><br><a href='/login'><h1>Back to Login Page</h1></a></div>");
      }
    } else {
      res.status(403).send("<div style='margin: 16em; text-align: center;'><h1>Login Credentials were incorrect, please try again.</h1><br><a href='/login'><h1>Back to Login Page</h1></a></div>");
    }
  });
};

// Logout
exports.logout = (req, res) => {
  // req.logout();
  req.session["user_id"] = null;
  res.redirect('/login');
};

