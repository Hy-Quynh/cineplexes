const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const cloudinary = require('cloudinary');
const sendEmail = require('./send-mail')
const JWT = require('jsonwebtoken');
const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const { signRefreshToken, signAccessToken, verilyRefreshToken } = require('../helpers/jwt_helpers');

const {
  MAILING_SERVICE_CLIENT_ID,
  GOOGLE_SECRET,
  CLIENT_URL,
  CLOUD_NAME,
  ACTIVATION_TOKEN_SECRET,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET

} = process.env;

const client = new OAuth2(MAILING_SERVICE_CLIENT_ID);
const User = require('../model/users');

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

module.exports = {
  LOGIN: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const found = await User.findByEmail(email);
    if(!found) return res.status(400).json({ message: 'Email không tồn tại' });
    const isMatch = await bcrypt.compareSync(password, found.password);
    if(!isMatch) return res.status(400).json({ message: 'Mật khẩu không đúng'});
    // req.session.userID = found._userID;
    const accessToken = await signAccessToken(found._userID);
    const refreshToken = await signRefreshToken(found);
    const userResult = await User.findByID(found._userID);
    res.send({
      status: 'success',
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: userResult
    });
  }),
  REGISTER: asyncHandler(async (req, res) => {
    const { name, email, phoneNumber, password, repassword } = req.body;
    const doseExists = await User.findByEmail(email);
    if(doseExists) return res.status(400).json({ message: 'Email này đã tồn tại' })
    if(!password) return res.stauts(400).json({ message: 'Vui lòng điền mật khẩu' });
    if(password !== repassword) return res.status(400).json({ message: 'Mật khẩu và mật khẩu nhập lại không khớp' });
    const hash = bcrypt.hashSync(password, 10);
    const url = `${CLIENT_URL}api/user/active-email/${accessToken}`;
    sendEmail(email, url, "Click xác nhận địa chỉ email của bạn");
  }),
  ACTIVE_EMAIL: asyncHandler(async (req, res) => {
    const { accessToken } = req.body;
    const user = JWT.verify(accessToken, ACTIVATION_TOKEN_SECRET);
    const { name, email, phoneNumber, password} = user;
    const checkEmail = await User.findByEmail(email);
    if (checkEmail) return res.status(400).json({ message: 'Tài khoản này tồn tại' });
    const result = await User.add(name, email, phoneNumber, password);
    const token = await signAccessToken(result._userID);
    res.status(200).json({
      user: result,
      token
    })
  }),
  PROFILE: asyncHandler(async (req, res) => {
    // const id = req.data._userID;
    const user = await User.findByID(1);
    res.status(200).json({
      status: 'success',
      user: user
    });
  }),
  CHANGE_PASSWORD: asyncHandler(async (req, res) => {
    const { _userID } = req.data;
    const { password } = req.body;
    const result = await User.findByID(_userID);
    if (result) {
      const passwordHash = await bcrypt.hashSync(password, 10);
      await User.findOneAndUpdate(_userID, passwordHash);
      res.status(200).json({
          message: 'Password has been changed successfully'
        })
    };
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
  FORGOT_PASSWORD: async (req, res) => {
    const { email } = req.body
    const user = await User.findByEmail(email.toLowerCase().trim());
    if (!user) return res.status(400).json({ message: "Email không tồn tại" });
    const access_token = createAccessToken({ email: email });
    const url = `${CLIENT_URL}/user/reset-password/${access_token}`
    sendEmail(email, url, "Click Tạo Mật khẩu mới");
    res.json({ message: "Tạo mật khẩu mới, Vui lòng kiểm tra email." })
  },
  RESET_PASSWORD: async (req, res) => {
    const { password, accessToken } = req.body;
    const result = JWT.verify(accessToken, ACTIVATION_TOKEN_SECRET);
    const user = await User.findByEmail(result.email);
    if (!password) return res.status(400).json({ msg: "Vui lòng nhập mật khẩu" });
    if (!user) return res.status(400).json({ msg: "Tài khoản này không tồn tại" });
    const passwordHash = await bcrypt.hashSync(password, 10);
    await User.findOneAndUpdate(result._userID, passwordHash);
    const token = await signAccessToken(user._userID);
    res.status(200).json({
      user: user,
      token
    })
  }
};
const createAccessToken = (payload) => {
  return JWT.sign(payload, ACTIVATION_TOKEN_SECRET, { expiresIn: '15m' })
};
const createActivationToken = (payload) => {
  return JWT.sign(payload, ACTIVATION_TOKEN_SECRET, { expiresIn: '5m' })
};
