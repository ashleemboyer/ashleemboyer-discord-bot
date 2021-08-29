const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder().setName('server').setDescription('Replies with server info.'),
  async execute(interaction) {
    const {
      guild: { memberCount, name },
      user: { username },
    } = interaction;
    await interaction.reply(
      `Hey, ${username}! Here's some info about the server.\n\`\`\`Server name: ${name}\nTotal members: ${memberCount}\`\`\``
    );
  },
};
