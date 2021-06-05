const { Sequelize, QueryTypes } = require('sequelize');
const db = require('./connect');

module.exports = {
  findAll: async () => {
    return db.query('SELECT * FROM cineplexes', {
      type: QueryTypes.SELECT
    });
  }
};










// const Cineplexes = db.define('cineplexes', {
//   _clusterID:{
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//   },
//   clusterName:{
//     type: Sequelize.STRING
//   },
//   address:{
//     type: Sequelize.STRING
//   }
// });
//
// Cinemas.belongsTo(Cineplexes, {as: 'cineplexes', foreignKey: '_clusterID'});
// Cineplexes.hasMany(Cinemas, {as: 'cinemas', foreignKey: 'clusterID'});
//
// Cineplexes.getAll = async function (_clusterID) {
//   return Cineplexes.findAll({
//     attributes:['_clusterID', 'clusterName', 'address'],
//     where:{
//       _clusterID,
//     },
//     include: [{
//       model: Cinemas,
//       as: 'cinemas',
//       attributes: ['_cinemaID', 'cinemaName', 'cinemaType','horizontalSize','verticalSize']
//       // order: [
//       //   ['time', 'DESC'],
//       // ]
//     }]
//   });
// };

// module.exports = Cineplexes;
