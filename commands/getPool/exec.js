module.exports = async (interaction, repository) => {
  try {
    const user = interaction.options.getUser('user')
    const { nicknamesRepository } = repository
    const nicks = await nicknamesRepository.findNicknamesByUserID(user.id)

    if (!nicks) {
      interaction.reply({ content: '`User not found`', ephemeral: true })
      return
    }

    let content = '{\n  "nicknames": [\n'
    for (const nick of nicks) {
      content += `    ${nick.nickname}\n`
    }
    content += '  ]\n}\n'

    interaction.reply({ content: `\`\`\`JSON\n${content}\`\`\``, ephemeral: true })
  } catch (error) {
    console.log(error)
    interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
  }
}
