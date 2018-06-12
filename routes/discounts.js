const discount_controller = require('../controller/DiscountController'),
      router = require('express').Router()

// Get all discount codes
.get('/', discount_controller.listDiscounts)

// Create a discount code
.post('/create-discount', discount_controller.createDiscount)

// Delete a discount code
.post('/delete-discount', discount_controller.deleteDiscount);

module.exports = router;
