const request = require('request'),
      shopifyUrl = require('../constants/ShopifyConstants').baseUrl,
      router = require('express').Router()

.get('/', (req, res) => {
  request(`${shopifyUrl}/price_rules/${process.env.SHOPIFY_DISCOUNT_ID}/discount_codes.json`, (err, response, body) => {
    if(err) {
      return res.end(err.message);
    }
    const discounts = JSON.parse(body).discount_codes;
    res.render('discounts', { discounts });
  }).on('error', (e) => {
    console.log(e);
  }).end();
})

.post('/create-discount', (req, res) => {
  const code = req.body.code;
  const formData = {
    discount_code: {
      code
    }
  };

  request.post({
    url: `${shopifyUrl}/price_rules/${process.env.SHOPIFY_DISCOUNT_ID}/discount_codes.json`,
    form: formData
  }, (err) => {
    if(err) {
      return res.end(err.message);
    }
    res.redirect('/discounts');
  });
})

.post('/delete-discount', (req, res) => {
  const id = req.body.id;

  request.delete(`${shopifyUrl}/price_rules/${process.env.SHOPIFY_DISCOUNT_ID}/discount_codes/${id}.json`, (err) => {
    if(err) {
      return res.end(err.message);
    }
    res.redirect('/discounts');
  });
});

module.exports = router;
