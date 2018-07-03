const WinnersController = require('../controller/WinnersController'),
      router = require('express').Router()

// unsubscribe a customer from emails
.get('/:dashboard_code', WinnersController.unsubscribeCustomer);

module.exports = router;