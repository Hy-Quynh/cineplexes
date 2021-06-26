const asyncHandler = require('express-async-handler');
const Cineplex = require('../model/cineplexes');
const Movies = require('../model/movies');
const Booking = require('../model/booking');

module.exports = {
  HOME: asyncHandler(async (req, res) => {
    const getAllCineplex = await Cineplex.getAll();
    const getAllNowShowingMovies = await Movies.findAllNowShowingMovies();
    const getAllComingSoonMovies = await Movies.findAllComingSoonMovies();
    const getAllMostViewMovies = await Booking.findAllMostViewMovies();
    res.render('home', {
      cineplexes: getAllCineplex,
      nowShowing: getAllNowShowingMovies,
      comingMovies: getAllComingSoonMovies,
      mostViewMovies: getAllMostViewMovies
    });
  }),
  EVENTS: asyncHandler(async (req, res) => {
    res.render('menu/events');
  }),
  ABOUT_US: asyncHandler(async (req, res) => {
    res.render('menu/about-us');
  }),
  CONTACT: asyncHandler(async (req, res) => {
    res.render('menu/contact');
  })
};
