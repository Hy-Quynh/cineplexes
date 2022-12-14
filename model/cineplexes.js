const { Sequelize, QueryTypes } = require('sequelize');
const db = require('./connect');

module.exports = {
  getAll: async () => {
    return db.query('SELECT * FROM cineplexes WHERE status = TRUE ORDER BY "_cineplexID" DESC', {
      type: QueryTypes.SELECT
    });
  },
  cineplexesRevenue: async (start, end) => {
    return db.query(`SELECT cipx."cineplexName", SUM(t.price) as "totalPrice", COUNT(t."_ticketID") as "totalTickets" FROM cineplexes cipx LEFT JOIN cinemas c ON cipx."_cineplexID" = c."cineplexID" LEFT JOIN booking b ON b."cinemaID" = c."_cinemaID" LEFT JOIN ticket t ON t."bookingID" = b."_bookingID" WHERE c.status = TRUE AND cipx.status = TRUE AND (b."createAt" >= '${start}' AND b."createAt" <= '${end}') GROUP BY cipx."_cineplexID"`, {
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
  },

  findAllCineplexOfShowtime: async (movieId) => {
    return db.query(`SELECT DISTINCT cipx.* FROM showtime st JOIN cinemas c ON c."_cinemaID" = st."cinemaID" JOIN movies m ON m."_movieID" = st."movieID" JOIN cineplexes cipx ON c."cineplexID" = cipx."_cineplexID" WHERE st."movieID" = ${movieId} AND (st."startTime"::TIMESTAMP < NOW()::TIMESTAMP AND st."endTime"::TIMESTAMP > NOW()::TIMESTAMP) AND (cipx.status = TRUE AND st.status = TRUE AND c.status = TRUE)`, {
      type: QueryTypes.SELECT
    });
  },

  getCineplexName: async () => {
    return db.query(`SELECT "_cineplexID", "cineplexName" FROM cineplexes WHERE status = TRUE`, {
      type: QueryTypes.SELECT
    });
  },
};