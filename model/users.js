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
  findByID: async (_userID) => {
    return db.query(`SELECT "_userID", email, "password", "fullName", "phoneNumber", "roleID" FROM users WHERE "_userID" = :id`, {
      type: QueryTypes.SELECT,
      plain: true,
      replacements: {
        id:_userID
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
  }
};

// const Users = db.define('users', {
//   _userID:{
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//   },
//   email:{
//     type: Sequelize.STRING
//   },
//   password:{
//     type: Sequelize.STRING
//   },
//   fullName:{
//     type: Sequelize.STRING
//   },
//   phoneNumber:{
//     type: Sequelize.STRING
//   },
//   roleID:{
//     type: Sequelize.INTEGER
//   }
// }, {
//     updatedAt: false,
//     freezeTableName: true
// });
//
// Users.belongsTo(Roles, {as: 'roles', foreignKey: 'roleID'});
// Roles.hasMany(Users, {as: 'users', foreignKey: 'roleID'});
//
// Users.getAll = async function () {
//   return Users.findAll({
//     attributes:['_userID', 'email','password','fullName', 'phoneNumber', 'roleID'],
//     include: [{
//       model: Roles,
//       as: 'roles',
//       attributes: ['roleID', 'roleName', 'display']
//     }],
//     raw:true
//   });
// };
//
// Users.findByEmail = async function (email) {
//   return Users.findOne({
//     attributes:['_userID', 'email','password','fullName', 'phoneNumber'],
//     where:{
//       email,
//     },
//     include: [{
//       model: Roles,
//       as: 'roles',
//       attributes: ['roleID', 'roleName', 'display']
//     }]
//   });
// };
//
// Users.findByID = async function (_userID) {
//   return Users.findByPk(_userID)
// };
//
// Users.add = async function (newUser) {
//   return Users.create({
//     email: newUser.email,
//     password: newUser.password,
//     fullName: newUser.fullName,
//     phoneNumber: newUser.phoneNumber,
//     roleID: 2,
//     createdAt: Date.now()
//   });
// };
//
//
// module.exports = Users;
