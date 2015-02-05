var Events = global.db.get('events');
var Ev = require('../ev');
var Game = require('../services/game.js');
var graph = require('fbgraph');
var Results = db.get('results');

exports.getAttendings = function(req, res) {
  Ev.updateAttendings(req.params.eid, function(attendings) {
    // console.log(">>" + attendings + "<<");
    res.json(attendings);
  });
};

exports.getUserAttendings = function(req, res) {
  graph.get('/me/events?access_token=' + req.user.accessToken, function(err, result) {
    res.json(result.data);
  });
};

exports.getEventAttendings = function(req, res) {
  graph.setAccessToken(req.user.accessToken);

  graph.post('/' + req.params.eid + '/' + req.body.attendingStatus, function(err, result) {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

exports.setAttending = function(req, res) {
  graph.setAccessToken(req.user.accessToken);
  graph.post('/' + req.params.eid + '/' + 'attending', function(err, result) {
    req.body.attendingStatus = 'attending';
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
       if (req.body.attendingStatus === 'attending') {
        Results.findOne({user_id:req.user.facebook.id,event_id:req.params.eid},function(err,results){
      if (!results)
      {
        Results.insert({user_id:req.user.facebook.id,event_id:req.params.eid,name:req.user.facebook.name, result:0, result_boosted:0, score:0, join:0, share:0});
      }
      Game.AddPoints(req.user.facebook.id, req.params.eid, 6, 'join');
});
         Events.update({ eid: parseInt(req.params.eid) }, { $addToSet: { attending: parseInt(req.user.facebook.id)}});
       } else {
         Events.update({ eid: req.params.eid }, { $pull: { attending: parseInt(req.user.facebook.id)}});
       }
    }
  });
};