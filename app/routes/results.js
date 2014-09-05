'use strict';

// User routes use users controller
var results = require('../controllers/results');

module.exports = function(app, passport) {
  app.get('/api/results/:uids/:eid/result', results.getResult);
};