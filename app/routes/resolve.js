var resolve = require('../controllers/resolve');

module.exports = function(app, passport) {
  app.get('/api/resolve/:eid/results', resolve.getResults);
};