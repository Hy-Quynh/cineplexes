const { Sequelize } = require('sequelize');
const db = require('./connect');

const Pictures = db.define('pictures', {
  _picturesID:{
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  movieID:{
    type: Sequelize.INTEGER
  },
  picture:{
    type: Sequelize.BLOB
  }
});
