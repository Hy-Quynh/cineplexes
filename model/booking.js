const { QueryTypes, Sequelize, Model } = require('sequelize');
const db = require('./connect');

module.exports = {
  findAllMostViewMovies: async () => {
    return db.query(`SELECT m."_movieID", m."movieName", 'data:image/gif;base64,' || encode(m."moviePoster", 'base64') AS poster, to_char("openingDay", 'DD/MM/YYYY') as "openingDay", COUNT(b."userID") as "countUser" FROM booking as b, movies as m WHERE b."movieID" = m."_movieID" AND m.status = TRUE GROUP BY  m."_movieID" ORDER BY "countUser" DESC`,{
      type: QueryTypes.SELECT
    });
  },
  addBooking: async (data) => {
    return db.query('INSERT INTO booking("_bookingID", "userID", "movieID", "cinemaID", "createAt", total, "showAt") VALUES (default, $user_id, $movie_id, $cinema_id, $created_at, $total, $show_at) RETURNING "_bookingID"',{
      bind: {
        user_id: JSON.parse(data).userId,
        movie_id: JSON.parse(data).movieId,
        cinema_id: JSON.parse(data).cinemaId,
        created_at: JSON.parse(data).createdAt,
        total: JSON.parse(data).total,
        show_at: JSON.parse(data).showAt
      },
      type: QueryTypes.INSERT,
      plain: true,
    });
  },
};
