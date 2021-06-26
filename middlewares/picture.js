const asyncHandler = require('express-async-handler');
const Movies = require('../model/movies');

module.exports = asyncHandler(async function Picture(req, res, next) {
  const { _movieID } = req.params;
  const movie = await Movies.findByPicture(_movieID);
  if(!movie){
    res.status(404).send('File not found');
    next();
  }
  else{
    res.header('Content-Type', 'image/jpeg').send(movie.moviePoster);
  }
  next();
});
