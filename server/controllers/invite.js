var graph = require('fbgraph');

exports.checkInvitation = function(req, res) {
  graph.get('/invite/' + req.params.eid + '/invited/' + req.params.uid + '?access_token=' + req.user.accessToken, function(err, result) {
    res.json(result.data);
  });
};

exports.sendInvitation = function(req, res) {
  graph.post('/' + req.params.eid + '/invited/' + req.params.uid + '?access_token=' + req.user.accessToken, function(err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
};

exports.sendInvitations = function(req, res) {
  graph.post('/' + req.params.eid + '/invited/' + req.body.uids + '?access_token=' + req.user.accessToken, function(err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
};