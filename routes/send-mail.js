const MailerController = require('../controller/MailerController'),
      isLoggedIn = require('../util/isLoggedIn'),
      router = require('express').Router()

// Get all discount codes
.post('/', isLoggedIn, MailerController.sendMailWinners);

module.exports = router;