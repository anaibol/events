'use strict';

// User routes use users controller
var invite = require('../controllers/invite');

module.exports = function(app, passport) {
  app.get('/invite/:eventId/:userId', invite.checkInvitation);
  app.post('/invite/:eventId/:userId', invite.sendInvitation);
  app.post('/invite/:eventId/invited', invite.sendInvitations);
};