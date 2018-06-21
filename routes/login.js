const LoginController = require('../controller/LoginController'),
      isLoggedIn = require('../util/isLoggedIn'),
      passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      UserRepository = require('../db/repository/UserRepository'),
      router = require('express').Router();

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     UserRepository.getUserByUsername(username, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }
// ));

// Get all discount codes
router.get('/', LoginController.getLogin)

// Create a discount code
.post('/', LoginController.postLogin)

// .post('/',
//   passport.authenticate('local', { successRedirect: '/',
//                                    failureRedirect: '/login',
//                                    failureFlash: true })
// );

module.exports = router;
