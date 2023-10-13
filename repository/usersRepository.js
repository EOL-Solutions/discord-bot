module.exports = (repo) => {
  const findUserByID = async (id) => repo.findUserByID(id)
  const findUserByUsername = async (username) => repo.findUserByUsername(username)
  const findAllUsers = async () => repo.findAllUsers()
  const insertNewUser = async (user) => repo.insertNewUser(user)
  const deleteUserByID = async (id) => repo.deleteUserByID(id)

  return {
    findUserByID,
    findUserByUsername,
    findAllUsers,
    insertNewUser,
    deleteUserByID
  }
}
