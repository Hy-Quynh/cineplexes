const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const User = require('../model/users');
const Booking = require('../model/booking');
const Cinemas = require('../model/cinemas');
const Cineplexes = require('../model/cineplexes');
const Movies = require('../model/movies');
const Showtimes = require('../model/showtime');

module.exports = {
  HOME: asyncHandler(async (req, res) => {
    res.render('admin/dashboard');
  }),
  CINEPLEXES_REVENUE: asyncHandler(async (req, res) => {
    const { start, end } = req.body;
    const from = new Date(start);
    const to  = new Date(end);
    if(to < from) return res.status(400).json({ status: 'error', message: 'The end date must be greater than the start date.' });
    const revenue = await Cineplexes.cineplexesRevenue(start, end);
    if(!revenue || revenue.length == 0) return res.status(400).json({ status: 'empty', message: 'No data currently available.' });
    res.status(200).json({
      status: 'success',
      cineplexes_revenue: revenue
    })
  }),
  MOVIES_REVENUE: asyncHandler(async (req, res) => {
    const { start, end } = req.body;
    const from = new Date(start);
    const to  = new Date(end);
    if(to < from) return res.status(400).json({ status: 'error', message: 'The end date must be greater than the start date.' });
    const revenue = await Movies.moviesRevenue(start, end);
    if(!revenue || revenue.length == 0) return res.status(400).json({ status: 'empty', message: 'No data currently available.' });
    res.status(200).json({
      status: 'success',
      movies_revenue: revenue
    })
  }),
  GET_CINEPLEXES_LIST: asyncHandler(async (req, res) => {
    const cineplexes = await Cineplexes.getAll();
    res.render('admin/pages/cinema-complexes/cineplexes-list',{
      cineplexes_list: cineplexes
    });
  }),
  GET_ADD_CINEPLEX: asyncHandler(async (req, res) => {
    res.render('admin/pages/cinema-complexes/add-cineplex');
  }),
  ADD_NEW_CINEPLEX: asyncHandler(async (req, res) => {
    const { name_cineplex, address } = req.body;
    const new_cineplex = {
      name_cineplex: name_cineplex,
      address: address
    };
    const added_cineplex = await Cineplexes.addNewCineplex(new_cineplex);
    if(!added_cineplex[0]) return res.status(400).json({ message: 'Add failed!'});
    res.status(200).json({ status: 'success' });
  }),
  DELETE_CINEPLEX: asyncHandler(async (req, res) => {
    const { cineplexId } = req.body;
    const hidden = await Cineplexes.hiddenCineplex(cineplexId);
    if(hidden[0].status == true) return res.status(400).json({ message: 'Delete failed!' });
    res.status(200).json({ status: 'success' });
  }),
  GET_CINEMAS_LIST: asyncHandler(async (req, res) => {
    const cinemas = await Cinemas.getAll();
    res.render('admin/pages/cinemas/cinemas-list', {
      cinemas_list: cinemas
    });
  }),
  GET_ADD_CINEMA: asyncHandler(async (req, res) => {
    const cineplexes = await Cineplexes.getAll();
    res.render('admin/pages/cinemas/add-cinema', {
      cineplexes_list: cineplexes
    });
  }),
  ADD_NEW_CINEMA: asyncHandler(async (req, res) => {
    const { name_cinema, cineplexId, type, horizontal_size, vertical_size } = req.body;
    const new_cinema = {
      name_cinema: name_cinema,
      cineplexId: cineplexId,
      typeCinema: type,
      horizontalSize: horizontal_size,
      verticalSize: vertical_size
    };
    const added_cinema = await Cinemas.addNewCinema(new_cinema);
    if(!added_cinema[0]) return res.status(400).json({ message: 'Add failed!'});
    res.status(200).json({ status: 'success' });
  }),
  DELETE_CINEMA: asyncHandler(async (req, res) => {
    const { cinemaId } = req.body;
    const hidden = await Cinemas.hiddenCinema(cinemaId);
    if(hidden[0].status == true) return res.status(400).json({ message: 'Delete failed!' });
    res.status(200).json({ status: 'success' });
  }),
  GET_MOVIES_LIST: asyncHandler(async (req, res) => {
    const movies = await Movies.getAll();
    res.render('admin/pages/movies/movies-list',{
      movies_list: movies
    });
  }),
  GET_ADD_MOVIE: asyncHandler(async (req, res) => {
    res.render('admin/pages/movies/add-movie');
  }),
  ADD_NEW_MOVIE: asyncHandler(async (req, res) => {
    // const { fd } = req.body;
    const picture = req.file.buffer;
    // console.log(file);
    console.log(req.file);
    res.status(200).json({ status: 'success' });
  }),
  DELETE_MOVIE: asyncHandler(async (req, res) => {
    const { movieId } = req.body;
    const hidden = await Movies.hiddenMovie(movieId);
    if(hidden[0].status == true) return res.status(400).json({ message: 'Delete failed!' });
    res.status(200).json({ status: 'success' });
  }),
  GET_SHOWTIMES_LIST: asyncHandler(async (req, res) => {
    const showtimes = await Showtimes.getAll();
    res.render('admin/pages/showtimes/showtimes-list',{
      showtimes_list: showtimes
    });
  }),
  GET_ADD_SHOWTIME: asyncHandler(async (req, res) => {
    const cineplexes = await Cineplexes.getCineplexName();
    const movies = await Movies.getMovieName();
    res.render('admin/pages/showtimes/add-showtime',{
      cineplexes_list: cineplexes,
      movies_list: movies
    });
  }),
  GET_CINEMA_BY_CINEPLEX: asyncHandler(async (req, res) => {
    const { cineplex_id } = req.query;
    const list = await Cinemas.getCinemaName(cineplex_id);
    res.status(200).json({ cinemas_list: list });
  }),
  ADD_NEW_SHOWTIME: asyncHandler(async (req, res) => {
    const { cinema_id, movie_id, type, start_time, end_time, fare, show_at} = req.body;
    const new_showtime = {
      cinemaId: cinema_id,
      movieId: movie_id,
      cinemaType: type,
      startTime: start_time,
      endTime: end_time,
      fare: fare,
      showAt: show_at
    };
    const added_showtime = await Showtimes.addNewShowtime(new_showtime);
    if(!added_showtime[0]) return res.status(400).json({ message: 'Add failed!'});
    res.status(200).json({ status: 'success' });
  }),
  DELETE_SHOWTIME: asyncHandler(async (req, res) => {
    const { cinemaId, movieId } = req.body;
    const hidden = await Showtimes.hiddenShowtime(cinemaId, movieId);
    if(hidden[0].status == true) return res.status(400).json({ message: 'Delete failed!' });
    res.status(200).json({ status: 'success' });
  }),
  LOGOUT: asyncHandler(async (req, res) => {
    const { userID } = req.session;
    delete req.session.userID;
    res.redirect('/');
  })
};
