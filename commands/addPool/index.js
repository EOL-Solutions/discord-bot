const { SlashCommandBuilder } = require('discord.js')
const addPool = require('./exec')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('addpool')
    .setDescription('Add a nickname to pool\'s file for a user')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('User to add nickname')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('nickname')
        .setDescription('Nickname to add')
        .setMaxLength(31)
        .setRequired(true)),
  exec: addPool
}
