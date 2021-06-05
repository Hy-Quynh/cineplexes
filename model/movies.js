const { QueryTypes, Sequelize, Model, Op } = require('sequelize');
const db = require('./connect');
const Booking = require('./booking');

module.exports = {
  getAll: async () => {
    return db.query('SELECT "_movieID", "movieName", "openingDay", "runningTime", "createdAt", trailer, genre FROM movies',{ type: QueryTypes.SELECT });
  },
  findByPicture: async (movieID) => {
    return db.query('SELECT "moviePoster" FROM movies WHERE "_movieID" = :id',{
       type: QueryTypes.SELECT,
       plain: true,
       replacements:{ id:movieID }
     });
  },
  findByID: async (movieID) => {
    return db.query('SELECT * FROM movies WHERE "_movieID" = :id',{
       type: QueryTypes.SELECT,
       plain: true,
       replacements:{ id:movieID }
     });
  },
  findAllUpcomingMovies: async () => {
    return db.query(`SELECT "_movieID", "movieName", "openingDay", "runningTime", trailer, genre FROM movies WHERE (DATE_PART('DAY', "openingDay"::timestamp - NOW()::timestamp) > 0)`,{
      type: QueryTypes.SELECT
    });
  },
  movieDetail: async (movieID) => {
    return db.query('SELECT "_movieID", "movieName", "openingDay", "runningTime", genre FROM movies WHERE "_movieID" = :id',{
      type: QueryTypes.SELECT,
      plain: true,
      replacements: { id: movieID }
    });
  }
};

// const Movies = db.define('movies', {
//   _movieID:{
//     type: Sequelize.INTEGER,
//     primaryKey: true
//   },
//   movieName:{
//     type: Sequelize.STRING
//   },
//   openingDay:{
//     type: Sequelize.DATE,
//     timestamps: true
//   },
//   moviePoster:{
//     type: Sequelize.BLOB
//   },
//   runningTime:{
//     type: Sequelize.INTEGER
//   },
//   createdAt:{
//     type: Sequelize.DATE,
//     timestamps: true
//   },
//   trailer:{
//     type: Sequelize.STRING
//   },
//   genre:{
//     type: Sequelize.STRING
//   }
// }, {
//     updatedAt: false,
//     freezeTableName: true
// });
//
// Movies.getAll = async function () {
//   return Movies.findAll({
//     raw:true
//   });
// };
//
// Movies.findAllNewMovies = async () => {
//   return Movies.findAll({
//     where: {
//        runningTime: {
//          [Op.gt]:new Date(Date.now())
//        }
//     },
//     raw:true
//   });
// };
//
// module.exports = Movies;
