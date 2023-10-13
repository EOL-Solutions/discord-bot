const fs = require('fs')

module.exports = (interaction, data) => {
  const user = interaction.options.getUser('user')

  if (!user) {
    interaction.reply({ content: '`Missing arguments`', ephemeral: true })
    return
  }

  if (!data[user.username]) {
    interaction.reply({ content: '`User not found`', ephemeral: true })
    return
  }

  delete data[user.username]
  fs.writeFileSync('./pool.json', JSON.stringify(data, null, 2))
  interaction.reply({ content: `\`User ${user.username} removed\``, ephemeral: true })
}
