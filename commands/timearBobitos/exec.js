const fs = require('fs')

module.exports = (interaction, _data, client, config) => {
  const time = Number(interaction.options.getString('time')) === 0 ? 1 : Number(interaction.options.getString('time'))
  if (isNaN(time)) {
    return interaction.reply({ content: 'El tiempo debe ser un número, bobito', ephemeral: true })
  }
  if (isNaN(Number(config["timeout-time"]))) {
    return interaction.reply({ content: 'El tiempo de timeout debe ser un número, bobito', ephemeral: true })
  }

  const total = time > 0 ? Math.floor(time * 60 * 1000) : Math.floor(Number(config["timeout-time"]) * 60 * 1000)

  const channels = client
    .channels
    .cache
    .filter(channel => channel.isVoiceBased())

  Promise.allSettled(channels.map(channel => channel.fetch()))
    .then(channels => {
      const bobitos = []
      bobitos.push(
        ...channels
          .filter(channel => channel.status === 'fulfilled')
          .map(channel => channel.value)
          .map(channel => channel.members.map(member => member))
          .flat())
      return bobitos
    })
    .then(bobitos => {
      const bobito = bobitos.sort(() => 0.5 - Math.random()).slice(0, 1)[0]
      bobito
        .disableCommunicationUntil(new Date(Date.now() + total))
        .then(() => {
          interaction.deferReply()
          interaction.deleteReply()
          interaction.channel.send({ content: `Estan timeando bobitos, cierto ${bobito.displayName}` })
        })
        .catch(() => {
          interaction.deferReply()
          interaction.deleteReply()
          interaction.channel.send({ content: `No se pudo timear este bobito: ${bobito.displayName}` })
        })
    })
    .catch(console.error)
}
