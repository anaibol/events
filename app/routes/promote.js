var promote = require('../controllers/promoter.js');

module.exports = function(app, passport) {
  app.post('/api/promote/:eid', promote.associatePromoter);
};