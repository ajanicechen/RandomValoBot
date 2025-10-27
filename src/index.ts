import fs from 'fs';
import path from 'path';
import { Client, GatewayIntentBits, Collection, CommandInteraction } from 'discord.js';
import { config } from 'dotenv';
config();

// Extend Client type so TS knows about commands
interface ClientWithCommands extends Client {
  commands: Collection<string, any>;
}

async function main() {
  const client: ClientWithCommands = new Client({ intents: [GatewayIntentBits.Guilds] }) as ClientWithCommands;
  client.commands = new Collection();

  const commandsPath = path.join(__dirname, 'commands');
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));

  for (const file of commandFiles) {
    const command = await import(`./commands/${file}`);
    client.commands.set(command.data.name, command);
  }

  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.editReply('There was an error while executing this command!');
      } else {
        await interaction.reply('There was an error while executing this command!');
      }
    }
  });

  await client.login(process.env.DISCORD_TOKEN);
}

main().catch(console.error);
