const { SlashCommandBuilder } = require('discord.js')
const createPool = require('./exec')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('createpool')
    .setDescription('Create a pool\'s file for a user')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('User to create pool (please look at username)')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('nickname')
        .setDescription('Nickname to add to pool (please look at username)')
        .setMaxLength(31)),
  exec: createPool
}
