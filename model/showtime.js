const { Sequelize, QueryTypes } = require('sequelize');
const db = require('./connect');

module.exports = {
  getAll: async () => {
    return db.query(`SELECT st."movieID", st."cinemaID", c."cinemaName", m."movieName",to_char(st."startTime", 'DD/MM/YYYY HH24:MI') as "startTime", to_char(st."endTime", 'DD/MM/YYYY HH24:MI') as "endTime", st.fare, st."showAt" FROM showtime st JOIN movies m ON st."movieID" = m."_movieID" JOIN cinemas c ON st."cinemaID" = c."_cinemaID" WHERE st.status = TRUE`, {
      type: QueryTypes.SELECT
    });
  },
  findShowtimesByCinema: async () => {
    return db.query('SELECT * FROM showtime WHERE status = TRUE', {
      type: QueryTypes.SELECT
    });
  },
  findAllCinemaNameMovie: async (movieId) => {
    return db.query('SELECT c."cinemaName", st."cinemaID", c."cinemaType" FROM showtime  st LEFT JOIN cinemas c ON c."_cinemaID" = st."cinemaID" WHERE st."movieID" = :Id AND st.status = TRUE', {
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
  hiddenShowtime: async(cinemaId) => {
    return db.query(`UPDATE cinemas SET status = FALSE WHERE "_cinemaID" = ${cinemaId} RETURNING status`, {
      type: QueryTypes.UPDATE,
      plain: true,
    });
  },
};
