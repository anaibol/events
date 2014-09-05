var boosts = require('../controllers/boosts');

module.exports = function(app, passport) {
  app.get('/api/boost/:eid/:uid', boosts.addBoost);
  app.post('/api/boost/:eid/:uid', boosts.addBoost);

  app.get('/api/boost/:eid/:uid/sup', boosts.supBoost);
  app.post('/api/boost/:eid/:uid/sup', boosts.supBoost);
};