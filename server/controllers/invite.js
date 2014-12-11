var graph = require('fbgraph');
var Inv = require('../services/game.js');

exports.sendInvitations = function(req, res) {
 // graph.post('/' + req.params.eid + '/invited/' + req.params.uids + '?access_token=' + req.user.accessToken, function(err, result) {
 //    if (err) {
 //      res.json(err);
 //    }
 //    else {
    if (req.user) {
      Inv.giveInvitePoints(req.params.eid, req.user.facebook.id, req.params.uids);
      res.json(result);
    }
  //   }
  // });
};