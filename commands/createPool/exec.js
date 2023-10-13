module.exports = async (interaction, repository) => {
  try {
    const user = interaction.options.getUser('user')
    const nickname = interaction.options.getString('nickname')
    const { usersRepository, nicknamesRepository } = repository

    if (!user) {
      interaction.reply({ content: '`Missing arguments`', ephemeral: true })
      return
    }

    const userFromDB = await usersRepository.findUserByUsername(user.username)
    if (userFromDB) {
      interaction.reply({ content: '`User already exists`', ephemeral: true })
      return
    }

    await usersRepository.insertNewUser(user)
    if (nickname) {
      await nicknamesRepository.insertNewNickname(nickname, user.id)
    } else {
      await nicknamesRepository.insertNewNickname(user.username, user.id)
    }
    interaction.reply({ content: `\`User ${user.username} created\``, ephemeral: true })
  } catch (error) {
    console.error(error)
    interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
  }
}
