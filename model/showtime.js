const { Sequelize, QueryTypes } = require('sequelize');
const db = require('./connect');

module.exports = {
  getAll: async () => {
    return db.query(`SELECT st."movieID", st."cinemaID", c."cinemaName", m."movieName",to_char(st."startTime", 'DD/MM/YYYY HH24:MI') as "startTime", to_char(st."endTime", 'DD/MM/YYYY HH24:MI') as "endTime", st.fare, st."showAt" FROM showtime st JOIN movies m ON st."movieID" = m."_movieID" JOIN cinemas c ON st."cinemaID" = c."_cinemaID" WHERE st.status = TRUE AND m.status = TRUE ORDER BY "startTime"::TIMESTAMP DESC`, {
      type: QueryTypes.SELECT
    });
  },
  searchForShowtimeCineplex: async (keyword, cineplexId) => {
    return db.query(`SELECT m."_movieID", m."movieName", 'data:image/gif;base64,' || encode(m."moviePoster", 'base64') AS poster, to_char(m."openingDay", 'DD/MM/YYYY') as "openingDay", m."runningTime", m.trailer, m.genre, to_char(st."startTime", 'DD/MM/YYYY HH24:MI') as "startTime", to_char(st."endTime", 'DD/MM/YYYY HH24:MI') as "endTime", c."cinemaName" FROM movies m JOIN showtime st ON m."_movieID" = st."movieID" JOIN cinemas c ON c."_cinemaID" = st."cinemaID" WHERE "movieName" ILIKE '%${keyword}%' AND c."cineplexID" = ${cineplexId} AND ("startTime"::TIMESTAMP <= NOW()::TIMESTAMP AND "endTime"::TIMESTAMP >= NOW()::TIMESTAMP) AND m.status = TRUE AND c.status = TRUE ORDER BY DATE(st."startTime") DESC`,{
      type: QueryTypes.SELECT
    });
  },
  searchForShowtimeCinema: async (keyword) => {
    return db.query(`SELECT m."_movieID", m."movieName", c."cinemaName", cipx."cineplexName", 'data:image/gif;base64,' || encode(m."moviePoster", 'base64') AS poster,to_char(m."openingDay", 'DD/MM/YYYY') as "openingDay", m."runningTime", m.trailer, m.genre, to_char(st."startTime", 'DD/MM/YYYY HH24:MI') as "startTime", to_char(st."endTime", 'DD/MM/YYYY HH24:MI') as "endTime" FROM cinemas c JOIN showtime st ON st."cinemaID" = c."_cinemaID" JOIN cineplexes cipx ON c."cineplexID" = cipx."_cineplexID" JOIN movies m ON m."_movieID" = st."movieID" WHERE c."cinemaName" ILIKE '%${keyword}%' AND ("startTime"::TIMESTAMP < NOW()::TIMESTAMP AND "endTime"::TIMESTAMP > NOW()::TIMESTAMP) AND st.status = TRUE AND c.status = TRUE and cipx.status = TRUE AND m.status = TRUE ORDER BY DATE(st."startTime") DESC`, {
      type: QueryTypes.SELECT
    });
  },
  findShowtimesByCinema: async () => {
    return db.query('SELECT * FROM showtime WHERE status = TRUE', {
      type: QueryTypes.SELECT
    });
  },
  findAllCinemaNameMovie: async (movieId) => {
    return db.query('SELECT c."cinemaName", st."cinemaID", c."cinemaType" FROM showtime  st LEFT JOIN cinemas c ON c."_cinemaID" = st."cinemaID" WHERE st."movieID" = :Id AND st.status = TRUE AND c.status = TRUE', {
      type: QueryTypes.SELECT,
      replacements: {
        Id: movieId
      }
    });
  },
  findAllByCineplex: async (cineplexId, movieId) => {
    return db.query(`SELECT c."_cinemaID", c."cinemaName", st."showAt" FROM showtime st JOIN cinemas c ON st."cinemaID" = c."_cinemaID" WHERE c."cineplexID" = :cineplex_id AND st."movieID" = :movie_id AND (st."startTime"::TIMESTAMP <= NOW()::TIMESTAMP AND st."endTime"::TIMESTAMP >= NOW()::TIMESTAMP) AND (st.status = TRUE AND c.status = TRUE)`, {
      type: QueryTypes.SELECT,
      replacements: {
        cineplex_id: cineplexId,
        movie_id: movieId
      }
    });
  },
  addNewShowtime: async (showtime) => {
    return db.query('INSERT INTO showtime ("movieID", "cinemaID", "startTime", "endTime", fare, "showAt") VALUES ($movie_id, $cinema_id, $start_time, $end_time, $fare, $show_at) RETURNING "movieID", "cinemaID", "startTime", "endTime", fare, "showAt"',{
      bind: {
        movie_id: showtime.movieId,
        cinema_id: showtime.cinemaId,
        start_time: showtime.startTime,
        end_time: showtime.endTime,
        fare: showtime.fare,
        show_at: showtime.showAt
      },
      type: QueryTypes.INSERT,
      plain: true,
    });
  },
  hiddenShowtime: async(cinemaId, movieId) => {
    return db.query(`UPDATE showtime SET status = FALSE WHERE "cinemaID" = ${cinemaId} AND "movieID" = ${movieId} RETURNING status`, {
      type: QueryTypes.UPDATE,
      plain: true,
    });
  },
};
