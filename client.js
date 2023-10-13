const { Client, GatewayIntentBits } = require('discord.js')

const token = process.env.DISCORD_TOKEN
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates
  ]
})

module.exports = { client, token }
