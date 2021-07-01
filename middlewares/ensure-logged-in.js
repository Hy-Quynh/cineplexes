module.exports = {
  ensureLoggedIn: (req, res, next) => {
    if(!req.currentUser){
      res.redirect('/user/sign-in');
    }
    else{
      next();
    }
  },
  ensureLoggedInAdmin: (req, res, next) => {
    if(!req.admin) {
      res.redirect('user/admin/auth');
    }
    else{
      next();
    }
  }
};
