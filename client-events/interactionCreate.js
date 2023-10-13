const { client } = require('../client')
const commands = require('../commands/index')

module.exports = (repository) => {
  const event = async (interaction) => {
    if (!interaction.isCommand()) return

    const command = commands.find(({data}) => data.name === interaction.commandName)
    if (!command) return

    try {
      command.exec(interaction, repository, client)
    } catch (error) {
      console.error(error)
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
    }
  }

  return event
}
