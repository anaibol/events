var graph = require('fbgraph');
var Inv = require('../services/game.js');
var Mail = require('../services/mail.js');
var db = require('monk')(config.db);

var Invitations = db.get('invitations');

exports.sendInvitations = function(req, res) {
 graph.post('/' + req.body.eid + '/invited/' + req.body.uids + '?access_token=' + req.user.accessToken, function(err, result) {
      var invitation = {
        to: req.body.uids,
        eid: req.body.eid,
        requestId: req.body.requestId,
        url: req.body.url,
      };
      if (req.user) {
        invitation.from = req.user.facebook.id;
        Mail.inviteMail(req.user.facebook.id, invitation.to, invitation.url, invitation.eid);
        Inv.giveInvitePoints(req.body.eid, req.user.facebook.id, req.body.uids);
      }

      Invitations.insert(invitation);

      res.send(true);
     
  });
};