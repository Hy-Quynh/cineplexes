const { Sequelize } = require('sequelize');
const db = require('./connect');

const Roles = db.define('roles', {
  roleID:{
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  roleName:{
    type: Sequelize.STRING
  },
  display:{
    type: Sequelize.STRING
  },
  description:{
    type: Sequelize.STRING
  }
});
