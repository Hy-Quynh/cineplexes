const { Sequelize, QueryTypes } = require('sequelize');
const db = require('./connect');

module.exports = {
  findAll: async () => {
    return db.query('SELECT * FROM showtime', {
      type: QueryTypes.SELECT
    });
  },
  findShowtimesByCinema: async () => {
    return db.query('SELECT * FROM showtime', {
      type: QueryTypes.SELECT
    });
  },
  findAllCinemaNameMovie: async (movieId) => {
    return db.query('SELECT c."cinemaName", st."cinemaID" FROM showtime  st LEFT JOIN cinemas c ON c."_cinemaID" = st."cinemaID" WHERE st."movieID" = :Id', {
      type: QueryTypes.SELECT,
      replacements: {
        Id: movieId
      }
    });
  },
  findAllByCineplex: async (cineplexId, movieId) => {
    return db.query('SELECT c."_cinemaID", c."cinemaName", st."showAt" FROM showtime st JOIN cinemas c ON st."cinemaID" = c."_cinemaID" WHERE c."cineplexID" = :cpId AND  st."movieID" = :mId', {
      type: QueryTypes.SELECT,
      replacements: {
        cpId: cineplexId,
        mId: movieId
      }
    });
  }
};
