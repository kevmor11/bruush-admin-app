const LoginController = require('../controller/LoginController'),
      isLoggedIn = require('../util/isLoggedIn'),
      passport = require('passport'),
      router = require('express').Router()

// Get all discount codes
.get('/', isLoggedIn, LoginController.getLogin)

// Create a discount code
.post('/',
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  })
)

.get('/hello', LoginController.hello)
.get('/users/page/:page', LoginController.listUsers)

module.exports = router;
