const fs = require('fs')

module.exports = (interaction, data) => {
  const user = interaction.options.getUser('user')
  const oldNickname = interaction.options.getString('old')
  const newNickname = interaction.options.getString('new')

  if (!user || !oldNickname) {
    interaction.reply({ content: '`Missing arguments`', ephemeral: true })
    return
  }

  if (!data[user.username]) {
    interaction.reply({ content: '`User not found`', ephemeral: true })
    return
  }

  if (!data[user.username].includes(oldNickname)) {
    interaction.reply({ content: '`Nickname isn\'t in pool`', ephemeral: true })
    return
  }

  if (data[user.username].includes(newNickname)) {
    interaction.reply({ content: '`Nickname already in pool`', ephemeral: true })
    return
  }

  data[user.username].splice(data[user.username].indexOf(oldNickname), 1)

  if (newNickname) {
    data[user.username].push(newNickname)
  }

  if (data[user.username].length === 0) {
    data[user.username] = ['default']
  }

  fs.writeFileSync('./pool.json', JSON.stringify(data, null, 2))
  interaction.reply({ content: `\`Nickname ${oldNickname} changed in pool ${user.username}\``, ephemeral: true })
}
