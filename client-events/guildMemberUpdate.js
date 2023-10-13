module.exports = (nicknamesRepo) => {
  const event = async (_oldMember, {id, nickname, user}) => {
    if (user.bot) return

    const nicknames = await nicknamesRepo.findNicknamesByUserID(id)
    if (nicknames.length === 0) return
    if (nicknames.some(({nickname: n}) => n === nickname)) return

    const index = Math.floor(Math.random() * nicknames.length)
    user.setNickname(nicknames[index].nickname)
  }

  return event
}
