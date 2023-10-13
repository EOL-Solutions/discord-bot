const { SlashCommandBuilder } = require('discord.js')
const removePool = require('./exec')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('removepool')
    .setDescription('Remove a pool\'s file for a user')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('User to remove pool (please look at username)')
        .setRequired(true)),
  exec: removePool
}
