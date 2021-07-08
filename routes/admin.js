const express =  require('express');
const Logged = require('../middlewares/ensure-logged-in');
const adminController = require('../controllers/admin');
const asyncHandler = require('express-async-handler');
const multer  = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

// loggged
router.use(Logged.ensureLoggedInAdmin);

// Home
router.get('/dashboard', adminController.HOME);
router.post('/cineplexes-revenue', adminController.CINEPLEXES_REVENUE);
router.post('/movies-revenue', adminController.MOVIES_REVENUE);
// Cineplexes
router.get('/cineplexes-list', adminController.GET_CINEPLEXES_LIST);
router.get('/add-cineplex', adminController.GET_ADD_CINEPLEX);
router.post('/add-cineplex', adminController.ADD_NEW_CINEPLEX);
router.post('/delete-cineplex', adminController.DELETE_CINEPLEX);
// cinemas
router.get('/cinemas-list', adminController.GET_CINEMAS_LIST);
router.get('/add-cinema', adminController.GET_ADD_CINEMA);
router.post('/add-cinema', adminController.ADD_NEW_CINEMA);
router.post('/delete-cinema', adminController.DELETE_CINEMA);
// Movies
router.get('/movies-list', adminController.GET_MOVIES_LIST);
router.get('/add-movie', adminController.GET_ADD_MOVIE);
router.post('/add-movie', upload.single('picture'), adminController.ADD_NEW_MOVIE);
router.post('/delete-movie', adminController.DELETE_MOVIE);
// Showtimes
router.get('/showtimes-list', adminController.GET_SHOWTIMES_LIST);
router.get('/add-showtime', adminController.GET_ADD_SHOWTIME);
router.post('/add-showtime', adminController.ADD_NEW_SHOWTIME);
router.post('/delete-showtime', adminController.DELETE_SHOWTIME);
router.get('/cinema-by-cineplex', adminController.GET_CINEMA_BY_CINEPLEX);
// Logout
router.get('/logout', adminController.LOGOUT);
module.exports = router;
