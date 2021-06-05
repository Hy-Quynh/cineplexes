const express =  require('express');
const homeController = require('../controllers/index');
const picture = require('../middlewares/picture');
const router = express.Router();

router.use('/movies/picture/:_movieID', picture);

router.get('/', homeController.HOME);


// router.get('/movies/picture/:_movieID', homeController.picture);
// router.get('/showtime', homeController.showtime);
// router.get('/most-watched-movies', homeController.mostWatchedMovies);
// router.get('/find-all-movies', homeController.getAllMovies);
// router.get('/find-all-new-moives', homeController.findAllNewMovies);
// router.get('/find-all-cinema-of-cineplex', homeController.findAllcinema);

module.exports = router;
