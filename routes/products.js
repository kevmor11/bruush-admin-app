const ProductController = require('../controller/ProductController'),
      isLoggedIn = require('../util/isLoggedIn'),
      router = require('express').Router()

.get('/', isLoggedIn, ProductController.getProducts)

module.exports = router;