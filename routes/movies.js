const express =  require('express');
const moviesController = require('../controllers/movies');
const picture = require('../middlewares/picture');
const router = express.Router();

router.use('/movies/picture/:_movieID', picture);
router.get('/', moviesController.GET_MOVIES);
router.get('/detail-movie', moviesController.DETAIL_MOVIE);
module.exports = router;
