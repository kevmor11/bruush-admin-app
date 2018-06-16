const LogsController = require('../controller/LogsController'),
      isLoggedIn = require('../util/isLoggedIn'),
      router = require('express').Router()

// Get all logs
.get('/', isLoggedIn, LogsController.getLogs)

module.exports = router;