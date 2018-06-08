const product_controller = require('../controller/ProductController'),
      router = require('express').Router()

.get('/', product_controller.getProductById)

.post('/id', product_controller.detailProduct);

module.exports = router;
