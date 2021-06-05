const express =  require('express');
const usersController = require('../controllers/users');
const router = express.Router();

router.post('/login', usersController.LOGIN);
router.post('/register', usersController.REGISTER);
router.post('/active-email', usersController.ACTIVE_EMAIL);
router.get('/profile', usersController.PROFILE);
module.exports = router;
