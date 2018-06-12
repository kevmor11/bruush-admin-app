const login_controller = require('../controller/LoginController'),
      router = require('express').Router()

// Get all discount codes
.get('/', login_controller.getLogin)

// Create a discount code
.post('/', login_controller.postLogin);

module.exports = router;
