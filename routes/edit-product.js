const ProductController = require('../controller/ProductController'),
      isLoggedIn = require('../util/isLoggedIn'),
      router = require('express').Router()

.get('/', isLoggedIn, ProductController.getCreateProduct)

.post('/upload', ProductController.postCreateProduct);

module.exports = router;