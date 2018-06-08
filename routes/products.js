const request = require('request'),
      shopifyUrl = require('../constants/ShopifyConstants').baseUrl,
      router = require('express').Router();

router.get('/', (req, res) => {
  res.render('products');
});

router.post('/id', (req, res) => {
  const id = req.body.id;
  request(`${shopifyUrl}/products/${id}.json`, (err, response, body) => {
    if(err) {
      return res.end(err.message);
    }
    const product = JSON.parse(body).product;
    res.render('product-by-id', { product });
  }).on('error', (e) => {
    console.log(e);
  }).end();
});

module.exports = router;
