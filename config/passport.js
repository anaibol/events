'use strict';

//LocalStrategy = require('passport-local').Strategy,
//TwitterStrategy = require('passport-twitter').Strategy,
var FacebookStrategy = require('passport-facebook').Strategy;

//GitHubStrategy = require('passport-github').Strategy,
//GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
//LinkedinStrategy = require('passport-linkedin').Strategy,

var config = require('./config');

var Users = global.db.get('users');


module.exports = function(passport) {

  // Serialize the user id to push into the session
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  // Deserialize the user object based on a pre-serialized token
  // which is the user id
  passport.deserializeUser(function(id, done) {
    Users.findOne({
      _id: id
    }, '-salt -hashed_password', function(err, user) {
      done(err, user);
    });
  });

  // Use facebook strategy

  global.fbAppId = config.facebook.clientID;

  passport.use(new FacebookStrategy({
      clientID: config.facebook.clientID,
      clientSecret: config.facebook.clientSecret,
      callbackURL: config.facebook.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      Users.findOne({
        'facebook.id': profile.id
      }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          if (!profile.emails) {
            profile.emails = [{}];
            profile.emails[0].value = '';
          }

          user = {
            name: profile.displayName,
            email: profile.emails[0].value,
            username: profile.username,
            provider: 'facebook',
            facebook: profile._json,
            accessToken: accessToken
          };

          Users.insert(user, function(err) {
            if (err) console.log(err);
            return done(err, user);
          });
        } else {
          Users.update({_id: user._id}, {$set: {accessToken: accessToken}});
          return done(err, user);
        }
      });
    }
  ));
};