const { Sequelize } = require('sequelize');
const db = require('./connect');

module.exports = {
  findAll: async () => {
    return db.query('SELECT * FROM showtime', {
      type: QueryTypes.SELECT
    });
  },
  findShowtimesByCinema: async () => {
    return db.query('SELECT * FROM showtime', {
      type: QueryTypes.SELECT
    });
  }
};
// const Showtime = db.define('showtime', {
//   movieID:{
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//   },
//   cinemaID:{
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//   },
//   startTime:{
//     type: Sequelize.DATE,
//     timestamps: true
//   },
//   endTime:{
//     type: Sequelize.DATE,
//     timestamps: true
//   },
//   fare:{
//     type: Sequelize.INTEGER
//   },
//   showAt:{
//     type: Sequelize.TIME,
//     primaryKey: true
//   }
// }, {
//   createdAt: false,
//   updatedAt: false,
//   freezeTableName: true
// });

// Showtime.belongsTo(Movies, {as: 'movies', foreignKey: 'movieID'});
// Showtime.belongsTo(Cinemas, {as: 'cinemas', foreignKey: 'cinemaID'});
//
// Showtime.getAll = async function () {
//   return Showtime.findAll({
//     attributes:['movieID', 'cinemaID','startTime','endTime', 'fare', 'showAt'],
//     include: [{
//       model: Movies,
//       as: 'movies',
//       attributes: ['movieName', 'openingDay','runningTime']
//     },{
//       model: Cinemas,
//       as: 'cinemas',
//       attributes: ['cinemaName', 'cinemaType']
//     }],
//     raw:true
//   });
// }
