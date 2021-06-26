const User = require('../model/users');
const asyncHandler = require('express-async-handler')

module.exports = asyncHandler(async function auth(req, res, next) {
  const { userID } = req.session;
  res.locals.currentUser = null;
  if(userID){
      const user = await User.findByID(userID)
      if(user){
        req.currentUser = user;
        res.locals.currentUser = user;
      }
      next();
  }
  else{
    next();
  }
});
