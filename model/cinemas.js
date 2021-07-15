const { Sequelize, QueryTypes } = require('sequelize');
const db = require('./connect');

module.exports = {
  findAllCinemaOfCineplex: async (cineplexID) => {
    return db.query('SELECT * FROM cinemas WHERE "cineplexID" = :id', {
      type: QueryTypes.SELECT,
      replacements:{ id:cineplexID }
    });
  },
  getAll: async () => {
    return db.query('SELECT c."_cinemaID", c."cinemaName", c."cinemaType", c."horizontalSize", c."verticalSize", cnplx."cineplexName" FROM cinemas c LEFT JOIN cineplexes cnplx ON c."cineplexID" = cnplx."_cineplexID" WHERE c.status = TRUE ORDER BY c."_cinemaID" DESC', {
      type: QueryTypes.SELECT,
    });
  },
  hiddenCinema: async(cinemaId) => {
    return db.query(`UPDATE cinemas SET status = FALSE WHERE "_cinemaID" = ${cinemaId} RETURNING status`, {
      type: QueryTypes.UPDATE,
      plain: true,
    });
  },
  getCinemaName: async (cineplexId) => {
    return db.query(`SELECT "_cinemaID", "cinemaName" FROM cinemas WHERE "cineplexID" = ${cineplexId} AND status = TRUE`, {
      type: QueryTypes.SELECT
    });
  },
  addNewCinema: async (cinema) => {
    return db.query('INSERT INTO cinemas ("_cinemaID", "cinemaName", "cineplexID", "cinemaType", "horizontalSize", "verticalSize") VALUES (DEFAULT, $cinema_name, $cineplex_id, $cinema_type, $horizontal_size, $vertical_size) RETURNING "_cinemaID", "cineplexID", "cinemaName", "cinemaType", "horizontalSize", "verticalSize"',{
      bind: {
        cinema_name: cinema.name_cinema,
        cineplex_id: cinema.cineplexId,
        cinema_type: cinema.typeCinema,
        horizontal_size: cinema.horizontalSize,
        vertical_size: cinema.verticalSize
      },
      type: QueryTypes.INSERT,
      plain: true,
    });
  },
};
