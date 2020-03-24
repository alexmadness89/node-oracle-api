const { db } = require('config')
const setupDataBase = require('./libs/conexion')
/* Models */
const setupUserModel = require('./models/user')
/* Libs */
const setupUser = require('./libs/user')

module.exports = async function () {
  const config = {
    ...db.main,
    logging: console.log,
    query: {
      raw: true
    }
  }
  const sequelize = setupDataBase(config)
  await sequelize.authenticate()
  /** create models*/
  const UserModel = setupUserModel(config)
  /** create Libs*/
  const User = setupUser(UserModel)
  return {
    User,
  }
}