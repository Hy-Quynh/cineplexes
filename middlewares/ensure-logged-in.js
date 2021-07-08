module.exports = {
  ensureLoggedIn: (req, res, next) => {
    const { userID } = req.session;
    if(!req.currentUser){
      res.redirect('/user/sign-in');
      // if(req.admin){
      //
      //   delete req.session.userID;
      //   next();
      // }
      // else{
      //   res.redirect('/user/sign-in');
      // }
    }
    else{
      next();
    }
  },
  ensureLoggedInAdmin: (req, res, next) => {
    const { userID } = req.session;
    if(!req.admin) {
      res.redirect('user/admin/auth');
      // if(req.currentUser){
      //   delete req.session.userID;
      //   next();
      // }
      // else{
      // }
    }
    else{
      next();
    }
  }
};
