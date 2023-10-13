const fs = require('fs')

module.exports = (interaction, data) => {
  const user = interaction.options.getUser('user')
  const nickname = interaction.options.getString('nickname')

  if (!user || !nickname) {
    interaction.reply({ content: '`Missing arguments`', ephemeral: true })
    return
  }

  if (!data[user.username]) {
    interaction.reply({ content: '`User not found`', ephemeral: true })
    return
  }

  if (data[user.username].includes(nickname)) {
    interaction.reply({ content: '`Nickname already in pool`', ephemeral: true })
    return
  }

  data[user.username].push(nickname)
  fs.writeFileSync('./pool.json', JSON.stringify(data, null, 2))
  interaction.reply({ content: `\`Nickname ${nickname} added to pool ${user.username}\``, ephemeral: true })
}
