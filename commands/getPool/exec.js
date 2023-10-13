module.exports = (interaction, data) => {
  try {
    const user = interaction.options.getUser('user')
    let content = ''
    const nicks = data[user.username]
    if (!nicks) {
      interaction.reply({ content: '`User not found`', ephemeral: true })
      return
    }

    content = '{\n  "nicknames": [\n'
    for (const nick of nicks) {
      content += `    ${nick}\n`
    }
    content += '  ]\n}\n'

    interaction.reply({ content: `\`\`\`JSON\n${content}\`\`\``, ephemeral: true })
  } catch (error) {
    console.log(error)
  }
}
