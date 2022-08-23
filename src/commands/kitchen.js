require('dotenv').config();
//Google Calendar API Import//////////////////////////////////////////////
const { kitchen } = require('../google_calendar_api');

const { google } = require('googleapis');

const { OAuth2 } = google.auth;
const oAuth2Client = new OAuth2(
  `${process.env.GOOGLE_CLIENT_ID}, ${process.env.GOOGLE_CLIENT_SECRET}`
);

oAuth2Client.setCredentials({
  refresh_token: `${process.env.GOOGLE_REFRESH_TOKEN}`,
});
//Google Calendar API Import//////////////////////////////////////////////

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('who-k')
    .setDescription('Replies with who is cleaning the kitchen next'),

  async execute(interaction) {
    let who = await kitchen(oAuth2Client);
    await interaction.reply(who);
  },
};
