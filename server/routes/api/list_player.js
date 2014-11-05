'use strict';

// User routes use users controller
var list_player = require(controllersDir + 'list_player');

module.exports = function(app, passport) {
  app.get('/api/list_player/:eid', list_player.findPlayers);
};