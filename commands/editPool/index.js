const { SlashCommandBuilder } = require('discord.js')
const editPool = require('./exec')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('editnicknamepool')
    .setDescription('Edit a nickname to pool\'s file for a user (remove if empty)')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('User to add nickname')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('old')
        .setDescription('Old nickname')
        .setRequired(true)
        .setAutocomplete(true))
    .addStringOption(option =>
      option.setName('new')
        .setDescription('New nickname (remove if empty)')
        .setMaxLength(31)),
  exec: editPool
}
