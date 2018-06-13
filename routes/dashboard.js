const isLoggedIn = require('../util/isLoggedIn'),
      router = require('express').Router()

// Get all discount codes
.get('/', isLoggedIn, (req,res) => {
  res.render('dashboard');
});

module.exports = router;