module.exports = (req, res, next) => {
  // if (req.user) {
  if (req.session.user_id) {
      console.log("NEXT");
      next();
  } else {
    res.redirect('login');
  }
}