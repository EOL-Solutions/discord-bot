const { REST, Routes } = require('discord.js')
const { client, token } = require('../client')
const commandsModule = require('../commands/index')

module.exports = (nicknamesRepo) => {
  const event = async () => {
    try {
      const rest = new REST({ version: '10' }).setToken(token)
      const commands = Object.values(commandsModule).map(({ data }) => data.toJSON())

      await rest.put(Routes.applicationCommands(client.user.id), { body: commands })
      const guilds = await client.guilds.fetch()

      for(const guild of guilds.values()) {
        const guildFetched = await guild.fetch()
        const guildUsers = await guildFetched.members.fetch()
        guildUsers.forEach(async (guildMember) => {
          const { user } = guildMember
          if (!user || user.bot || user.username === 'kalevin') return

          const nicknames = await nicknamesRepo.findNicknamesByUserID(user.id)
          if (nicknames.length === 0) return

          const index = Math.floor(Math.random() * nicknames.length)
          guildMember.setNickname(nicknames[index].nickname)
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  return event
}
