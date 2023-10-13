module.exports = async (interaction, repository) => {
  const user = interaction.options.getUser('user')
  const { usersRepository, nicknamesRepository } = repository

  if (!user) {
    interaction.reply({ content: '`Missing arguments`', ephemeral: true })
    return
  }

  const userFromDB = await usersRepository.findUserByUsername(user.username)
  if (!userFromDB) {
    interaction.reply({ content: '`User not found`', ephemeral: true })
    return
  }

  const nicknames = await nicknamesRepository.findNicknamesByUserID(userFromDB.id)
  if (!nicknames.length) {
    interaction.reply({ content: '`No nicknames found`', ephemeral: true })
    return
  }

  await nicknamesRepository.deleteNicknamesByUserID(userFromDB.id)
  await usersRepository.deleteUserByID(userFromDB.id)

  interaction.reply({ content: `\`User ${user.username} removed\``, ephemeral: true })
}
