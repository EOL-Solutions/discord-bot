module.exports = (interaction, _data, client) => {
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
      bobito.voice.setMute(true)
      interaction.deferReply()
      interaction.deleteReply()
      interaction.channel.send({ content: `Estan muteando bobitos, cierto ${bobito.displayName}` })
    })
    .catch(console.error)
}
