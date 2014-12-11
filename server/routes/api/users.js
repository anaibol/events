var users = require(controllersDir + 'users');

module.exports = function(app, passport) {
  app.get('/auth/signin', users.signin);
  app.get('/auth/signup', users.signup);
  app.get('/auth/signout', users.signout);

  app.get('/auth/facebook', function(req, res, next) {
    req.session.redirectUrl = req.query.redirectUrl;
    next();
  }, passport.authenticate('facebook-canvas', {
    scope: ['email', 'user_about_me', 'create_event', 'rsvp_event', 'user_events', 'user_interests'],
    failureRedirect: '/signin'
  }));

  app.get('/auth/facebook/callback', passport.authenticate('facebook-canvas', {
    failureRedirect: '/signin'
  }), users.authCallback);

  app.get('/:user/events', users.getEvents);
  app.get('/api/me/events', users.getMyEvents);
  app.get('/api/user/:uid', users.getOne);
  app.get('/api/users/:uids/info', users.getInfo);
  app.get('/api/users/:uid/picture', users.getPicture);
};