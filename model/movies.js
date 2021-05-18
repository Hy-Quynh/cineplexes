const { Sequelize, Model } = require('sequelize');
const db = require('./connect');

const Movies = db.define('movies', {
  movieName:{
    type: Sequelize.STRING
  },
  openingDay:{
    type: Sequelize.DATE,
    timestamps: true
  },
  moviePoster:{
    type: Sequelize.BLOB
  },
  runningTime:{
    type: Sequelize.INTEGER
  }
}, {
    updatedAt: false,
    freezeTableName: true
});

Movies.getAll = async function () {
  return Movies.findAll({
    raw:true
  });
};

module.exports = Movies;
