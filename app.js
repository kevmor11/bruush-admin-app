const express = require('express'),
      app = express(),
      compression = require('compression'),
      path = require('path'),
      bodyParser = require('body-parser'),
      https = require('https'),
      fs = require('fs'),
      cookieSession = require("cookie-session"),
      // passport = require('passport'),
      // LocalStrategy = require('passport-local').Strategy,
      CronUtil = require('./util/CronUtil'),
      isLoggedIn = require('./util/isLoggedIn');

// Setting view engine and middleware
app.set('views', path.join(__dirname, 'view'))
   .set('view engine', 'ejs')
   .use(compression())
   .use(bodyParser.json())
   .use(bodyParser.urlencoded({ extended: false }))
   .use(express.static(path.join(__dirname, './public')))
  //  .use(passport.initialize())
  //  .use(passport.session())
   .use(cookieSession({
      name: 'session',
      keys: ['user_id'],
      // Cookie Options (session cookies expire after 24 hours)
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }));

// Routes
const login = require('./routes/login'),
      logout = require('./routes/logout'),
      dashboard = require('./routes/dashboard'),
      imports = require('./routes/import'),
      logs = require('./routes/logs'),
      winners = require('./routes/winners'),
      winnersByLog = require('./routes/winners-by-log'),
      products = require('./routes/products'),
      mailer = require('./routes/send-mail');

app.use('/login', login)
   .use('/logout', logout)
   .use('/dashboard', dashboard)
   .use('/import_csv', imports)
   .use('/logs', logs)
   .use('/winners', winners)
   .use('/winners_by_log', winnersByLog)
   .use('/products', products)
   .use('/send_mail', mailer);

// passport.use(new Strategy(
//   (username, password, cb) => {
//     db.users.findByUsername(username, function(err, user) {
//       if (err) { return cb(err); }
//       if (!user) { return cb(null, false); }
//       if (user.password != password) { return cb(null, false); }
//       return cb(null, user);
//     });
//   }));

CronUtil();

app.get('/', isLoggedIn);
// app.get('/', (req, res) => {
//   res.redirect('/dashboard');
// });

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

app.listen(process.env.PORT, () => {
  console.log('Example app listening on port 3000!');
});
