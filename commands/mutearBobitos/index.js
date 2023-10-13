const { SlashCommandBuilder } = require('discord.js')
const russian = require('./exec')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mutearbobitos')
    .setDescription('Mutea bobitos del canal'),
  exec: russian
}
