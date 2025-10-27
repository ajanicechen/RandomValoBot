import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

const agents = ['Astra', 'Breach', 'Brimstone', 'Chamber', 'Clove', 'Cypher', 'Deadlock', 'Fade', 'Gekko', 'Harbor', 'Iso', 'Jett', 'Kay/O', 'Killjoy', 'Neon', 'Omen', 'Phoenix', 'Raze', 'Reyna', 'Sage', 'Skye', 'Sova', 'Tejo', 'Veto', 'Viper', 'Vyse', 'Waylay', 'Yoru'];

export const data = new SlashCommandBuilder()
  .setName('valoagent')
  .setDescription('Replies with one or more random Valorant agents')
  .addIntegerOption(option =>
    option
      .setName('amount')
      .setDescription('Number of agents to return (1–5)')
      .setRequired(true)
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  const amount = interaction.options.getInteger('amount')!;

  if (amount < 1 || amount > 5) {
    await interaction.reply('Please choose a number between 1 and 5.');
    return;
  }

  // Pick random unique agents
  const shuffled = [...agents].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, amount);

  await interaction.reply(`🎲 You have rolled: **${selected.join(', ')}** 🎲`);
}
