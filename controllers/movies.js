const asyncHandler = require('express-async-handler');
const Movies = require('../model/movies');
const Booking = require('../model/booking');
const Cineplex = require('../model/cineplexes');
const Showtime = require('../model/showtime');

module.exports = {
  GET_MOVIES: asyncHandler(async (req, res) => {
    const findAll = await Movies.getAll();
    res.status(200).json({
      status: 'success',
      movies: findAll
    });
  }),
  GET_NOW_SHOWING: asyncHandler(async (req, res) => {
    const getAllNowShowingMovies = await Movies.findAllNowShowingMovies();
    const getAllCineplex = await Cineplex.getAll();
    res.render('movies/movies-list', {
      status: 'Now Showing',
      cineplexes: getAllCineplex,
      nowShowing: getAllNowShowingMovies
     })
  }),
  GET_COMING_SOON: asyncHandler(async (req, res) => {
    const getAllComingSoonMovies = await Movies.findAllComingSoonMovies();
    const getAllCineplex = await Cineplex.getAll();
    res.render('movies/movies-list', {
      status: 'Coming soon',
      cineplexes: getAllCineplex,
      comingSoonMovies: getAllComingSoonMovies
    })
  }),
  GET_MOST_VIEW: asyncHandler(async (req, res) => {
    const getAllMostViewMovies = await Booking.findAllMostViewMovies();
    const getAllCineplex = await Cineplex.getAll();
    res.render('movies/movies-list', {
      status: 'Most view',
      cineplexes: getAllCineplex,
      mostViewMovies: getAllMostViewMovies
    })
  }),
  DETAIL_MOVIE: asyncHandler(async (req, res) => {
    const { movieID } = req.params;
    const detailMovie = await Movies.detailMovie(movieID);
    const cinemaName = await Showtime.findAllCinemaNameMovie(movieID);
    const cineplex = await Cineplex.findAllCineplexOfShowtime(movieID);
    res.render('movies/detail-movie', {
      detailMovie,
      cinemaName,
      cineplex
    });
  }),
  SEARCH_FOR_SHOWTIMES_BY_CINEPLEX: asyncHandler(async (req, res) =>{
    const { keyword, cineplexSelect } = req.body;
    const movie_list = await Showtime.searchForShowtimeCineplex(keyword, cineplexSelect);
    const getAllCineplex = await Cineplex.getAll();
    res.render('movies/search', {
      status: 'Cineplex',
      cineplexes: getAllCineplex,
      showtimeSearched: movie_list
    });
  }),
  SEARCH_FOR_SHOWTIMES_BY_CINEMA: asyncHandler(async (req, res) =>{
    const { keyword } = req.body;
    const movie_list = await Showtime.searchForShowtimeCinema(keyword);
    const getAllCineplex = await Cineplex.getAll();
    res.render('movies/search', {
      status: 'Cinema',
      cineplexes: getAllCineplex,
      showtimeSearched: movie_list
    });
  })
};
