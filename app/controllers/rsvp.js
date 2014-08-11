var graph = require('fbgraph');

var accessToken = 'CAAGPsrwaxr4BAJeLRPDmSmvGdDZBRbs5kmpyge2XZBZBvbLpy36rPCY4uA0nTVu4O1STnUMWpv9UKpoA9YzwJyT9RYROZA0oVvtxPlzEaWuYZAahfC2vEbB6wIEQOZCPPGF8iUPlzQiqrQ7Pzj9bzgFoUfDbWqFF8uO8NrOFE6CaPbMSkZBOM65vBGTWs4sGnNAI3qnHK1YghqCull98SFH';

exports.getStatus = function(req, res) {
  graph.get('/me/events?access_token=' + req.user.accessToken, function(err, result) {
    res.json(result.data);
  });
};

exports.setAttending = function(req, res) {
  graph.post('/' + req.params.eventId + '/' + req.body.attendingStatus + '?access_token=' + req.user.accessToken, function(err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
};