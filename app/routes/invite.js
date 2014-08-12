'use strict';

// User routes use users controller
var invite = require('../controllers/invite');

module.exports = function(app, passport) {
  app.get('/api/invite/:eid/:uid', invite.checkInvitation);
  app.post('/api/invite/:eid/:uid', invite.sendInvitation);
  app.post('/api/invite/:eid/:uids', invite.sendInvitations);
};