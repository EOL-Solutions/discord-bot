const { SlashCommandBuilder } = require('discord.js')
const getPool = require('./exec')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('getpool')
    .setDescription('Get all nicknames in pool\'s file (default: everyone)')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('User to get pool (please look at username)')
        .setRequired(true)),
  exec: getPool
}
