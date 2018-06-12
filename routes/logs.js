const logs_controller = require('../controller/LogsController'),
      router = require('express').Router()

// Get all logs
.get('/', logs_controller.getLogs)

// Create a discount log
.post('/', logs_controller.postLogs);

module.exports = router;
