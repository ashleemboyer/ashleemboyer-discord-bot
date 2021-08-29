module.exports = {
  name: 'interactionCreate',
  execute: async (interaction) => {
    if (!interaction.isCommand()) {
      return;
    }

    const { client } = interaction;
    const command = client.commands.get(interaction.commandName);
    if (!command) {
      return;
    }

    try {
      console.log(
        `executing command "${command.data.name}" for user with tag "${interaction.user.tag}" in #${interaction.channel.name}`
      );
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    }
  },
};
