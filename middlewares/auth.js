const User = require('../model/users');
const asyncHandler = require('express-async-handler')

module.exports = asyncHandler(async function auth(req, res, next) {
  const { userID } = req.session;
  res.locals.currentUser = null;
  if(userID){
      const user = await User.findByID(userID)
      if(user){
        if(user.roleID == 2){
          req.currentUser = user;
          res.locals.currentUser = user;
        }
        else if(user.roleID == 1){
          req.admin = user;
          res.locals.admin = user;
        }
      }
      next();
  }
  else{
    next();
  }
});
