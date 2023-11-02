const { client } = require('../../client')
module.exports = async (interaction, repository) => {
  try {
    const key = interaction.options.getString('key')
    const value = interaction.options.getString('value')
    const { configurationsRepository } = repository

    if (key === '' || value === '') {
      interaction.reply({ content: '`Key or value not found`', ephemeral: true })
      return
    }

    switch (key) {
      case 'update-time':
        await updateUsernamesTime(configurationsRepository, value)
        break
      case 'timeout-time':
        await updateTimeoutTime(configurationsRepository, value)
        break
      default:
        interaction.reply({ content: '`Key not found`', ephemeral: true })
        return
    }

    interaction.reply({ content: `Value for ${key} was changed to ${value}`, ephemeral: true })
  } catch (error) {
    console.error(error)
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
  }
}

async function updateUsernamesTime(cr, value) {
  try {
    const numValue = parseInt(value)
    if (isNaN(numValue)) {
      interaction.reply({ content: '`Value is not a number`', ephemeral: true })
      return
    }

    const config = await cr.findConfigurationByField('update-time')
    if (!config) {
      interaction.reply({ content: '`Configuration not found`', ephemeral: true })
      return
    }

    await cr.updateConfiguration('update-time', numValue.toString())
  } catch (error) {
    console.error(error)
  }
}
async function updateTimeoutTime(cr, value) {
  try {
    const numValue = parseInt(value)
    if (isNaN(numValue)) {
      interaction.reply({ content: '`Value is not a number`', ephemeral: true })
      return
    }

    const config = await cr.findConfigurationByField('timeout-time')
    if (!config) {
      interaction.reply({ content: '`Configuration not found`', ephemeral: true })
      return
    }

    await cr.updateConfiguration('timeout-time', numValue.toString())
  } catch (error) {
    console.error(error)
  }
}
