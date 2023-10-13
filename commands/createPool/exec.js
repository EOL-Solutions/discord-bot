const fs = require('fs')

module.exports = (interaction, data) => {
  const user = interaction.options.getUser('user')

  if (!user) {
    interaction.reply({ content: '`Missing arguments`', ephemeral: true })
    return
  }

  if (data[user.username]) {
    interaction.reply({ content: '`User already exists`', ephemeral: true })
    return
  }

  data[user.username] = ['default']
  fs.writeFileSync('./pool.json', JSON.stringify(data, null, 2))
  interaction.reply({ content: `\`User ${user.username} created\``, ephemeral: true })
}
