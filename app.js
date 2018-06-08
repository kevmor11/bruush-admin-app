const express = require('express'),
      app = express(),
      { Model } = require('objection'),
      Knex = require('knex'),
      compression = require('compression'),
      path = require('path'),
      bodyParser = require('body-parser'),
      connection = require('./db/connection'),
      sendMail = require('./util/MailUtil');

app.set('views', path.join(__dirname, 'view'))
   .set('view engine', 'ejs')
   .use(compression())
   .use(bodyParser.json())
   .use(bodyParser.urlencoded({ extended: false }))
   .use(express.static(path.join(__dirname, '../public')));

// Routes
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

app.get('/', (req, res) => {
  res.redirect('/discounts');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
