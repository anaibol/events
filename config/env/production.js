'use strict';

module.exports = {
  db: "mongodb://admin:0303456@localhost/wooepa",
  dbName: "wooepa",
  app: {
    name: "Wooepa - Production"
  },
  facebook: {
    clientID: "439472799532734",
    clientSecret: "6e940b23fdbf539939dffbe479678623",
    callbackURL: "http://wooepa.com/auth/facebook/callback"
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