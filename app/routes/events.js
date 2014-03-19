'use strict';

// Events routes use events controller
var events = require('../controllers/events');
var authorization = require('./middlewares/authorization');

// Event authorization helpers
var hasAuthorization = function(req, res, next) {
  if (req.user.id === 1) {
    if (req.event.creator.id !== req.user.facebook.id) {
      return res.send(401, 'User is not authorized');
    }
  }
  next();
};

module.exports = function(app) {
  app.get('/events', events.all);
  app.get('/events/now', events.fromNow);
  app.post('/events/find', events.find);
  app.post('/api/events', authorization.requiresLogin, events.create);
  app.post('/api/events/:eventId', authorization.requiresLogin, hasAuthorization, events.update);  
  
  app.get('/events/:eventId', events.show);
  //app.put('/events/:eventId', authorization.requiresLogin, hasAuthorization, events.update);
  app.del('/events/:eventId', authorization.requiresLogin, hasAuthorization, events.destroy);
  //app.get('/:eventSlug', events.all);
  // Finish with setting up the eventId param
  //app.param('eventId', events.event);

};