require('dotenv').config();

const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const token = process.env.DISCORD_TOKEN;

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

console.log('logging in client');
client.login(token);

client.on('ready', () => {
  console.log('client successfully logged in');

  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) {
      return;
    }

    const command = client.commands.get(interaction.commandName);
    if (!command) {
      return;
    }

    try {
      console.log(
        `executing command "${command.data.name}" for user with tag "${interaction.user.tag}"`
      );
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    }
  });
});
