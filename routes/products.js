const ProductController = require('../controller/ProductController'),
      isLoggedIn = require('../util/isLoggedIn'),
      router = require('express').Router()

.get('/', isLoggedIn, ProductController.getProductById)

.post('/id', ProductController.detailProduct);

module.exports = router;