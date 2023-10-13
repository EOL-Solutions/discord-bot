module.exports = async (interaction, repository) => {
  try {
    const user = interaction.options.getUser('user')
    const nickname = interaction.options.getString('nickname')
    const { usersRepository, nicknamesRepository } = repository

    if (!user || !nickname) {
      interaction.reply({ content: '`Missing arguments`', ephemeral: true })
      return
    }

    const userFromDB = await usersRepository.findUserByUsername(user.username)
    if (!userFromDB) {
      interaction.reply({ content: '`User not found`', ephemeral: true })
      return
    }

    const nicknames = await nicknamesRepository.findNicknamesByUserID(userFromDB.id)
    if (nicknames.some(({nickname: n}) => n === nickname)) {
      interaction.reply({ content: '`Nickname already in pool`', ephemeral: true })
      return
    }

    await nicknamesRepository.insertNewNickname(nickname, userFromDB.id)
    interaction.reply({ content: `\`Nickname ${nickname} added to pool ${user.username}\``, ephemeral: true })
  } catch (error) {
    console.error(error)
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
  }
}
