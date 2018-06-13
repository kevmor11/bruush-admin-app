const WinnersController = require('../controller/WinnersController'),
      isLoggedIn = require('../util/isLoggedIn'),
      router = require('express').Router()

// Get all discount codes
.get('/', isLoggedIn, WinnersController.getWinners)

// Create a discount code
.post('/', WinnersController.postWinners);

module.exports = router;