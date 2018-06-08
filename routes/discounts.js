const request = require('request'),
      router = require('express').Router()

var discount_controller = require('../controller/DiscountController');

// Get all discount codes
router.get('/', discount_controller.discount_list);

// Create a discount code
router.post('/create-discount', discount_controller.discount_create_post);

// Delete a discount code
router.post('/delete-discount', discount_controller.discount_delete_post);

module.exports = router;
