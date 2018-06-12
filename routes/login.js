const login_controller = require('../controller/LoginController'),
      passport = require('passport'),
      router = require('express').Router()

// Get all discount codes
.get('/', login_controller.getLogin)

// Create a discount code
.post('/',
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  })
);

module.exports = router;
