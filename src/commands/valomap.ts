import { SlashCommandBuilder, CommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('valomap')
  .setDescription('Replies with a random Valorant map');

const maps = ['Bind', 'Haven', 'Split', 'Ascent', 'Icebox', 'Breeze', 'Fracture', 'Pearl', 'Lotus', 'Sunset', 'Abyss', 'Corrode'];

export async function execute(interaction: CommandInteraction) {
  const randomMap = maps[Math.floor(Math.random() * maps.length)];
  await interaction.reply(`🎲 You have rolled: **${randomMap}** 🎲`);
}
