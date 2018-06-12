const WinnersController = require('../controller/WinnersController'),
      router = require('express').Router()

// Get all discount codes
.get('/', WinnersController.getWinners)

// Create a discount code
.post('/', WinnersController.postWinners);

module.exports = router;
