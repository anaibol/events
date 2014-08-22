var Events = global.db.get('events');

var graph = require('fbgraph');

var accessToken = 'CAAGPsrwaxr4BAIu7rFCcSYYZBoo5apR7NRqId4ZCWTxedks7q6pFUceEZBZCGzTp5wuxJ89QSqB6WO93Pfv8phKTFjkA5s323Lgf3ll5esiXbznFGifhlRUQnkOIPCdCXpX7BQDAZCJCMR9F3TyutCxard4xGlt2r1J1wUsCTeBydIfwcgGbwcguJnkZBJ6kcAivh0aHabdAxGAT3eeDZC8';

exports.getUserStatus = function(req, res) {
  graph.setAccessToken(req.user.accessToken);

  var query = "SELECT rsvp_status, inviter, inviter_type FROM event_member WHERE uid=me() AND eid=" + req.params.eid;

  graph.fql(query, function(err, result) {
    if (err) {
      res.json(err);
    }
    else {
      if (result.data[0]) {
        if (result.data[0].rsvp_status === 'attending') {
          Events.findAndModify({ eid: req.params.eid }, { $addToSet: { attending: req.user.facebook.id}});
        } else {
          Events.findAndModify({ eid: req.params.eid }, { $pull: { attending: req.user.facebook.id}});
        }
      } else {
        Events.findAndModify({ eid: req.params.eid }, { $pull: { attending: req.user.facebook.id}});
      }

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

      // graph.setAccessToken(req.user.accessToken);

      // res.json(result.data[0]);

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