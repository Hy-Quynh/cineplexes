const asyncHandler = require('express-async-handler');
const Cinemas = require('../model/cinemas');
const Cineplexes = require('../model/cineplexes');
const Movies = require('../model/movies');
const Showtimes = require('../model/showtime');

module.exports = {
  HOME: asyncHandler(async (req, res) => {
    res.render('admin/admin-dashboard');
  }),

  GET_ADD_CINEPLEX: asyncHandler(async (req, res) => {
    res.render('admin/pages/cinema-complexes/add-new-cineplex');
  }),

  GET_LIST_CINEPLEXES: asyncHandler(async (req, res) => {
    const cineplexes = await Cineplexes.getAll();
    res.render('admin/pages/cinema-complexes/list-cineplexes',{
      cineplexes_list: cineplexes
    });
  }),

  DELETE_CINEPLEX: asyncHandler(async (req, res) => {
    const { cineplexId } = req.body;
    const hidden = await Cineplexes.hiddenCineplex(cineplexId);
    if(hidden[0].status == true) return res.status(400).json({ message: 'Delete failed!' });
    res.status(200).json({ status: 'success' });
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

  GET_LIST_CINEMAS: asyncHandler(async (req, res) => {
    const cinemas = await Cinemas.getAll();
    res.render('admin/pages/cinemas/list_cinemas', {
      cinemas_list: cinemas
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

  GET_ADD_CINEMA: asyncHandler(async (req, res) => {
    const cineplexes = await Cineplexes.getAll();
    res.render('admin/pages/cinemas/add-new-cinema', {
      cineplexes_list: cineplexes
    });
  }),

  DELETE_CINEMA: asyncHandler(async (req, res) => {
    const { cinemaId } = req.body;
    const hidden = await Cinemas.hiddenCinema(cinemaId);
    if(hidden[0].status == true) return res.status(400).json({ message: 'Delete failed!' });
    res.status(200).json({ status: 'success' });
  }),

  GET_LIST_MOVIES: asyncHandler(async (req, res) => {
    const movies = await Movies.getAll();
    res.render('admin/pages/movies/list-movies',{
      movies_list: movies
    });
  }),

  GET_ADD_MOVIE: asyncHandler(async (req, res) => {
    res.render('admin/pages/movies/add-movie');
  }),

  ADD_NEW_MOVIE: asyncHandler(async (req, res) => {
    const { name, open, runtime, trailer, genre, introduction, language } = req.body;
    if(!req.file) return res.render('admin/pages/movies/add-movie',{ status: 'error', message: 'Please upload picture' });
    if(name == '' || open == '' || runtime == '' || trailer == '' || genre == '' || introduction == '' || language == '') return res.render('admin/pages/movies/add-movie',{ status: 'error', message: 'Please fill out the form completely' });
    const newMovie = {
      name_movie: name,
      open_day: open,
      poster: req.file.buffer,
      run_time: runtime,
      trailer: trailer,
      genre: genre,
      introduction: introduction,
      language: language
    };
    const added_movie = await Movies.addNewMovie(newMovie);
    if(!added_movie[0]) return res.render('admin/pages/movies/add-movie',{ status: 'error', message: 'Add failed' });
    res.render('admin/pages/movies/add-movie',{ status: 'success' });
  }),

  DELETE_MOVIE: asyncHandler(async (req, res) => {
    const { movieId } = req.body;
    const hidden = await Movies.hiddenMovie(movieId);
    if(hidden[0].status == true) return res.status(400).json({ message: 'Delete failed!' });
    res.status(200).json({ status: 'success' });
  }),

};
