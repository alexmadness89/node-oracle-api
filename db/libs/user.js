module.exports = function setupUser (UserModel) {
  function findUserByUsername (username) {
    return UserModel.findOne({ where: { username } })
  }

  return {
    findUserByUsername,
  }
}