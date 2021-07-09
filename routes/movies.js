const express =  require('express');
const moviesController = require('../controllers/movies');
const router = express.Router();

router.get('/', moviesController.GET_MOVIES);
// Now showing
router.get('/now-showing', moviesController.GET_NOW_SHOWING);
// Comming soon
router.get('/coming-soon', moviesController.GET_COMING_SOON);
// Most view
router.get('/most-view', moviesController.GET_MOST_VIEW);
//Detail movie
router.get('/detail-movie/:movieID', moviesController.DETAIL_MOVIE);
//Search for movie
router.post('/search-cineplexes', moviesController.SEARCH_FOR_SHOWTIMES_BY_CINEPLEX);
router.post('/search-cinemas', moviesController.SEARCH_FOR_SHOWTIMES_BY_CINEMA);
module.exports = router;
