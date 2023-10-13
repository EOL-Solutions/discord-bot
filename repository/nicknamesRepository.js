module.exports = (repo) => {
  const findNicknamesByUserID = async (id) => repo.findNicknamesByUserID(id)
  const findNicknameByNickname = async (nickname) => repo.findNicknameByNickname(nickname)
  const insertNewNickname = async (nickname, userID) => repo.insertNewNickname(nickname, userID)
  const updateNickname = async (oldNickname, newNickname, userID) => repo.updateNickname(oldNickname, newNickname, userID)
  const deleteNicknamesByUserID = async (id) => repo.deleteNicknamesByUserID(id)
  const deleteNicknameByNickname = async (nickname) => repo.deleteNicknameByNickname(nickname)

  return {
    findNicknamesByUserID,
    findNicknameByNickname,
    insertNewNickname,
    updateNickname,
    deleteNicknamesByUserID,
    deleteNicknameByNickname
  }
}
