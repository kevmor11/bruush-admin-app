const WinnersController = require('../controller/WinnersController'),
      isLoggedIn = require('../util/isLoggedIn'),
      router = require('express').Router()

// Get all discount codes
.get('/:id', isLoggedIn, WinnersController.getWinnersByLog)

module.exports = router;