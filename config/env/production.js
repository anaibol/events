'use strict';

module.exports = {
  db: "mongodb://localhost/wooeva",
  app: {
    name: "Wooeva - Production"
  },
  facebook: {
    clientID: "755761764436101",
    clientSecret: "7c66eae6a39cb45f1845220c4283e2d3",
    callbackURL: "http://wooeva.com/auth/facebook/callback"
  }
  /*,
  twitter: {
    clientID: "CONSUMER_KEY",
    clientSecret: "CONSUMER_SECRET",
    callbackURL: "http://localhost:3000/auth/twitter/callback"
  },
  github: {
    clientID: "APP_ID",
    clientSecret: "APP_SECRET",
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  google: {
    clientID: "APP_ID",
    clientSecret: "APP_SECRET",
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  linkedin: {
    clientID: "API_KEY",
    clientSecret: "SECRET_KEY",
    callbackURL: "http://localhost:3000/auth/linkedin/callback"
  }*/
}