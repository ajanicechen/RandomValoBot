import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import 'dotenv/config';

const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

const commands = [
    new SlashCommandBuilder()
    .setName('valomap')
    .setDescription('Replies with a random map'),

    new SlashCommandBuilder()
    .setName('valoagent')
    .setDescription('Replies with one or more random Valorant agents')
    .addIntegerOption(option => 
        option.setName('amount')
            .setDescription('Number of agents to return')
            .setRequired(true))
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN!);

(async () => {
  try {
    console.log('🌀 Refreshing application (/) commands...');

    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID!, GUILD_ID!),
      { body: commands },
    );

    console.log('✅ Successfully registered commands.');
  } catch (error) {
    console.error('❌ Error registering commands:', error);
  }
})();
