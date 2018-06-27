const LoginController = require('../controller/LoginController'),
      router = require('express').Router();

// Get all discount codes
router.get('/', LoginController.getLogin)

// Create a discount code
.post('/', LoginController.postLogin)

module.exports = router;
