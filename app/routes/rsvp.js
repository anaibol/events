'use strict';

// User routes use users controller
var rsvp = require('../controllers/rsvp');

module.exports = function(app, passport) {
  app.get('/rsvp/:eventId/status', rsvp.getStatus);
  app.post('/rsvp/:eventId/set_attending', rsvp.setAttending);
};