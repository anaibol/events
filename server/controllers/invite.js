var graph = require('fbgraph');
var Inv = require('../services/game.js');

var db = require('monk')(config.db);

var Invitations = db.get('invitations');

exports.sendInvitations = function(req, res) {
 graph.post('/' + req.params.eid + '/invited/' + req.params.uids + '?access_token=' + req.user.accessToken, function(err, result) {
    if (err) {
      res.json(err);
    }
    else {
    if (req.user) {

      var invitation = {
        to: req.body.uids,
        eid: req.body.eid,
        requestId: req.body.requestId,
        url: req.body.url
      };

      if (req.user) {
        invitation.from = req.user.facebook.id;

        Inv.giveInvitePoints(req.body.eid, req.user.facebook.id, req.body.uids);
      }

      Invitations.insert(invitation);

      res.json();
    }
    }
  });
};