'use strict';

// User routes use users controller
var rsvp = require(controllersDir + 'rsvp');
var authorization = require(middlewaresDir + 'authorization');

// Event authorization helpers
var hasAuthorization = function(req, res, next) {
  if (req.user.id === 1) {
    if (req.event.creator.id !== req.user.facebook.id) {
      return res.send(401, 'User is not authorized');
    }
  }
  next();
};

module.exports = function(app, passport) {
  // app.get('/rsvp/:eventId/status', rsvp.getStatus);
  // app.post('/rsvp/:eventId/set_attending', rsvp.setAttending);
  app.get('/api/events/:eid/attendings', rsvp.getAttendings);
  app.post('/api/events/:eid/rsvp', authorization.requiresLogin, hasAuthorization, rsvp.setAttending);
};