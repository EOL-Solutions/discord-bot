const { SlashCommandBuilder } = require('discord.js')
const changeDisplayNames = require('./exec')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('changenames')
    .setDescription('Change display names of all users in pool')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('User to change nickname')),
  exec: changeDisplayNames
}
