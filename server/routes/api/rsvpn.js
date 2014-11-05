'use strict';

// User routes use users controller
var rsvp = require(controllersDir + 'rsvp');
var rsvpn = require(controllersDir + 'rsvpn');
var authorization = require(middlewaresDir + 'authorization');
var hasAuthorization = function(req, res, next) {
  if (req.user.id === 1) {
    if (req.event.creator.id !== req.user.facebook.id) {
      return res.send(401, 'User is not authorized');
    }
  }
  next();
};

module.exports = function(app, passport) {
app.post('/api/rsvpn/:eid/rsvpn', authorization.requiresLogin, hasAuthorization, rsvpn.setNotAttending);
};