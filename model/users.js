const { Sequelize, QueryTypes } = require('sequelize');
const db = require('./connect');
const Roles = require('./roles');

module.exports = {
  getAll: async () => {
    return db.query('SELECT * FROM users', { type: QueryTypes.SELECT });
  },
  findByEmail: async (email) => {
    return db.query(`SELECT "_userID", email, "password", "fullName", "phoneNumber", "roleID" FROM users WHERE email = :email`, {
      type: QueryTypes.SELECT,
      plain: true,
      replacements: {
        email: email
      }
    });
  },
  findByID: async (userID) => {
    return db.query(`SELECT "_userID", email, "password", "fullName", "phoneNumber", "roleID" FROM users WHERE "_userID" = :id`, {
      type: QueryTypes.SELECT,
      plain: true,
      replacements: {
        id:userID
      }
    });
  },
  add: async (fullName, email, phoneNumber, password) => {
    return db.query(`INSERT INTO users("_userID", email, "password", "fullName", "phoneNumber", "roleID" ) VALUES (default, '${email}', '${password}', '${fullName}', '${phoneNumber}', 2)`, {
      type: QueryTypes.INSERT
    });
  },
  findOneAndUpdate: async (userID, password) => {
    return db.query(`UPDATE users SET "password" = '${password}' WHERE "_userID" = '${userID}'`, {
      type: QueryTypes.UPDATE
    });
  },
  info: async (userID) => {
    return db.query(`SELECT "_userID", email, "fullName", "phoneNumber", "roleID" FROM users WHERE "_userID" = :id`, {
      type: QueryTypes.SELECT,
      plain: true,
      replacements: {
        id:userID
      }
    });
  },
  historyTicketOfUser: async (userId) => {
    return db.query(`SELECT m."_movieID", m."movieName", 'data:image/gif;base64,' || encode(m."moviePoster", 'base64') AS poster, to_char(b."createAt", 'DD/MM/YYYY HH24:MI') as "createAt", t."seatCode", cipx."cineplexName", c."cinemaName" FROM movies m JOIN booking b ON m."_movieID" = b."movieID" JOIN cinemas c ON b."cinemaID" = c."_cinemaID" JOIN cineplexes cipx ON c."cineplexID" = cipx."_cineplexID" JOIN ticket t ON b."_bookingID" = t."bookingID" WHERE  b."userID" = ${userId}`,{
      type: QueryTypes.SELECT
    });
  }
};
