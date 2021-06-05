const { QueryTypes, Sequelize, Model } = require('sequelize');
const db = require('./connect');
// const Movies = require('./movies');
// const Showtime = require('./showtime');
// const Users = require('./users');

module.exports = {
  findAllMostWatchedMovies: async () => {
    return db.query('SELECT m."_movieID", m."movieName", COUNT(b."userID") FROM booking as b, movies as m WHERE b."movieID" = m."_movieID"  GROUP BY  m."_movieID"',{
      type: QueryTypes.SELECT
    });
  }
};

// const Booking = db.define('booking', {
//   _bookingID:{
//     type: Sequelize.UUID,
//     primaryKey: true,
//   },
//   userID:{
//     type: Sequelize.INTEGER
//   },
//   movieID:{
//     type: Sequelize.INTEGER
//   },
//   cinemaID:{
//     type: Sequelize.INTEGER
//   },
//   createAt:{
//     type: Sequelize.DATE,
//     timestamps: true
//   },
//   total:{
//     type: Sequelize.INTEGER
//   },
//   showAt: {
//     type: Sequelize.TIME
//   }
// }, {
//   createdAt: false,
//   updatedAt: false,
//   freezeTableName: true
// });
//
// // Booking.hasOne(Showtime, { as: 'showtime', foreignKey:'fk_booking_showtime'});
// Booking.hasMany(Users, {as: 'users', foreignKey: 'userID'});
//
// Booking.findAllMostWatchedMovies = async () => {
//   return db.query('SELECT m."_movieID", m."movieName", COUNT(b."userID") FROM booking as b, movies as m WHERE b."movieID" = m."_movieID"  GROUP BY  m."_movieID"',{ type: QueryTypes.SELECT });
//
//   // return Booking.findAll({
//   //   attributes: [
//   //     'movies._movieID',
//   //     'movies.movieName',
//   //     [Sequelize.fn('COUNT', Sequelize.col('userID')), 'amount']
//   //   ],
//   //   include: [{
//   //     model: Movies,
//   //     as: 'movies',
//   //     where:{
//   //       _movieID:'movieID',
//   //     },
//   //     attributes: ['_movieID','movieName']
//   //   }],
//   //   group: 'movies._movieID',
//   //   raw: true
//   // });
// };
//
// module.exports = Booking;
