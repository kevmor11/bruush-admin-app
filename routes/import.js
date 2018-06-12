const import_controller = require('../controller/ImportController'),
      router = require('express').Router()

// Get all discount codes
.get('/', import_controller.getImport)

// Create a discount code
.post('/', import_controller.postImport);

module.exports = router;
