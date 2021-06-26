const { Sequelize, QueryTypes } = require('sequelize');
const db = require('./connect');

module.exports = {
  getAll: async () => {
    return db.query('SELECT * FROM roles',{
      type: QueryTypes.SELECT
    });
  }
};
