const express = require('express'),
      app = express(),
      { Model } = require('objection'),
      Knex = require('knex'),
      compression = require('compression'),
      path = require('path'),
      bodyParser = require('body-parser'),
      https = require('https'),
      fs = require('fs'),
      connection = require('./db/connection'),
      sendMail = require('./util/MailUtil');

// Settings view engine and middleware
app.set('views', path.join(__dirname, 'view'))
   .set('view engine', 'ejs')
   .use(compression())
   .use(bodyParser.json())
   .use(bodyParser.urlencoded({ extended: false }))
   .use(express.static(path.join(__dirname, './public')));

// Routes
const login = require('./routes/login'),
      logout = require('./routes/logout'),
      imports = require('./routes/import'),
      logs = require('./routes/logs'),
      winners = require('./routes/winners'),
      products = require('./routes/products');

app.use('/login', login)
   .use('/logout', logout)
   .use('/import', imports)
   .use('/logs', logs)
   .use('/winners', winners)
   .use('/products', products);

// Knex config
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

// Using custom ssl certificates in order to serve localhost over https
// I've done this because when I try to access localhost:3000 in Chrome,
  // it automically tries to serve localhost:3000 over https but it cannot without
  // these certificates
const certOptions = {
  key: fs.readFileSync(path.resolve('./server.key')),
  cert: fs.readFileSync(path.resolve('./server.crt'))
};

https.createServer(certOptions, app).listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

// We can switch back to this implementation prior to production
// app.listen(3000, () => {
//   console.log('Example app listening on port 3000!');
// });
