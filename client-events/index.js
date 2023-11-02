const { client } = require('../client')
const ready = require('./ready')
const guildMemberUpdate = require('./guildMemberUpdate')
const interactionCreate = require('./interactionCreate')

module.exports = (repositories) => {
  client.on('ready', ready(repositories.nicknamesRepository, repositories.configurationsRepository))
  client.on('guildMemberUpdate', guildMemberUpdate(repositories.nicknamesRepository))
  client.on('interactionCreate', interactionCreate(repositories))
}
