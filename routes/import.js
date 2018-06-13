const ImportController = require('../controller/ImportController'),
      isLoggedIn = require('../util/isLoggedIn'),
      multer = require('multer'),
      upload = multer();
      router = require('express').Router()

// Get all discount codes
.get('/', isLoggedIn, ImportController.getImport)

// Create a discount code
.post('/upload', upload.single('csv'), ImportController.postImport);

module.exports = router;