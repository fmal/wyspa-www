const fs = require('fs');
const path = require('path');
const fetch = require('isomorphic-unfetch');

// load env variables
['.env', `.env.${process.env.NODE_ENV}`]
  .map(filename => path.resolve(__dirname, '..', filename))
  .filter(filepath => fs.existsSync(filepath))
  .forEach(filepath => {
    require('dotenv').config({
      path: filepath
    });
  });

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { email } = JSON.parse(event.body);

    if (!email) {
      return { statusCode: 500, body: 'Missing Email' };
    }

    const subscriber = {
      email,
      subscribed: true
    };

    const response = await fetch('https://api.mailbluster.com/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.MAILBLUSTER_API_KEY
      },
      body: JSON.stringify(subscriber)
    });

    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        msg: "You've signed up to the mailing list!",
        detail: data
      })
    };
  } catch (err) {
    console.log(err); // output to netlify function log

    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message })
    };
  }
};
