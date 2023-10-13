const { SlashCommandBuilder } = require('discord.js')
const russian = require('./exec')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('deafearbobitos')
    .setDescription('Deafea bobitos del canal'),
  exec: russian
}
