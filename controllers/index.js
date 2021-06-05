const asyncHandler = require('express-async-handler');
const Cineplex = require('../model/cineplexes');
const Showtime = require('../model/showtime');
const Movies = require('../model/movies');
const Booking = require('../model/booking');
const Cinemas = require('../model/cinemas');
const Users = require('../model/users');

module.exports = {
    HOME: asyncHandler(async (req, res) => {
      const getAllUpcomingMovies = await Movies.findAllUpcomingMovies();
      const getAllMostWatchedMovies = await Booking.findAllMostWatchedMovies();
      res.status(200).json({
        status: 'success',
        newMovies: getAllUpcomingMovies,
        mostWatchedMovies: getAllMostWatchedMovies
      });
        // res.render('home', {
        //   messenge: 'success',
        //   newMovies: getAllUpcomingMovies,
        //   mostWatchedMovies: getAllMostWatchedMovies
        // });
    })
    // showtime: asyncHandler(async (req, res) => {
    //   const findAll = await Showtime.getAll();
    //   res.status(200).json(findAll);
    // }),
    // mostWatchedMovies: asyncHandler(async (req, res) => {
    //   const findAll = await Booking.findAllMostWatchedMovies();
    //   res.status(200).json(findAll);
    // }),
    // getAllMovies: asyncHandler(async (req, res) => {
    //   const findAll = await Movies.getAll();
    //   res.status(200).json(findAll);
    // }),
    // findAllNewMovies: asyncHandler(async (req, res) => {
    //   const findAll = await Movies.findAllNewMovies();
    //   res.status(200).json(findAll);
    // }),
    // findAllcinema: asyncHandler(async (req, res) => {
    //   const findAll = await Cinemas.findAllCinemaOfCineplex(1);
    //   res.status(200).json(findAll);
    // }),
};
