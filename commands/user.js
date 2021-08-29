const moment = require('moment');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder().setName('user').setDescription('Replies with user info.'),
  async execute(interaction) {
    const {
      user: { createdAt, id, tag, username },
    } = interaction;
    await interaction.reply(
      `Hey, ${username}! Here's some info about you.\n\`\`\`Your tag: ${tag}\nYour id: ${id}\nDays in server: ${moment().diff(
        moment(createdAt),
        'days'
      )}\`\`\``
    );
  },
};
