'use strict';

// User routes use users controller
var users = require('../controllers/users');

module.exports = function(app, passport) {
  app.get('/auth/signin', users.signin);
  app.get('/auth/signup', users.signup);
  app.get('/auth/signout', users.signout);
  // app.get('/users/me', users.me);

  // Setting up the users api
  // app.post('/users', users.create);

  // Setting up the userId param
  // app.param('userId', users.user);

  // Setting the local strategy route
  /*app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: true
    }), users.session);*/

  // Setting the facebook oauth routes
  app.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['read_stream','publish_actions', 'email', 'user_about_me', 'user_photos', 'create_event', 'rsvp_event', 'user_events', 'user_location', 'user_interests'],
    failureRedirect: '/signin'
  }), users.signin);

  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/signin'
  }), users.authCallback);


  app.get('/:user/events', users.getEvents);
  app.get('/me/events', users.getMyEvents);
};