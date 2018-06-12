const DiscountController = require('../controller/DiscountController'),
      router = require('express').Router()

// Get all discount codes
.get('/', DiscountController.listDiscounts)

// Create a discount code
.post('/create-discount', DiscountController.createDiscount)

// Delete a discount code
.post('/delete-discount', DiscountController.deleteDiscount);

module.exports = router;
