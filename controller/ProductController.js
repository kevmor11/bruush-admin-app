const request = require('request'),
      router = require('express').Router()

.get('/', (req, res) => {
  res.render('products');
})

.post('/id', (req, res) => {
  const id = req.body.id;
  request(`https://${process.env.SHOPIFY_API_KEY_2}:${process.env.SHOPIFY_API_PASSWORD}@bruushdev.myshopify.com/admin/products/${id}.json`, (err, response, body) => {
    if(err) return res.end(err.message);
    const product = JSON.parse(body).product;
    res.render('product-by-id', { product });
  }).on('error', (e) => {
    console.log(e);
  }).end();
});

module.exports = router;
