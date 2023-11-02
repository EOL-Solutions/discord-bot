const { client } = require('../../client')
module.exports = async (interaction, repository) => {
  try {
    const user = interaction.options.getUser('user')
    const { usersRepository, nicknamesRepository } = repository

    if (user) {
      const userFromDB = await usersRepository.findUserByUsername(user.username)
      if (!userFromDB) {
        interaction.reply({ content: '`User not found`', ephemeral: true })
        return
      }
      const nicknames = await nicknamesRepository.findNicknamesByUserID(userFromDB.id)
      if (nicknames.length === 0) {
        interaction.reply({ content: '`No nicknames found`', ephemeral: true })
        return
      }
      const { nickname } = nicknames[Math.floor(Math.random() * nicknames.length)]
      await interaction.guild.members.cache.get(userFromDB.id).setNickname(nickname)
      interaction.reply({ content: `Changed ${user.username}'s nickname to ${nickname}`, ephemeral: true })
      return
    }

    const guilds = await client.guilds.fetch()

    for(const guild of guilds.values()) {
      const guildFetched = await guild.fetch()
      const guildUsers = await guildFetched.members.fetch()
      guildUsers.forEach(async (guildMember) => {
        const { user } = guildMember
        if (!user || user.bot || user.username === 'kalevin') return

        const nicknames = await nicknamesRepository.findNicknamesByUserID(user.id)
        if (nicknames.length === 0) return

        const index = Math.floor(Math.random() * nicknames.length)
        guildMember.setNickname(nicknames[index].nickname)
      })
    }

    interaction.reply({ content: 'Changed all nicknames', ephemeral: true })
  } catch (error) {
    console.error(error)
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
  }
}
