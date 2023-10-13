module.exports = async (interaction, repository, client) => {
  try {
    const { configurationsRepository } = repository
    const { value } = await configurationsRepository.findConfigurationByField('timeout-time')
    let total = 1000 * 60
    const time = Number(interaction.options.getString('time'))
    if (isNaN(time) || time <= 0) {
      total *= value
    } else {
      total *= time
    }

    const guilds = await client.guilds.fetch()
    const guildsFetched = await Promise.allSettled(guilds.map(guild => guild.fetch()))
    const channelsGeneral = await Promise.allSettled(guildsFetched.map(guild => guild.value.channels.fetch()))
    const channels = channelsGeneral.map(channel => 
      Array.from(channel.value.filter(channel => 
        channel.isVoiceBased())
        .values()))
        .flat()

    const channelsFetched = await Promise.allSettled(channels.map(channel => channel.fetch()))
    const bobitos = channelsFetched
      .filter(channel => channel.status === 'fulfilled')
      .map(channel => channel.value)
      .map(channel => channel.members.map(member => member).flat())
      .filter(members => members.length > 0)
      .flat()
    const bobito = bobitos.sort(() => 0.5 - Math.random()).slice(0, 1)[0]
    await bobito.disableCommunicationUntil(new Date(Date.now() + total))
    interaction.deferReply()
    interaction.deleteReply()
    interaction.channel.send({ content: `Estan timeando bobitos, cierto ${bobito.displayName}` })
  } catch (error) {
    console.error(error)
    return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
  }
}
