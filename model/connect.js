const { Sequelize } = require('sequelize');
module.exports = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/temp',{
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {}, //removed ssl
  // dialect:'postgres',
  // protocol: 'postgres',
  // dialectOptions: {
  //   ssl: {
  //     require: true,
  //     rejectUnauthorized: false,
  //   },
  // },
});
