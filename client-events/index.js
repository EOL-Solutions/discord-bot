const { client } = require('../client')
const ready = require('./ready')
const guildMemberUpdate = require('./guildMemberUpdate')
const interactionCreate = require('./interactionCreate')

module.exports = (repositories) => {
  client.on('ready', ready(repositories.usersRepository, repositories.nicknamesRepository))
  client.on('guildMemberUpdate', guildMemberUpdate(repositories.nicknamesRepository))
  client.on('interactionCreate', interactionCreate(repositories))
}
