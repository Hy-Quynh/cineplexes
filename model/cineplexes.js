const { Sequelize, QueryTypes } = require('sequelize');
const db = require('./connect');

module.exports = {
  getAll: async () => {
    return db.query('SELECT * FROM cineplexes', {
      type: QueryTypes.SELECT
    });
  },
  findAllCineplexOfShowtime: async (movieId) => {
    return db.query(`SELECT DISTINCT cipx.* FROM showtime  st JOIN cinemas c ON c."_cinemaID" = st."cinemaID" JOIN movies m ON m."_movieID" = st."movieID" JOIN cineplexes cipx ON c."cineplexID" = cipx."_cineplexID" WHERE st."movieID" = ${movieId}`, {
      type: QueryTypes.SELECT
    });
  }
};
