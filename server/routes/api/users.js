// User routes use users controller
var users = require(controllersDir + 'users');

module.exports = function(app, passport) {
  app.get('/auth/signin', users.signin);
  app.get('/auth/signup', users.signup);
  app.get('/auth/signout', users.signout);
  app.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['read_stream', 'publish_actions', 'email', 'user_about_me', 'user_photos', 'create_event', 'rsvp_event', 'user_events', 'user_location', 'user_interests'],
    failureRedirect: '/signin'
  }), users.signin);

  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/signin'
  }), users.authCallback);

  app.get('/:user/events', users.getEvents);
  app.get('/me/events', users.getMyEvents);
  app.get('/api/user/:uid', users.getOne);
  app.get('/api/users/:uids/info', users.getInfo);
  app.get('/api/users/:uid/picture', users.getPicture)
};