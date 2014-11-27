var events = require(controllersDir + 'my_events');

module.exports = function(app) {
  app.get('/api/my_events', events.getMyEvents);
  app.get('/api/my_events/in_promotion', events.getInPromotion);
};