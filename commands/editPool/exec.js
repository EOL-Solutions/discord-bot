module.exports = async (interaction, repository) => {
  try {
    const user = interaction.options.getUser('user')
    const oldNickname = interaction.options.getString('old')
    const newNickname = interaction.options.getString('new')
    const { usersRepository, nicknamesRepository } = repository

    if (!user || !oldNickname) {
      interaction.reply({ content: '`Missing arguments`', ephemeral: true })
      return
    }

    const userFromDB = await usersRepository.findUserByUsername(user.username)
    if (!userFromDB) {
      interaction.reply({ content: '`User not found`', ephemeral: true })
      return
    }

    const nicknames = await nicknamesRepository.findNicknamesByUserID(userFromDB.id)
    if (!nicknames.some(({nickname: n}) => n === oldNickname)) {
      interaction.reply({ content: '`Nickname isn\'t in pool`', ephemeral: true })
      return
    }

    if (!newNickname && nicknames.length > 1) {
      await nicknamesRepository.deleteNicknameByNickname(oldNickname)
      interaction.reply({ content: `\`Nickname ${oldNickname} deleted from pool ${user.username}\``, ephemeral: true })
      return
    }

    if (newNickname) {
      if (nicknames.some(({nickname: n}) => n === newNickname)) {
        interaction.reply({ content: '`Nickname already in pool`', ephemeral: true })
        return
      }
      await nicknamesRepository.updateNickname(oldNickname, newNickname, userFromDB.id)
      interaction.reply({ content: `\`Nickname ${oldNickname} changed to ${newNickname} in pool ${user.username}\``, ephemeral: true })
    }
  } catch(error) {
    console.error(error)
    interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
  }
}
