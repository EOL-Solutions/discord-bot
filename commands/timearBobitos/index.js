const { SlashCommandBuilder } = require('discord.js')
const russian = require('./exec')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('timearbobitos')
    .setDescription('Timea bobitos del canal')
    .addStringOption(option =>
      option
        .setName('time')
        .setDescription('Tiempo en minutos (falla si no es un numero valido)')),
  exec: russian
}
