const { Sequelize, QueryTypes } = require('sequelize');
const db = require('./connect');

module.exports = {
  findAllSelectedSeatByCinemaAndMovie: async (movieID, cinemaID, showAt) => {
    return db.query('SELECT t."seatCode", t."row", t."column" FROM ticket t JOIN booking b ON t."bookingID" = b."_bookingID" JOIN showtime st ON st."cinemaID" = b."cinemaID" AND st."movieID" = b."movieID" AND st."showAt" = b."showAt" WHERE st."movieID" = :movie_Id AND st."cinemaID" = :cinema_Id AND st."showAt" = :show_at', {
      type: QueryTypes.SELECT,
       replacements:{
         movie_Id: movieID,
         cinema_Id: cinemaID,
         show_at: showAt
        }
    });
  },
  getFare: async (movieID, cinemaID, showAt) => {
    return db.query('SELECT st.fare FROM showtime st WHERE st."movieID" = :movie_Id AND st."cinemaID" = :cinema_Id AND st."showAt" = :show_at AND st.status = TRUE', {
      type: QueryTypes.SELECT,
      plain: true,
      replacements: {
        movie_Id: movieID,
        cinema_Id: cinemaID,
        show_at: showAt
      }
    });
  },
  getBookingInformation: async (movieID, cinemaID, showAt) => {
    return db.query(`SELECT cnpx."_cineplexID", c."_cinemaID", m."_movieID", cnpx."cineplexName", cnpx.address, c."cinemaName",to_char(st."startTime", 'DD/MM/YYYY HH24:MI') as "startTime", to_char(st."endTime", 'DD/MM/YYYY HH24:MI') as "endTime", m."movieName", m.genre, st."showAt", st.fare FROM cineplexes cnpx JOIN cinemas c ON cnpx."_cineplexID" = c."cineplexID" JOIN showtime st ON st."cinemaID" = c."_cinemaID" JOIN movies m ON m."_movieID" = st."movieID" WHERE (st.status = TRUE AND m.status = TRUE) AND c."_cinemaID" = ${cinemaID} AND st."movieID" = ${movieID} AND st."showAt" = '${showAt}'`,{
       type: QueryTypes.SELECT,
       plain: true,
     });
  },
  addTicket: async (data) => {
    // const trans = await db.transaction();
    return db.query('INSERT INTO ticket("_ticketID", "bookingID", "seatCode", "row", "column", price) VALUES (default, $booking_id, $seat_code, $row, $column, $price) RETURNING "_ticketID", "seatCode", "row", "column", price',{
      bind: {
        booking_id: JSON.parse(data).bookingId,
        seat_code: JSON.parse(data).seatCode,
        row: JSON.parse(data).row,
        column: JSON.parse(data).column,
        price: JSON.parse(data).price
      },
      type: QueryTypes.INSERT,
      plain: true,
    });
  },
};
