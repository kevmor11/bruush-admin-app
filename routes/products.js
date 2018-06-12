const ProductController = require('../controller/ProductController'),
      router = require('express').Router()

.get('/', ProductController.getProductById)

.post('/id', ProductController.detailProduct);

module.exports = router;
