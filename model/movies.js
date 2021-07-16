const { QueryTypes, Sequelize, Model, Op } = require('sequelize');
const db = require('./connect');
const Booking = require('./booking');

module.exports = {
  getAll: async () => {
    return db.query(`SELECT m."_movieID", m."movieName", 'data:image/gif;base64,' || encode(m."moviePoster", 'base64') AS poster, to_char(m."openingDay", 'DD/MM/YYYY') as "openingDay", m."runningTime", m.trailer, m.genre, m.introduction, m."language" FROM movies m WHERE m.status = TRUE ORDER BY m."createdAt"::TIMESTAMP DESC`,{ type: QueryTypes.SELECT });
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
  addNewMovie: async (movie) => {
    return db.query('INSERT INTO movies ("_movieID", "movieName", "openingDay", "moviePoster", "runningTime", "createdAt", trailer, genre, introduction, "language", status) VALUES (DEFAULT, $name_movie, $open_day, $poster, $run_time, DEFAULT, $trailer, $genre, $introduction, $language, DEFAULT) RETURNING "_movieID"',{
      bind: {
        name_movie: movie.name_movie,
        open_day: movie.open_day,
        poster: movie.poster,
        run_time: movie.run_time,
        trailer: movie.trailer,
        genre: movie.genre,
        introduction: movie.introduction,
        language: movie.language
      },
      type: QueryTypes.INSERT,
      plain: true,
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
  getMovieName: async () => {
    return db.query(`SELECT "_movieID", "movieName" FROM movies  WHERE (DATE_PART('DAY', "openingDay"::timestamp - NOW()::timestamp) < 0) AND status = TRUE ORDER BY "createdAt"::TIMESTAMP DESC`, {
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