var graph = require('fbgraph');

var accessToken = 'CAAGPsrwaxr4BAPKJSNN5m7L2vHx1XKNfOBdIA6jAoYBZCj8Y3C3mZBxCSlJRzZAffOJgQjbcsfYOalNWAwi9rkpFghWiesRLi0klrlyvC02iEqj3xHO4WfMmPB4SB3buVaEaJOzljE1AehVtA0MTj93sRc8BMRAJLebZBy1GTeIOK3K2Lp38ZBJUBKZCVZAoRlPus4wwl4dlF72sJtIvLf47WShxBK8xEgZD';

exports.checkInvitation = function(req, res) {
  graph.get('/invite/' + req.params.eventId + '/invited/' + req.params.userId + '?access_token=' + accessToken, function(err, result) {
    res.json(result.data);
  });
};

exports.sendInvitation = function(req, res) {
  graph.post('/' + req.params.eventId + '/invited/' + req.params.userId + '?access_token=' + accessToken, function(err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
};


exports.sendInvitations = function(req, res) {
  graph.post('/' + req.params.eventId + '/invited/' + req.body.usersIds + '?access_token=' + accessToken, function(err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
};