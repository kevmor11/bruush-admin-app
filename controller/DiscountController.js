const Discount = require('../model/discount'),
      shopifyURL = require('../constants/ShopifyConstants').baseUrl,
      request = require('request');

// Display list of all Discounts.
exports.discount_list = (req, res) => {
  request(`${shopifyURL}/price_rules/${process.env.SHOPIFY_DISCOUNT_ID}/discount_codes.json`, (err, response, body) => {
    if(err) {
      return res.end(err.message);
    }
    const discounts = JSON.parse(body).discount_codes;
    res.render('discounts', { discounts });
  }).on('error', (e) => {
    console.log(e);
  }).end();
};

// Handle discount code create on POST.
exports.discount_create_post = (req, res) => {
  const code = req.body.code;
  const formData = {
    discount_code: {
      code
    }
  };

  request.post({
    url: `${shopifyURL}/price_rules/${process.env.SHOPIFY_DISCOUNT_ID}/discount_codes.json`,
    form: formData
  }, (err) => {
    if(err) {
      return res.end(err.message);
    }
    res.redirect('/discounts');
  });
};

// Handle discount delete on POST.
exports.discount_delete_post = (req, res) => {
  const id = req.body.id;

  request.delete(`${shopifyURL}/price_rules/${process.env.SHOPIFY_DISCOUNT_ID}/discount_codes/${id}.json`, (err) => {
    if(err) {
      return res.end(err.message);
    }
    res.redirect('/discounts');
  });
};
