const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const cloudinary = require('cloudinary');
const SendEmail = require('./send-mail')
const JWT = require('jsonwebtoken');
const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const { signRefreshToken, signAccessToken, verilyRefreshToken } = require('../helpers/jwt_helpers');

const {
  MAILING_SERVICE_CLIENT_ID,
  GOOGLE_SECRET,
  CLIENT_URL,
  CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET
} = process.env;

const ACTIVATION_TOKEN_SECRET = '4cdc0a9270656190949496915ee533585d0971ab2a9648b76f82a373f59f152b27b588fc5087dc75d602b6f7797c663ec6656f82c884c5521f19ba3e7a7fc91d';

const client = new OAuth2(MAILING_SERVICE_CLIENT_ID);
const User = require('../model/users');

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

module.exports = {
  GET_SIGNIN: asyncHandler(async (req, res) => {
    res.render('user/sign-in');
  }),
  SIGNIN: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const found = await User.findByEmail(email);
    if(!found) return res.status(400).json({ emailError: 'Email does not exist' });
    const isMatch = await bcrypt.compareSync(password, found.password);
    if(!isMatch) return res.status(400).json({ passwordError: 'Incorrect password' });
    req.session.userID = found._userID;
    res.send({status: 'success'});
  }),
  GET_SIGNUP: asyncHandler(async (req, res) => {
    res.render('user/sign-up');
  }),
  SIGNUP: asyncHandler(async (req, res) => {
    const { name, email, phoneNumber, password } = req.body;
    const doseExists = await User.findByEmail(email);
    if(doseExists) return res.status(400).json({ emailError: 'Email already exists' });
    const hash = bcrypt.hashSync(password, 10);
    const newUser = { name, email, phoneNumber, password: hash };
    const host = req.protocol + '://' + req.get('host');
    const accessToken = createActivationToken(newUser);
    const url = `${host}/user/active-email/${accessToken}`;
    SendEmail.SEND_MAIL(email, url, "Click confirm your email address");
    res.send({ status:'Successful, check email to verify!' });
  }),
  GET_LOGIN_ADMIN: asyncHandler(async (req, res) => {
    res.render('admin/auth');
  }),
  LOGIN_ADMIN: asyncHandler(async (req, res) => {
    const { username, password} = req.body;
    const found = await User.findByEmail(username);
    if(!found) return res.status(400).json({ usernameError: 'Username does not exist' });
    const isMatch = await bcrypt.compareSync(password, found.password);
    if(!isMatch) return res.status(400).json({ passwordError: 'Incorrect password' });
    if(found.roleID != 1) return res.status(400).json({ roleError: 'This is not an admin account' });
    // const info = await User.info(found._userID);
    req.session.userID = found._userID;
    res.status(200).json({ status: 'success' });
  }),
  ACTIVE_EMAIL: asyncHandler(async (req, res) => {
    const { accessToken } = req.params;
    const user = JWT.verify(accessToken, ACTIVATION_TOKEN_SECRET);
    const { name, email, phoneNumber, password } = user;
    const result = await User.add(name, email, phoneNumber, password);
    res.redirect('/user/sign-in');
  }),
  PROFILE: asyncHandler(async (req, res) => {
    const { userID } = req.session;
    const skip = 1;
    const limit = 10;
    const item = await User.totalItemTicketOfUser(userID);
    const totalPages = Math.floor(item.total / limit) + ((Math.floor(item.total / limit) == 0) ? 0 : 1);
    const historyTicket = await User.historyTicketOfUser(userID, skip, limit);
    res.render('user/profile', { historyTicket, totalPages, limit});
  }),
  EDIT_PROFILE: asyncHandler(async (req, res) => {
    const { userID } = req.session;
    const { information, need_editing } = req.body;
    if(need_editing == 'name'){
      const edited = await User.edit_name(userID, information);
      if(edited[0].fullName) return res.status(200).json({ status: 'success', edited_information: edited[0].fullName });
    }
    else if(need_editing == 'email'){
      const edited = await User.edit_email(userID, information);
      if(edited[0].email) return res.status(200).json({ status: 'success', edited_information: edited[0].email });
    }
    else if(need_editing == 'phonenumber'){
      const edited = await User.edit_phoneNumber(userID, information);
      if(edited[0].phoneNumber) return res.status(200).json({ status: 'success', edited_information: edited[0].phoneNumber });
    }
    res.status(400).json({ status: 'failed' });
  }),
  PAGING_BOOK_TICKET_PROFILE: asyncHandler(async (req, res) => {
    const { userID } = req.session;
    const { page, limit } = req.query;
    const item = await User.totalItemTicketOfUser(userID);
    const totalPages = Math.floor(item.total / limit) + ((Math.floor(item.total / limit) == 0) ? 0 : 1);
    const skip = ((page - 1) * limit) < 0 ? 0 : (page - 1) * limit;
    console.log(skip);
    const historyTicket = await User.historyTicketOfUser(userID, skip, limit);
    res.render('user/profile', { historyTicket, totalPages, limit});
  }),
  CHANGE_PASSWORD: asyncHandler(async (req, res) => {
    const { userID } = req.session;
    const { password } = req.body;
    const result = await User.findByID(userID);
    if (!result) res.status(400).json({ message: 'User does not exist.' });
    const isMatch = await bcrypt.compareSync(password, result.password);
    if(!isMatch) return res.status(400).json({ message: 'Password is incorrect, please try again.' });
    res.status(200).json({ status: 'success' });
  }),
  REFRESH_TOKEN: async (req, res) => {
    const refreshToken = req.body;
    if (!refreshToken) throw createError.BadRequest();
    const id = await verilyRefreshToken(refreshToken);
    const accessToken = await signAccessToken(id);
    const refToken = await signRefreshToken(id);
    res.send({
      accessToken: accessToken,
      refreshToken: refToken
    })
  },
  GET_FORGOT_PASSWORD: async (req, res) => {
    res.render('user/forgot-password');
  },
  FORGOT_PASSWORD: async (req, res) => {
    const { email } = req.body
    const user = await User.findByEmail(email.toLowerCase().trim());
    if (!user) return res.status(400).json({ message: "Email does not exist" });
    const access_token = createAccessToken({ email: email });
    const CLIENT_URL = req.protocol + '://' + req.get('host');
    const url = `${CLIENT_URL}/user/reset-password/${access_token}`
    SendEmail.FORGOT_PASSWORD_SEND_MAIL(email, url, user.fullName);
    res.render('user/forgot-password',{
      status: 'Confirm',
      email
    });
  },
  GET_RESET_PASSWORD: async (req, res) => {
    const { access_token } = req.params;
    res.render('user/forgot-password',{
      status:'Reset',
      access_token
    });
  },
  RESET_PASSWORD: async (req, res) => {
    const { password, repassword, accessToken } = req.body;
    if (!password) return res.status(400).json({ msg: "Please enter the password" });
    if (password !== repassword) return res.status(400).json({ msg: "Password and re-entered password do not match" });
    const result = JWT.verify(accessToken, ACTIVATION_TOKEN_SECRET);
    const user = await User.findByEmail(result.email);
    if (!user) return res.status(400).json({ msg: "Email does not exist" });
    const passwordHash = await bcrypt.hashSync(password, 10);
    await User.findOneAndUpdate(user._userID, passwordHash);
    res.render('user/forgot-password',{
      status:'Successful',
      message: 'Successful, you can login!'
    });
  },
  SIGN_OUT: async (req, res) => {
    const { userID } = req.session;
    delete req.session.userID;
    res.redirect('/');
  }
};
const createAccessToken = (payload) => {
  return JWT.sign(payload, ACTIVATION_TOKEN_SECRET, { expiresIn: '15m' })
};
const createActivationToken = (payload) => {
  return JWT.sign(payload, ACTIVATION_TOKEN_SECRET, { expiresIn: '5m' })
};
