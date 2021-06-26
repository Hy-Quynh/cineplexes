const express =  require('express');
const adminController = require('../controllers/admin');
const asyncHandler = require('express-async-handler');
const router = express.Router();

// Home
router.get('/dashboard', adminController.HOME);
//auth
router.get('/auth', adminController.GET_LOGIN);
router.post('/auth', adminController.LOGIN);

module.exports = router;
