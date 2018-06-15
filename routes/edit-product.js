const ProductController = require('../controller/ProductController'),
      isLoggedIn = require('../util/isLoggedIn'),
      router = require('express').Router()

.get('/', isLoggedIn, ProductController.getCreateProduct)

.post('/upload', ProductController.postCreateProduct)

.post('/update', ProductController.postUpdateProduct);

module.exports = router;