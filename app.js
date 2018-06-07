const dotenv = require('dotenv').config(),
      express = require('express'),
      app = express(),
      crypto = require('crypto'),
      cookie = require('cookie'),
      nonce = require('nonce')(),
      querystring = require('querystring'),
      request = require('request-promise'),
      { Model } = require('objection'),
      Knex = require('knex'),
      compression = require('compression'),
      path = require('path'),
      bodyParser = require('body-parser'),
      connection = require('./db/connection'),
      sendMail = require('./util/mailer');

app.set('views', path.join(__dirname, 'views'))
   .set('view engine', 'ejs')
   .use(compression())
   .use(bodyParser.json())
   .use(bodyParser.urlencoded({ extended: false }))
   .use(express.static(path.join(__dirname, 'public')));

// Controllers
const products = require('./controller/products'),
      discounts = require('./controller/discounts');

app.use('/products', products)
   .use('/discounts', discounts);

const knex = Knex({
  client: 'mysql',
  useNullAsDefault: true,
  connection: {
    filename: './db/connection'
  }
});

Model.knex(knex);

app.get('/', (req, res) => {
  res.redirect('/discounts');
});

// const apiKey = process.env.SHOPIFY_API_KEY,
//       apiSecret = process.env.SHOPIFY_API_SECRET,
//       scopes = 'read_products',
//       forwardingAddress = "https://2e74a3bd.ngrok.io"; // Replace this with your HTTPS Forwarding address

// sendMail('kevin@bruush.com','Hello','Testing');

// Shopify OAuth
// app.get('/shopify', (req, res) => {
//   const shop = req.query.shop;
//   if (shop) {
//     const state = nonce();
//     const redirectUri = forwardingAddress + '/shopify/callback';
//     const installUrl = 'https://' + shop +
//       '/admin/oauth/authorize?client_id=' + apiKey +
//       '&scope=' + scopes +
//       '&state=' + state +
//       '&redirect_uri=' + redirectUri;

//     res.cookie('state', state);
//     res.redirect(installUrl);
//   } else {
//     return res.status(400).send('Missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your request');
//   }
// });

// app.get('/shopify/callback', (req, res) => {
//   const { shop, hmac, code, state } = req.query;
//   const stateCookie = cookie.parse(req.headers.cookie).state;

//   if (state !== stateCookie) {
//     return res.status(403).send('Request origin cannot be verified');
//   }

//   if (shop && hmac && code) {
//     const map = Object.assign({}, req.query);
//     delete map['signature'];
//     delete map['hmac'];
//     const message = querystring.stringify(map);
//     const providedHmac = Buffer.from(hmac, 'utf-8');
//     const generatedHash = Buffer.from(
//       crypto
//         .createHmac('sha256', apiSecret)
//         .update(message)
//         .digest('hex'),
//         'utf-8'
//       );
//     let hashEquals = false;

//     try {
//       hashEquals = crypto.timingSafeEqual(generatedHash, providedHmac)
//     } catch (e) {
//       hashEquals = false;
//     };

//     if (!hashEquals) {
//       return res.status(400).send('HMAC validation failed');
//     }

//     const accessTokenRequestUrl = 'https://' + shop + '/admin/oauth/access_token';
//     const accessTokenPayload = {
//       client_id: apiKey,
//       client_secret: apiSecret,
//       code,
//     };

//     request.post(accessTokenRequestUrl, { json: accessTokenPayload })
//     .then((accessTokenResponse) => {
//       const accessToken = accessTokenResponse.access_token;

//       const shopRequestUrl = 'https://' + shop + '/admin/shop.json';
//       const shopRequestHeaders = {
//         'X-Shopify-Access-Token': accessToken,
//       };

//       request.get(shopRequestUrl, { headers: shopRequestHeaders })
//       .then((shopResponse) => {
//         res.end(shopResponse);
//       })
//       .catch((error) => {
//         res.status(error.statusCode).send(error.error.error_description);
//       });
//     })
//     .catch((error) => {
//       res.status(error.statusCode).send(error.error.error_description);
//     });

//   } else {
//     res.status(400).send('Required parameters missing');
//   }
// });

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
