const LogsController = require('../controller/LogsController'),
      isLoggedIn = require('../util/isLoggedIn'),
      router = require('express').Router()

// Get all logs
.get('/', isLoggedIn, LogsController.getLogs)

// Create a discount log
.post('/', LogsController.postLogs);

module.exports = router;
