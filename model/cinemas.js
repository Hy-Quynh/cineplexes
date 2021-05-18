const { Sequelize } = require('sequelize');
const db = require('./connect');

const Cinemas = db.define('cinemas', {
  _cinemaID:{
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  cinemaName:{
    type: Sequelize.STRING
  },
  clusterID:{
    type: Sequelize.INTEGER
  },
  cinemaType:{
    type: Sequelize.STRING
  },
  horizontalSize:{
    type: Sequelize.STRING
  },
  verticalSize:{
    type: Sequelize.STRING
  }
});

module.exports = Cinemas;
