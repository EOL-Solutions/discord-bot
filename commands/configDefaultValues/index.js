const { SlashCommandBuilder } = require('discord.js')
const configDefaultValues = require('./exec')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('changeconfig')
    .setDescription('Change display names of all users in pool')
    .addStringOption(option =>
      option.setName('key')
        .setDescription('Key to change')
        .setRequired(true)
        .addChoices(
          { name: 'Update usernames time', value: 'update-time' },
          { name: 'Timeout duration', value: 'timeout-time' }
        ))
    .addStringOption(option =>
      option.setName('value')
        .setDescription('Value to change')
        .setRequired(true)),
  exec: configDefaultValues
}
