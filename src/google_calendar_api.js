///Google Calendar API///////////////////////////////////////////////////////
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

const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
const washroomOneId = 'b013u55ur0f6k3mmpscc3jrvn4@group.calendar.google.com';
const washroomTwoId = '4frseag0f15jie3vj8v9m2ri14@group.calendar.google.com';
const kitchenId = '7ied85glenu48ljb3f4hl3jrio@group.calendar.google.com';

function washroomOne(auth) {
  return new Promise((resolve, reject) => {
    calendar.events.list(
      {
        calendarId: washroomOneId,
        timeMin: new Date().toISOString(),
        maxResults: 1,
        singleEvents: true,
        orderBy: 'startTime',
        colorId: 'Grape',
      },
      (err, res) => {
        if (err) {
          reject(`The API returned an error of ${err}`);
          return console.log(`The API returned an error of ${err}`);
        }
        const clean = res.data.items;
        if (clean.length) {
          let cleaningPerson = ``;
          clean.map((clean, i) => {
            cleaningPerson += `__***${clean.summary}***__ is cleaning __***Washroom #1***__ on __***${clean.start.date}***__!`;
            console.log(cleaningPerson);
          });
          resolve(cleaningPerson);
        } else {
          console.log(`No one is cleaning WASHROOM #1 😳`);
          resolve(`No one is cleaning WASHROOM #1 😳`);
        }
      }
    );
  });
}

function washroomTwo(auth) {
  return new Promise((resolve, reject) => {
    calendar.events.list(
      {
        calendarId: washroomTwoId,
        timeMin: new Date().toISOString(),
        maxResults: 1,
        singleEvents: true,
        orderBy: 'startTime',
      },
      (err, res) => {
        if (err) {
          reject(`The API returned an error of ${err}`);
          return console.log(`The API returned an error of ${err}`);
        }
        const clean = res.data.items;
        if (clean.length) {
          let cleaningPerson = ``;
          clean.map((clean, i) => {
            cleaningPerson += `__***${clean.summary}***__ is cleaning __***Washroom #2***__ on __***${clean.start.date}***__!`;
            console.log(cleaningPerson);
          });
          resolve(cleaningPerson);
        } else {
          console.log(`No one is cleaning WASHROOM #2 😳`);
          resolve(`No one is cleaning WASHROOM #2 😳`);
        }
      }
    );
  });
}

function kitchen(auth) {
  return new Promise((resolve, reject) => {
    calendar.events.list(
      {
        calendarId: kitchenId,
        timeMin: new Date().toISOString(),
        maxResults: 1,
        singleEvents: true,
        orderBy: 'startTime',
      },
      (err, res) => {
        if (err) {
          return console.log(`The API returned an error of ${err}`);
        }
        const clean = res.data.items;
        if (clean.length) {
          let cleaningPerson = ``;
          clean.map((clean, i) => {
            cleaningPerson += `__***${clean.summary}***__ is cleaning the __***Kitchen***__ on __***${clean.start.date}***__!`;
            console.log(cleaningPerson);
          });
          resolve(cleaningPerson);
        } else {
          console.log(`No one is cleaning the Kitchen 😳`);
          resolve(`No one is cleaning Kitchen 😳`);
        }
      }
    );
  });
}

module.exports = { washroomOne, washroomTwo, kitchen };
///Google Calendar API///////////////////////////////////////////////////////
