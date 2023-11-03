const TARGET_CHANNEL_ID = '1116736418358755400'
const TEXT_CHANNEL_ID = '752741501586505738'
const MINIMUM_MEMBER_COUNT = 3
let started = false

module.exports = (_repositories) => {
  const event = async (oldState, newState) => {
    const { channel: newChannel, guild: newGuild } = newState
    const { channel: oldChannel } = oldState
    if (oldChannel === null || newChannel === null) return
    if (oldChannel.id === newChannel.id) return

    if (oldChannel.id !== TARGET_CHANNEL_ID && newChannel.id === TARGET_CHANNEL_ID) { // user joined the channel
      if (newChannel.members.size >= MINIMUM_MEMBER_COUNT && !started) {
        started = true
        const { channels } = newGuild
        const textChannel = await channels.cache.get(TEXT_CHANNEL_ID)
        await textChannel.send(`Convencion de cacorros: ${newChannel.members.map(member => member.displayName).join(', ')}`)
        /*
        const { scheduledEvents } = newGuild
        const events = await scheduledEvents.cache
        console.log(events)
        */
      }
    } else if (oldChannel.id === TARGET_CHANNEL_ID && newChannel.id !== TARGET_CHANNEL_ID) { // user left the channel
      if (oldChannel.members.size < MINIMUM_MEMBER_COUNT) {
        started = false
      }
    }
  }

  return event
}
