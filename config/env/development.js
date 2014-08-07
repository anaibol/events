'use strict';

module.exports = {
  db: "mongodb://localhost/wooepa-dev",
  dbName: "wooepa-dev",
  app: {
    name: "Wooepa - Development"
  },
  facebook: {
    clientID: "1511193072439143",
    clientSecret: "2d463b32df69fd1f1e398868705ff0eb",
    //clientID: "439472799532734",
    //clientSecret: "6e940b23fdbf539939dffbe479678623",
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  }
};