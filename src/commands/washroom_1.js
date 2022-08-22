//Google Calendar API Import//////////////////////////////////////////////
const { washroomOne } = require('../google_calendar_api');
require('dotenv').config();
const { google } = require('googleapis');

const { OAuth2 } = google.auth;
const oAuth2Client = new OAuth2(
  `${process.env.GOOGLE_CLIENT_ID}`,
  `${process.env.GOOGLE_CLIENT_SECRET}`
);

oAuth2Client.setCredentials({
  refresh_token: `${process.env.GOOGLE_REFRESH_TOKEN}`,
});
//Google Calendar API Import//////////////////////////////////////////////

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('who-w1')
    .setDescription('Replies with who is cleaning washroom #1 for that week'),

  async execute(interaction) {
    let who = await washroomOne(oAuth2Client);
    await interaction.reply(who);
  },
};
