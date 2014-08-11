var graph = require('fbgraph');

var accessToken = 'CAAGPsrwaxr4BAJeLRPDmSmvGdDZBRbs5kmpyge2XZBZBvbLpy36rPCY4uA0nTVu4O1STnUMWpv9UKpoA9YzwJyT9RYROZA0oVvtxPlzEaWuYZAahfC2vEbB6wIEQOZCPPGF8iUPlzQiqrQ7Pzj9bzgFoUfDbWqFF8uO8NrOFE6CaPbMSkZBOM65vBGTWs4sGnNAI3qnHK1YghqCull98SFH';

exports.getUserStatus = function(req, res) {
  graph.setAccessToken(req.user.accessToken);

  var query = "SELECT rsvp_status, inviter, inviter_type FROM event_member WHERE uid=me() AND eid=" + req.params.eid;

  graph.fql(query, function(err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result.data[0]);
    }
  });
};

exports.getUserAttendings = function(req, res) {
  graph.get('/me/events?access_token=' + req.user.accessToken, function(err, result) {
    res.json(result.data);
  });
};

exports.getEventAttendings = function(req, res) {
  graph.post('/' + req.params.eid + '/' + req.body.attendingStatus + '?access_token=' + req.user.accessToken, function(err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
};

exports.setAttending = function(req, res) {
  graph.post('/' + req.params.eid + '/' + req.body.attendingStatus + '?access_token=' + req.user.accessToken, function(err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
};