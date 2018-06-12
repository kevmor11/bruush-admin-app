const Login = require('../model/login');

// Get Login Page.
exports.getLogin = (req, res) => {
  res.render('login');
};

/**
Post login information

Request:
username - Admin username
password - Admin password
*/
exports.postLogin = (req, res) => {
  const username = req.body.id,
        password = req.body.password;

  try {
    request(`${shopifyUrl}/products/${id}.json`, (err, response, body) => {
      const product = JSON.parse(body).product;
      res.render('product-by-id', { product });
    });
  } catch (error) {
    return res.end(error.message);
  }
};

// Logout
exports.logout = (req, res) => {
  const username = req.body.id,
        password = req.body.password;

  try {
    request(`${shopifyUrl}/products/${id}.json`, (err, response, body) => {
      const product = JSON.parse(body).product;
      res.render('product-by-id', { product });
    });
  } catch (error) {
    return res.end(error.message);
  }
};
