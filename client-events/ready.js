const { REST, Routes } = require('discord.js')
const { client, token } = require('../client')
const commandsModule = require('../commands/index')

module.exports = (usersRepo, nicknamesRepo) => {
  const event = async () => {
    try {
      const rest = new REST({ version: '10' }).setToken(token)
      const commands = Object.values(commandsModule).map(({ data }) => data.toJSON())

      await rest.put(Routes.applicationCommands(client.user.id), { body: commands })

      const users = await usersRepo.findAllUsers()

      users.forEach(async ({ id }) => {
        const user = await client.users.fetch(id)
        if (!user || user.bot || user.username === 'kalevin') return

        const nicknames = await nicknamesRepo.findNicknamesByUserID(id)
        if (nicknames.length === 0) return

        const index = Math.floor(Math.random() * nicknames.length)
        user.setNickname(nicknames[index].nickname)
      })

    } catch (error) {
      console.error(error)
    }
  }

  return event
}
