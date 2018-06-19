const express = require('express'),
      app = express(),
      { Model } = require('objection'),
      Knex = require('knex'),
      compression = require('compression'),
      path = require('path'),
      bodyParser = require('body-parser'),
      https = require('https'),
      fs = require('fs'),
      passport = require('passport'),
      cron = require('node-cron'),
      knexFile = require('./knexfile'),
      knex = require('knex')(knexFile),
      LocalStrategy = require('passport-local').Strategy,
      connection = require('./db/connection'),
      sendMail = require('./util/MailUtil'),
      isLoggedIn = require('./util/isLoggedIn');

// Knex config
const knexConfig = Knex({
  client: 'mysql',
  useNullAsDefault: true,
  connection: {
    filename: './knexfile'
  }
});

Model.knex(knexConfig);

// Setting view engine and middleware
app.set('views', path.join(__dirname, 'view'))
   .set('view engine', 'ejs')
   .use(compression())
   .use(bodyParser.json())
   .use(bodyParser.urlencoded({ extended: false }))
   .use(express.static(path.join(__dirname, './public')))
   .use(passport.initialize())
   .use(passport.session());

// Routes
const login = require('./routes/login'),
      logout = require('./routes/logout'),
      dashboard = require('./routes/dashboard'),
      imports = require('./routes/import'),
      logs = require('./routes/logs'),
      winners = require('./routes/winners'),
      winnersByLog = require('./routes/winners-by-log'),
      products = require('./routes/products'),
      mailer = require('./routes/send-mail'),
      editProduct = require('./routes/edit-product');

app.use('/login', login)
   .use('/logout', logout)
   .use('/dashboard', dashboard)
   .use('/import_csv', imports)
   .use('/logs', logs)
   .use('/winners', winners)
   .use('/winners_by_log', winnersByLog)
   .use('/products', products)
   .use('/send_mail', mailer)
   .use('/edit_product', editProduct);

// passport.use(new Strategy(
//   (username, password, cb) => {
//     db.users.findByUsername(username, function(err, user) {
//       if (err) { return cb(err); }
//       if (!user) { return cb(null, false); }
//       if (user.password != password) { return cb(null, false); }
//       return cb(null, user);
//     });
//   }));

cron.schedule('0 8 * * *', () => {
// cron.schedule('* * * * *', () => {
  knex('customer')
    .select('id','email','discount_code')
    .where({ email_to_be_sent: 1 })
    .then(customers => {
      customers.forEach((customer) => {
        // TODO customize emails
        var sentSuccessfully = sendMail(customer.email, 'Hello', '<h1>Hello, World</h1>');
        var isSent = new Promise(resolve => {
          resolve(sentSuccessfully);
        });
        isSent.then(() => {
          knex('customer')
            .where({ id: customer.id })
            .update({
              email_has_been_sent: 1,
              email_to_be_sent: 0,
              email_sent_date: new Date()
            })
            .then(() => {
              console.log("Missed emails were resent.");
            })
        })
      })
    })
});

// app.get('/', isLoggedIn);
app.get('/', (req, res) => {
  res.redirect('/dashboard');
});

// catch 404 and give response
app.use((req, res) => {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('error', { url: req.url });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Page Not found');
});

// Using custom ssl certificates in order to serve localhost over https
// I've done this because when I try to access localhost:3000 in Chrome,
  // it automically tries to serve localhost:3000 over https but it cannot without
  // these certificates
// const certOptions = {
//   key: fs.readFileSync(path.resolve('./server.key')),
//   cert: fs.readFileSync(path.resolve('./server.crt'))
// };

// https.createServer(certOptions, app).listen(process.env.PORT, () => {
//   console.log('Example app listening on port 3000!');
// });

// We can switch back to this implementation prior to production
app.listen(process.env.PORT, () => {
  console.log('Example app listening on port 3000!');
});
