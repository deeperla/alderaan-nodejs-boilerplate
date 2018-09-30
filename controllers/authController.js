const passport = require('passport');

exports.login = passport.authenticate('local', {
  failureRedirect: '/user/login',
  failureFlash: 'Failed Login!',
  successRedirect: '/user/dashboard',
  successFlash: 'You are now logged in!',
});

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'You are now logged out!');
  res.redirect('/');
};

exports.isLoggedIn = (req, res, next) => {
  // first check if the user is authenticated
  if (req.isAuthenticated()) {
    next();
    return;
  }
  req.flash('error', 'Oops you must be logged in to do that!');
  res.redirect('login');
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
    return;
  }
  res.redirect('/user/dashboard');
};


exports.facebookLogin = passport.authenticate('facebook');

exports.facebookReturn = passport.authenticate('facebook', { failureRedirect: '/login' });

exports.facebookRedirect = (req, res) => {
  res.redirect('/');
};
