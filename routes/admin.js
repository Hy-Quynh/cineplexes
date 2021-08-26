const express =  require('express');
const Logged = require('../middlewares/ensure-logged-in');
const adminController = require('../controllers/admin');
const multer  = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

// loggged
router.use(Logged.ensureLoggedInAdmin);

/**
 *Home
 */
router.get('/list-cinemas', adminController.GET_LIST_CINAMAS);
router.get('/admin-dashboard', adminController.ADMIN_HOME);
 /**
  * Cineplexes
  */
router.get('/list-cineplexes', adminController.GET_LIST_CINEPLEXES);
router.get('/add-new-cineplex', adminController.GET_ADD_CINEPLEX);
router.post('/add-new-cineplex', adminController.ADD_NEW_CINEPLEX);
router.post('/delete-cinema', adminController.DELETE_CINEMA);

/** 
 * Movie
 */

router.get('/list-movies', adminController.GET_LIST_MOVIES);
router.get('/add-new-movie', adminController.GET_ADD_MOVIE);
router.post('/add-new-movie', upload.single('picture'), adminController.ADD_NEW_MOVIE);

module.exports = router;

