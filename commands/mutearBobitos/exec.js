module.exports = async (interaction, _repository, client) => {
  try {
    const guilds = await client.guilds.fetch()
    const guildsFetched = await Promise.allSettled(guilds.map(guild => guild.fetch()))
    const channelsGeneral = await Promise.allSettled(guildsFetched.map(guild => guild.value.channels.fetch()))
    const channels = channelsGeneral.map(channel => 
      Array.from(channel.value.filter(channel => 
        channel.isVoiceBased())
        .values()))
        .flat()

    const channelsFromFetch = await Promise.allSettled(channels.map(channel => channel.fetch()))
    const bobitos = channelsFromFetch
      .filter(channel => channel.status === 'fulfilled')
      .map(channel => channel.value)
      .map(channel => channel.members.map(member => member).flat())
      .filter(members => members.length > 0)
      .flat()
    const bobito = bobitos.sort(() => 0.5 - Math.random()).slice(0, 1)[0]
    bobito.voice.setMute(true)
    interaction.deferReply()
    interaction.deleteReply()
    interaction.channel.send({ content: `Estan muteando bobitos, cierto ${bobito.displayName}` })
  } catch (error) {
    console.error(error)
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
  }
}
