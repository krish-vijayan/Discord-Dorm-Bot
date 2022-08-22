const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('server')
    .setDescription('Replies with sever information'),

  async execute(interaction) {
    await interaction.reply(
      `Sever Name: ${interaction.guild.name}\nNumber of Members: ${interaction.guild.memberCount}`
    );
  },
};
