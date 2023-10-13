module.exports = async (interaction, _repository, client) => {
  try {
    const channels = client
      .channels
      .cache
      .filter(channel => channel.isVoiceBased())

    const channelsFromPromise = await Promise.allSettled(channels.map(channel => channel.fetch()))
    console.log(channelsFromPromise)
  } catch (error) {
    console.error(error)
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
  }
  // const bobitos = channelsFromPromise.filter(channel =>)
  /*
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
      bobito.voice.setDeaf(true)
      interaction.deferReply()
      interaction.deleteReply()
      interaction.channel.send({ content: `Estan deafeando bobitos, cierto ${bobito.displayName}` })
    })
    .catch(console.error)
  */
}
