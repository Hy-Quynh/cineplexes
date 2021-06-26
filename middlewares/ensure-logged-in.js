module.exports = function ensureLoggedIn(req, res, next) {
  if(!req.currentUser){
      res.redirect('/user/sign-in');
  } else {
    next();
  }
};
