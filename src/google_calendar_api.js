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
const washroomId = 'b013u55ur0f6k3mmpscc3jrvn4@group.calendar.google.com';

// const eventStartTime = new Date();
// eventStartTime.setDate(eventStartTime.getDay() + 2);

// const eventEndTime = new Date();
// eventEndTime.setDate(eventEndTime.getDate() + 2);
// eventEndTime.setMinutes(eventEndTime.getMinutes() + 45);

// const event = {
//   summary: 'Meet with Krish',
//   location: 'Joes house',
//   description: 'Krish finally gets to meet Joe',

//   start: {
//     dateTime: eventStartTime,
//     timeZone: 'America/New_York',
//   },
//   end: {
//     dateTime: eventEndTime,
//     timeZone: 'America/New_York',
//   },
//   colorId: 1,
// };

// calendar.freebusy.query(
//   {
//     resource: {
//       timeMin: eventStartTime,
//       timeMax: eventEndTime,
//       timeZone: 'Canada/Ontario',
//       items: [{ id: 'primary' }], //checking primary calender
//     },
//   },
//   (err, res) => {
//     if (err) return console.error(`Free Busy Query Error ${err}`);

//     const eventsArray = res.data.calendars.primary.busy;

//     if (eventsArray.length === 0)
//       return calendar.events.insert(
//         { calendarId: 'primary', resource: event },
//         (err) => {
//           if (err) return console.error(`Calendar Event Creation Error ${err}`);

//           return console.log('Calendar Event Created.');
//         }
//       );

//     return console.log(`Sorry I'm Busy`);
//   }
// );

function washroomOne(auth) {
  return new Promise((resolve, reject) => {
    calendar.events.list(
      {
        calendarId: washroomId,
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
            console.log(
              `${clean.summary} is cleaning this week on ${clean.start.dateTime}!`
            );

            cleaningPerson += `${clean.summary} is cleaning this week on ${clean.start.dateTime}!`;
          });
          resolve(cleaningPerson.substring(0, cleaningPerson.length - 16));
        } else {
          console.log(`No one is cleaning this week!`);
          resolve(`No one is cleaning this week!`);
        }
      }
    );
  });
}

module.exports = { washroomOne };
///Google Calendar API///////////////////////////////////////////////////////
