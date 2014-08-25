var Events = global.db.get('events');

var graph = require('fbgraph');

var accessToken = 'CAAGPsrwaxr4BAJ9QEELYsQoe5HWnJqlJWaIQ1mbiMTW6iUpsrQQopjSymZC6o1k77H0eAuyKjcFy3ei9NfBbnbMkngX1qrIUMdj3jmZA6jFNIiGFdffzagfy7Mf1p9ZCrGBFiF0hRcQGkDL9reQUNKaJZCN76p4m66igZA5OotLTdqTW2WVflkAZBscJ5KPQ2ebTm9wdnlc5BWcyPriz9a0iDmJkxHXDIZD';

exports.getUserStatus = function(req, res) {
  graph.setAccessToken(accessToken);

  var query = "SELECT rsvp_status, inviter, inviter_type FROM event_member WHERE uid=me() AND eid=" + req.params.eid;

  graph.fql(query, function(err, result) {
    if (err) {
      res.json(err);
    }
    else {
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

          Events.update({ eid: parseInt(req.params.eid) }, {$set: {'attending': attendings}});
        }
      });

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