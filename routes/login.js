const LoginController = require('../controller/LoginController'),
      isLoggedIn = require('../util/isLoggedIn'),
      passport = require('passport'),
      router = require('express').Router()

// Get all discount codes
.get('/', LoginController.getLogin)

// Create a discount code
.post('/',
  // passport.authenticate('local', {
  //   successRedirect: '/dashboard',
  //   failureRedirect: '/login',
  //   failureFlash: true
  // })
  LoginController.postLogin
)

.get('/hello', LoginController.hello);

module.exports = router;
