const { Sequelize } = require('sequelize');
const db = require('./connect');

const Users = db.define('users', {
  _userID:{
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  email:{
    type: Sequelize.STRING
  },
  password:{
    type: Sequelize.STRING
  },
  fullName:{
    type: Sequelize.STRING
  },
  phoneNumber:{
    type: Sequelize.STRING
  },
  roleID:{
    type: Sequelize.INTEGER
  }
});
