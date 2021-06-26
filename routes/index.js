const express =  require('express');
const homeController = require('../controllers/index');
const asyncHandler = require('express-async-handler');
const router = express.Router();

// Home
router.get('/', homeController.HOME);
// Events
router.get('/events', homeController.EVENTS);
// About us
router.get('/about-us', homeController.ABOUT_US);
// contact
router.get('/contact', homeController.CONTACT);

module.exports = router;
