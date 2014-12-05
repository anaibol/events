var events = require(controllersDir + 'my_events');

module.exports = function(app) {
  app.get('/api/me/events/:uid', events.getMyEvents);
  app.get('/api/my_events/in_promotion', events.getInPromotion);
};