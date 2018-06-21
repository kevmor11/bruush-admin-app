const ProductController = require('../controller/ProductController'),
      isLoggedIn = require('../util/isLoggedIn'),
      router = require('express').Router()

.get('/', isLoggedIn, ProductController.getProducts)

.get('/edit/', isLoggedIn, ProductController.getCreateProduct)

.post('/edit/upload', ProductController.postCreateProduct)

.post('/edit/update', ProductController.postUpdateProduct);

module.exports = router;