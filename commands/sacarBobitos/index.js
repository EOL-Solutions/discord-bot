const { SlashCommandBuilder } = require('discord.js')
const russian = require('./exec')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sacarbobitos')
    .setDescription('Saca bobitos del canal'),
  exec: russian
}
