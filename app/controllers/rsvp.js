var graph = require('fbgraph');

var accessToken = 'CAAGPsrwaxr4BAM9XZCGiPWM6xyI6wZCg336mWD2wnVjPnBWmZAfFGxOb1rTKKwVxgSkZAuHDL0kPsnMeZBCnXYT6C72P07w11e16tELtOcuBl7exmYbRgz578m6ddKYux4W4S2vXVOKqiEidwK2g01Pua0LekoOxYLn997Q3tV8MwcA4LaTTzS8ku9idpvvQNBI8vIHwM4vxtHwS9p2fFGpE5ncR2ZAfUZD';

exports.getStatus = function(req, res) {
  graph.get('/me/events?access_token=' + accessToken, function(err, result) {
    res.json(result.data);
  });
};

exports.setAttending = function(req, res) {
  graph.post('/' + req.params.eventId + '/' + req.body.rsvp + '?access_token=' + accessToken, function(err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result.data);
    }
  });
};