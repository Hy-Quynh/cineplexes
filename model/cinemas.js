const { Sequelize, QueryTypes } = require('sequelize');
const db = require('./connect');

module.exports = {
  findAllCinemaOfCineplex: async (cineplexID) => {
    return db.query('SELECT * FROM cinemas WHERE "cineplexID" = :id', {
      type: QueryTypes.SELECT,
      replacements:{ id:cineplexID }
    });
  }
};

// const Cinemas = db.define('cinemas', {
//   _cinemaID:{
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//   },
//   cinemaName:{
//     type: Sequelize.STRING
//   },
//   clusterID:{
//     type: Sequelize.INTEGER
//   },
//   cinemaType:{
//     type: Sequelize.STRING
//   },
//   horizontalSize:{
//     type: Sequelize.STRING
//   },
//   verticalSize:{
//     type: Sequelize.STRING
//   }
// });
//
// module.exports = Cinemas;
