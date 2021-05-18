const { Sequelize } = require('sequelize');
const db = require('./connect');

const Showtime = db.define('showtime', {
  movieID:{
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  cinemaID:{
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  startTime:{
    type: Sequelize.DATE,
    timestamps: true
  },
  endTime:{
    type: Sequelize.DATE,
    timestamps: true
  },
  fare:{
    type: Sequelize.INTEGER
  }
});
