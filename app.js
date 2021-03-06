const express = require('express'),
      app = express(),
      compression = require('compression'),
      path = require('path'),
      bodyParser = require('body-parser'),
      cookieSession = require("cookie-session"),
      cookieParser = require("cookie-parser"),
      CronUtil = require('./util/CronUtil'),
      isLoggedIn = require('./util/isLoggedIn');

// Setting view engine and middleware
app.set('views', path.join(__dirname, 'view'))
   .set('view engine', 'ejs')
   .use(compression())
   .use(bodyParser.json())
   .use(bodyParser.urlencoded({ extended: false }))
   .use(express.static(path.join(__dirname, './public')))
   .use(cookieParser())
   .use(cookieSession({
      name: 'session',
      keys: ['user_id'],
      // Cookie Options (session cookies expire after 24 hours)
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
   }))

// Routes
const login = require('./routes/login'),
      logout = require('./routes/logout'),
      dashboard = require('./routes/dashboard'),
      imports = require('./routes/import'),
      logs = require('./routes/logs'),
      winners = require('./routes/winners'),
      winnersByLog = require('./routes/winners-by-log'),
      products = require('./routes/products'),
      unsubscribe = require('./routes/unsubscribe'),
      mailer = require('./routes/send-mail');

app.use('/login', login)
   .use('/logout', logout)
   .use('/dashboard', dashboard)
   .use('/import_csv', imports)
   .use('/logs', logs)
   .use('/winners', winners)
   .use('/winners_by_log', winnersByLog)
   .use('/products', products)
   .use('/unsubscribe', unsubscribe)
   .use('/send_mail', mailer);

CronUtil();

app.get('/', isLoggedIn, (req, res) => {
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

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});
