const { Sequelize } = require('sequelize');
module.exports = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/MyMovies',{
  // dialect: 'postgres',
  // protocol: 'postgres',
  // dialectOptions: {}, //removed ssl
  dialect:'postgres',
  protocol: 'postgres',
  dialectOptions: {
    useUTC: false,
    dateStrings: false,
    typeCast: function (field, next) { // for reading from database
      if (field.type === 'DATETIME') {
        return field.string()
      }
        return next()
    },
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  timezone: 'Asia/Ho_Chi_Minh'
});
