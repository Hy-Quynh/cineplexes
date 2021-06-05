const asyncHandler = require('express-async-handler');
const Movies = require('../model/movies');

module.exports = {
  GET_MOVIES: asyncHandler(async (req, res) => {
    const findAll = await Movies.getAll();
    res.status(200).json({
      status: 'success',
      movies: findAll
    });
  }),
  DETAIL_MOVIE: asyncHandler(async (req, res) => {
    // const { movieID } = req.body;
    const movieDetail = await Movies.movieDetail(1);
    // res.render('detail', {
    //   messenge: 'success',
    //   detail: movieDetail
    // });
    res.status(200).json({
      status: 'success',
      detail: movieDetail
    });
  }),
};
