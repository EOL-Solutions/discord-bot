const TARGET_CHANNEL_ID = '1116736418358755400'
const TEXT_CHANNEL_ID = '752741501586505738'
const MINIMUM_MEMBER_COUNT = 3
let started = false

module.exports = (_repositories) => {
  const event = async (oldState, newState) => {
    const { channel: newChannel, guild: newGuild } = newState
    const { channel: oldChannel, guild: oldGuild } = oldState
    if (oldChannel?.id === newChannel?.id) return

    if (newChannel !== null && newChannel.id === TARGET_CHANNEL_ID) { // user joined the channel
      if (newChannel.members.size >= MINIMUM_MEMBER_COUNT && !started) {
        started = true
        const { channels, scheduledEvents } = newGuild
        const textChannel = await channels.cache.get(TEXT_CHANNEL_ID)
        await textChannel.send(`Convencion de cacorros: ${newChannel.members.map(member => member.displayName).join(', ')}`)
        const event = await scheduledEvents.create({
          name: 'Convencion de cacorros',
          scheduledStartTime: Date.now(),
          privacyLevel: 2,
          entityType: 2,
          description: `${newChannel.members.map(member => member.displayName).join(', ')} estan en convencion`,
          channel: newChannel,
          reason: 'Mucho cacorro en el grupo'
        })
        await event.setStatus(2, 'Iniciado por bot')
      }
    } else if (oldChannel !== null && oldChannel.id === TARGET_CHANNEL_ID) { // user left the channel
      if (oldChannel.members.size < MINIMUM_MEMBER_COUNT) {
        if (started) {
          const { channels, scheduledEvents } = oldGuild
          const textChannel = await channels.cache.get(TEXT_CHANNEL_ID)
          await textChannel.send('Convencion de cacorros terminada')
          const events = await scheduledEvents.fetch()
          events.forEach(async event => {
            if (event.creator.bot) { await event.delete() }
          })
        }
        started = false
      }
    }
  }

  return event
}
