const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const User = require('../model/users');
module.exports = {
  HOME: asyncHandler(async (req, res) => {
    res.render('admin/dashboard');
  }),
  GET_LOGIN: asyncHandler(async (req, res) => {
    res.render('admin/auth');
  }),
  LOGIN: asyncHandler(async (req, res) => {
    const { username, password} = req.body;
    const found = await User.findByEmail(username);
    if(!found) return res.status(400).json({ emailError: 'Username does not exist' });
    const isMatch = await bcrypt.compareSync(password, found.password);
    if(!isMatch) return res.status(400).json({ passwordError: 'Incorrect password' });
    if(found.roleID !== 1) return res.status(400).json({ emailError: 'This is not an admin account' });
    const info = await User.info(found._userID);
    req.session.userID = found._userID;
    res.redirect('/admin/dashboard');
  }),
};
