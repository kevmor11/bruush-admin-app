const express = require('express'),
      request = require('request'),
      router = express.Router()

.get('/', (req, res) => {
  request(`https://${process.env.SHOPIFY_API_KEY_2}:${process.env.SHOPIFY_API_PASSWORD}@bruushdev.myshopify.com/admin/price_rules/${process.env.SHOPIFY_DISCOUNT_ID}/discount_codes.json`, (err, response, body) => {
    if(err) return res.end(err.message);
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
    url: `https://${process.env.SHOPIFY_API_KEY_2}:${process.env.SHOPIFY_API_PASSWORD}@bruushdev.myshopify.com/admin/price_rules/${process.env.SHOPIFY_DISCOUNT_ID}/discount_codes.json`,
    form: formData
  }, (err) => {
    if(err) return res.end(err.message);
    res.redirect('/discounts');
  });
});

module.exports = router;
