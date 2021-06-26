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
