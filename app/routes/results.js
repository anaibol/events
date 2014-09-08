'use strict';

// User routes use users controller
var results = require('../controllers/results');

module.exports = function(app, passport) {
  app.get('/api/results/:uid/:eid/result', results.getResult);
  app.get('/api/results/:uids/:eid/results', results.getResults);

  app.post('/api/results/:eid', results.addResult);
  app.post('/api/results/update/:eid/:uid', results.updateResult);
  app.post('/api/results/un_update/:eid/:uid', results.un_updateResult);
};