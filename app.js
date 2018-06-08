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
      sendMail = require('./util/MailUtil');

app.set('views', path.join(__dirname, 'views'))
   .set('view engine', 'ejs')
   .use(compression())
   .use(bodyParser.json())
   .use(bodyParser.urlencoded({ extended: false }))
   .use(express.static(path.join(__dirname, 'public')));

// Controllers
const products = require('./routes/products'),
      discounts = require('./routes/discounts');

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

// sendMail('kevin@bruush.com', 'testing', 'Hello, World');

app.get('/', (req, res) => {
  res.redirect('/discounts');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
