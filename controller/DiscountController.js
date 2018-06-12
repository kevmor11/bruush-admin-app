const Discount = require('../db/model/discount'),
      shopifyURL = require('../constants/ShopifyConstants').baseUrl,
      request = require('request');

// Display list of all Discounts.
exports.listDiscounts = (req, res) => {
  try {
    request(`${shopifyURL}/price_rules/${process.env.SHOPIFY_DISCOUNT_ID}/discount_codes.json`, (err, response, body) => {
      const discounts = JSON.parse(body).discount_codes;
      res.render('discounts', { discounts });
    });
  } catch (error) {
    return res.end(error.message);
  }
};

/**
Handle discount code create on POST

Request:
code - Name of Discount Code
formData - API Call Payload
*/
exports.createDiscount = (req, res) => {
  const code = req.body.code;
  const formData = {
    discount_code: {
      code
    }
  };

  try {
    request.post({
      url: `${shopifyURL}/price_rules/${process.env.SHOPIFY_DISCOUNT_ID}/discount_codes.json`,
      form: formData
    }, () => {
      res.redirect('/discounts');
    });
  } catch (error) {
    return res.end(error.message);
  }
};

/**
Handle discount delete on POST

Request:
id - ID of Discount Code being Deleted
*/
exports.deleteDiscount = (req, res) => {
  const id = req.body.id;

  try {
    request.delete(`${shopifyURL}/price_rules/${process.env.SHOPIFY_DISCOUNT_ID}/discount_codes/${id}.json`, () => {
      res.redirect('/discounts');
    });
  } catch (error) {
    return res.end(error.message);
  }
};
