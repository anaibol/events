var Events = global.db.get('events');
var Ev = require('../../ev');

var graph = require('fbgraph');

var accessToken = 'CAAGPsrwaxr4BAIu7rFCcSYYZBoo5apR7NRqId4ZCWTxedks7q6pFUceEZBZCGzTp5wuxJ89QSqB6WO93Pfv8phKTFjkA5s323Lgf3ll5esiXbznFGifhlRUQnkOIPCdCXpX7BQDAZCJCMR9F3TyutCxard4xGlt2r1J1wUsCTeBydIfwcgGbwcguJnkZBJ6kcAivh0aHabdAxGAT3eeDZC8';

graph.setAccessToken(accessToken);

exports.getAttendings = function(req, res) {
  Ev.updateAttendings(req.params.eid, function(attendings) {
    res.json(attendings);
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
  graph.setAccessToken(req.user.accessToken);

  graph.post('/' + req.params.eid + '/' + req.body.attendingStatus + '?access_token=' + accessToken, function(err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);

      var query = "SELECT uid FROM event_member WHERE rsvp_status = 'attending' AND eid=" + req.params.eid + " LIMIT 50000";

      graph.fql(query, function(err, result) {
        if (err) {
          console.log(err);
        }
        else {
          attendings = [];

          for (var i = result.data.length - 1; i >= 0; i--) {
            attendings.push(parseInt(result.data[i].uid));
          };

          Events.update({ eid: parseInt(req.params.eid) }, { $set: { 'attending': attendings }});
        }
      });

      // if (req.body.attendingStatus === 'attending') {
      //   Events.update({ eid: parseInt(req.params.eid) }, { $addToSet: { attending: parseInt(req.user.facebook.id)}});
      // } else {
      //   Events.update({ eid: req.params.eid }, { $pull: { attending: parseInt(req.user.facebook.id)}});
      // }
    }
  });
};