var Events = global.db.get('events');
var Ev = require('../ev');
var Game = require('../services/game.js')
var graph = require('fbgraph');

exports.setNotAttending = function(req, res) {
  graph.setAccessToken(req.user.accessToken);
  graph.post('/' + req.params.eid + '/' + 'declined',  function(err, result) {
  	req.body.attendingStatus = 'declined';
    if (err) {
      res.json(err);
    } else {
      res.json(result);

      var query = "SELECT uid FROM event_member WHERE rsvp_status = 'attending' AND eid=" + req.params.eid + " LIMIT 50000";

      graph.fql(query, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          attendings = [];

          for (var i = result.data.length - 1; i >= 0; i--) {
            attendings.push(parseInt(result.data[i].uid));
          };

          Events.update({
            eid: parseInt(req.params.eid)
          }, {
            $set: {
              'attending': attendings
            }
          });
        }
      });
      Game.AddPoints(req.user.facebook.id, req.params.eid, -6);
       if (req.body.attendingStatus === 'attending') {
         Events.update({ eid: parseInt(req.params.eid) }, { $addToSet: { attending: parseInt(req.user.facebook.id)}});
       } else {
         Events.update({ eid: req.params.eid }, { $pull: { attending: parseInt(req.user.facebook.id)}});
       }
    }
  });
};