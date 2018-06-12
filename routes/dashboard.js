const router = require('express').Router()

// Get all discount codes
.get('/', (req,res) => {
  // TODO check that user is logged in, else redirect to /login
  res.render('dashboard');
});

module.exports = router;
