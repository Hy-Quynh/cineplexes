const { Sequelize } = require('sequelize');
const db = require('./connect');

const Booking = db.define('booking', {
  _bookingID:{
    type: Sequelize.UUID,
    primaryKey: true,
  },
  userID:{
    type: Sequelize.INTEGER
  },
  movieID:{
    type: Sequelize.INTEGER
  },
  cinemaID:{
    type: Sequelize.INTEGER
  },
  createAt:{
    type: Sequelize.DATE,
    timestamps: true
  },
  total:{
    type: Sequelize.INTEGER
  }
});
