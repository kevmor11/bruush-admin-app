const discount_controller = require('../controller/DiscountController'),
      router = require('express').Router()

// Get all discount codes
.get('/', discount_controller.discount_list)

// Create a discount code
.post('/create-discount', discount_controller.discount_create_post)

// Delete a discount code
.post('/delete-discount', discount_controller.discount_delete_post);

module.exports = router;
