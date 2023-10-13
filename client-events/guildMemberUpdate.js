module.exports = (nicknamesRepo) => {
  const event = async (_oldMember, guildMember) => {
    const {id, nickname, user} = guildMember
    if (user.bot) return

    const nicknames = await nicknamesRepo.findNicknamesByUserID(id)
    if (nicknames.length === 0) return
    if (nicknames.some(({nickname: n}) => n === nickname)) return

    const index = Math.floor(Math.random() * nicknames.length)
    guildMember.setNickname(nicknames[index].nickname)
  }

  return event
}
