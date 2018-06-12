const winners_controller = require('../controller/WinnersController'),
      router = require('express').Router()

// Get all discount codes
.get('/', winners_controller.getWinners)

// Create a discount code
.post('/', winners_controller.postWinners);

module.exports = router;
