const LogsController = require('../controller/LogsController'),
      router = require('express').Router()

// Get all logs
.get('/', LogsController.getLogs)

// Create a discount log
.post('/', LogsController.postLogs);

module.exports = router;
