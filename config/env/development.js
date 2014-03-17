'use strict';

module.exports = {
  db: "mongodb://localhost/wooeva-dev",
  dbName: "wooeva-dev",
  app: {
    name: "Wooeva - Development"
  },
  facebook: {
    clientID: "1511193072439143",
    clientSecret: "2d463b32df69fd1f1e398868705ff0eb",
    //clientID: "439472799532734",
    //clientSecret: "6e940b23fdbf539939dffbe479678623",
    callbackURL: "http://localhost:3000/auth/facebook/callback"
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