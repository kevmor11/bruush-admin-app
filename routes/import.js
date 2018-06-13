const ImportController = require('../controller/ImportController'),
      isLoggedIn = require('../util/isLoggedIn'),
      router = require('express').Router()

// Get all discount codes
.get('/', isLoggedIn, ImportController.getImport)

// Create a discount code
.post('/upload', ImportController.postImport);

module.exports = router;