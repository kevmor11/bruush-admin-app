const ImportController = require('../controller/ImportController'),
      router = require('express').Router()

// Get all discount codes
.get('/', ImportController.getImport)

// Create a discount code
.post('/', ImportController.postImport);

module.exports = router;
