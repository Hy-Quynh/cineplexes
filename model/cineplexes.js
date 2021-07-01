const { Sequelize, QueryTypes } = require('sequelize');
const db = require('./connect');

module.exports = {
  getAll: async () => {
    return db.query('SELECT * FROM cineplexes WHERE status = TRUE', {
      type: QueryTypes.SELECT
    });
  },
  getCineplexName: async () => {
    return db.query(`SELECT "_cineplexID", "cineplexName" FROM cineplexes WHERE status = TRUE`, {
      type: QueryTypes.SELECT
    });
  },
  findAllCineplexOfShowtime: async (movieId) => {
    return db.query(`SELECT DISTINCT cipx.* FROM showtime  st JOIN cinemas c ON c."_cinemaID" = st."cinemaID" JOIN movies m ON m."_movieID" = st."movieID" JOIN cineplexes cipx ON c."cineplexID" = cipx."_cineplexID" WHERE st."movieID" = ${movieId}`, {
      type: QueryTypes.SELECT
    });
  },
  addNewCineplex: async (cineplex) => {
    return db.query('INSERT INTO cineplexes ("_cineplexID", "cineplexName", address) VALUES (DEFAULT, $cineplex_name, $address) RETURNING "_cineplexID", "cineplexName", address',{
      bind: {
        cineplex_name: cineplex.name_cineplex,
        address: cineplex.address
      },
      type: QueryTypes.INSERT,
      plain: true,
    });
  },
  hiddenCineplex: async(cineplexId) => {
    return db.query(`UPDATE cineplexes SET status = FALSE WHERE "_cineplexID" = ${cineplexId} RETURNING status`, {
      type: QueryTypes.UPDATE,
      plain: true,
    });
  }
};
