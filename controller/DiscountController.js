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

// Display detail page for a specific discount.
exports.discount_detail = (req, res) => {
  res.send('NOT IMPLEMENTED: Discount detail: ' + req.params.id);
};

// Display discount create form on GET.
exports.discount_create_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Discount create GET');
};

// Handle discount create on POST.
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

// Display discount delete form on GET.
exports.discount_delete_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Discount delete GET');
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

// Display discount update form on GET.
exports.discount_update_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Discount update GET');
};

// Handle discount update on POST.
exports.discount_update_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Discount update POST');
};