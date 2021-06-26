const express =  require('express');
const usersController = require('../controllers/users');
const router = express.Router();

// Sign in
router.get('/sign-in', usersController.GET_SIGNIN);
router.post('/sign-in', usersController.SIGNIN);
// Sign up
router.get('/sign-up', usersController.GET_SIGNUP);
router.post('/sign-up', usersController.SIGNUP);
// verify email
router.get('/active-email/:accessToken', usersController.ACTIVE_EMAIL);
// Forgot password
router.get('/forgot-password', usersController.GET_FORGOT_PASSWORD);
router.post('/forgot-password', usersController.FORGOT_PASSWORD);
router.get('/reset-password/:access_token', usersController.GET_RESET_PASSWORD);
router.post('/reset-password', usersController.RESET_PASSWORD);
// Profile
router.get('/profile', usersController.PROFILE);
// sIGN OUT
router.get('/sign-out', usersController.SIGN_OUT);
module.exports = router;
