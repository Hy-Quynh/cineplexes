const { Sequelize } = require('sequelize');
const db = require('./connect');

module.exports = {
  getAll: async () => {
    return db.query('SELECT * FROM roles',{
      type: QueryTypes.SELECT
    });
  }
};

// const Roles = db.define('roles', {
//   roleID:{
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//   },
//   roleName:{
//     type: Sequelize.STRING
//   },
//   display:{
//     type: Sequelize.STRING
//   },
//   description:{
//     type: Sequelize.STRING
//   }
// });
//
// Roles.getAll = async function () {
//   return Roles.findAll({
//     raw:true
//   });
// };
//
// module.exports = Roles;
