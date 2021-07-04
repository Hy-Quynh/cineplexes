const { QueryTypes, Sequelize, Model, Op } = require('sequelize');
const db = require('./connect');
const Booking = require('./booking');

module.exports = {
  getAll: async () => {
    return db.query(`SELECT m."_movieID", m."movieName", 'data:image/gif;base64,' || encode(m."moviePoster", 'base64') AS poster, to_char(m."openingDay", 'DD/MM/YYYY') as "openingDay", m."runningTime", m.trailer, m.genre, m.introduction, m."language" FROM movies m WHERE m.status = TRUE`,{ type: QueryTypes.SELECT });
  },
  moviesRevenue: async (start, end) => {
    return db.query(`SELECT m."movieName", SUM(t.price) as "totalPrice", COUNT(t."_ticketID") as "totalTickets" FROM movies m LEFT JOIN booking b ON m."_movieID" = b."movieID" LEFT JOIN ticket t ON t."bookingID" = b."_bookingID" WHERE m.status = TRUE AND (b."createAt" >= '${start}' AND b."createAt" <= '${end}') GROUP BY m."_movieID"`,{ type: QueryTypes.SELECT });
  },
  findByPicture: async (movieID) => {
    return db.query('SELECT "moviePoster" FROM movies WHERE "_movieID" = :id AND status = TRUE',{
       type: QueryTypes.SELECT,
       plain: true,
       replacements:{ id:movieID }
     });
  },
  findByID: async (movieID) => {
    return db.query('SELECT * FROM movies WHERE "_movieID" = :id AND status = TRUE',{
       type: QueryTypes.SELECT,
       plain: true,
       replacements:{ id:movieID }
     });
  },
  findByIdBooking: async (movieID) => {
    return db.query('SELECT "_movieID", "movieName", genre FROM movies WHERE "_movieID" = :id AND status = TRUE',{
       type: QueryTypes.SELECT,
       plain: true,
       replacements:{ id:movieID }
     });
  },
  findAllComingSoonMovies: async () => {
    return db.query(`SELECT "_movieID", "movieName", 'data:image/gif;base64,' || encode("moviePoster", 'base64') AS poster, to_char("openingDay", 'DD/MM/YYYY') as "openingDay" FROM movies WHERE (DATE_PART('DAY', "openingDay"::timestamp - NOW()::timestamp) > 0) AND status = TRUE`,{
      type: QueryTypes.SELECT
    });
  },
  findAllNowShowingMovies: async () => {
    return db.query(`SELECT "_movieID", "movieName", 'data:image/gif;base64,' || encode("moviePoster", 'base64') AS poster, to_char("openingDay", 'DD/MM/YYYY') as "openingDay" FROM movies WHERE (DATE_PART('DAY', "openingDay"::timestamp - NOW()::timestamp) < 0) AND status = TRUE`,{
      type: QueryTypes.SELECT
    });
  },
  detailMovie: async (movieID) => {
    return db.query(`SELECT "_movieID", "movieName", 'data:image/gif;base64,' || encode("moviePoster", 'base64') AS poster, to_char("openingDay", 'DD/MM/YYYY') as "openingDay", "runningTime", trailer, genre, introduction, language FROM movies WHERE "_movieID" = ${movieID} AND status = TRUE`,{
      type: QueryTypes.SELECT,
      plain: true
    });
  },
  searchForMovie: async (keyword, cineplexId) => {
    return db.query(`SELECT m."_movieID", m."movieName", 'data:image/gif;base64,' || encode(m."moviePoster", 'base64') AS poster, to_char(m."openingDay", 'DD/MM/YYYY') as "openingDay", m."runningTime", m.trailer, m.genre, to_char(st."startTime", 'DD/MM/YYYY HH24:MI') as "startTime", to_char(st."endTime", 'DD/MM/YYYY HH24:MI') as "endTime", c."cinemaName" FROM movies m JOIN showtime st ON m."_movieID" = st."movieID" JOIN cinemas c ON c."_cinemaID" = st."cinemaID" WHERE "movieName" ILIKE '%${keyword}%' AND c."cineplexID" = ${cineplexId} AND m.status = TRUE`,{
      type: QueryTypes.SELECT
    });
  },
  getMovieName: async () => {
    return db.query(`SELECT "_movieID", "movieName" FROM movies  WHERE status = TRUE ORDER BY "createdAt"`, {
      type: QueryTypes.SELECT
    });
  },
  hiddenMovie: async(movieId) => {
    return db.query(`UPDATE movies SET status = FALSE WHERE "_movieID" = ${movieId} RETURNING status`, {
      type: QueryTypes.UPDATE,
      plain: true,
    });
  }
};
