const product_controller = require('../controller/ProductController'),
      router = require('express').Router()

.get('/', product_controller.product_search)

.post('/id', product_controller.product_detail);

module.exports = router;
