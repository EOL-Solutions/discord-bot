require('dotenv').config()
const fs = require('fs')
const { Client, GatewayIntentBits, REST, Routes } = require('discord.js')
const commandsFolder = require('./commands/index')

const data = JSON.parse(fs.readFileSync('./pool.json', 'utf8'))
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'))

const token = process.env.DISCORD_TOKEN
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates
  ]
})
const updateUsers = {}

client.on('ready', async () => {
  const commands = []
  for (const commandObject of commandsFolder.commands) {
    commands.push(commandObject.data.toJSON())
  }

  const rest = new REST({ version: '10' }).setToken(token)
  try {
    updateCommands(rest, commands)
    initPool()
  } catch (error) {
    console.log(error)
  }
  console.log('I am ready!')
})

client.on('guildMemberUpdate', (_oldMember, newMember) => {
  try {
    if (newMember.user.bot) return
    if (checkNicknameInPool(newMember.user.username, newMember.nickname)) return

    const newNickname = getRandomName(newMember.user.username)
    if (!newNickname) return

    newMember.setNickname(newNickname)
    if (!updateUsers[newMember.user.username]) {
      updateUsers[newMember.user.username] = newMember
    }
  } catch (error) {
    console.log(error)
  }
})

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return
  for (const commandObject of commandsFolder.commands) {
    if (commandObject.data.name === interaction.commandName) { commandObject.exec(interaction, data, client, config) }
  }
})

/* ----------------- UTILS ----------------- */
async function initPool () {
  const usernames = Object.keys(data)
  const guilds = await client.guilds.fetch()
  const myGuild = await guilds.find(guild => guild.id === '597254202976239628').fetch()
  const members = await myGuild.members.fetch()

  for (const username of usernames) {
    const user = members.find(member => member.user.username === username)
    if (!user) continue
    if (user.user.bot) continue
    if (user.user.username === 'kalevin') continue

    const newNickname = getRandomName(username)
    if (!newNickname) continue

    user.setNickname(newNickname)
    if (!updateUsers[user.user.username]) {
      updateUsers[user.user.username] = user
    }
  }
}
async function updateCommands(rest, commands) {
  console.log('Started refreshing application (/) commands.')
  await rest.put(Routes.applicationCommands(client.user.id), { body: commands })
  console.log('Successfully reloaded application (/) commands.')
}

function getRandomName (username) {
  const pool = data[username]
  if (!pool) return false

  const index = Math.floor(Math.random() * pool.length)
  return pool[index]
}

function checkNicknameInPool (username, nickname) {
  const pool = data[username]
  if (!pool) return false
  return pool.includes(nickname)
}

function updateUsersEachDay () {
  for (const username in updateUsers) {
    const user = updateUsers[username]
    const newNickname = getRandomName(username)
    if (!newNickname) continue

    user.setNickname(newNickname)
  }

  setTimeout(updateUsersEachDay, 1000 * 60 * config["update-time"])
}

updateUsersEachDay()

/* ----------------- START ----------------- */
client.login(token)
