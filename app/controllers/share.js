var graph = require('fbgraph');

var Events = global.db.get('events');

var Ev = require('../../ev.js');

var accessToken = 'CAAVebA5FD2cBAL0wIBbThOs7HwJMJSG4TiCZCszGNQaYxHSZCtmPmloOR1VJefME7zh6w7KD5dwHmdKRsMXxzkOhKrctHOAcGj66zJQtazZCn6IhZCq3dHwQpPf40EgkZAx6rfxfGZA7AeB6C1D6veQMesY4eTZCZCbCuX45LBruF0ZCoJ184nomzAl7rrzldmk3WlJPKHgWg85eHwf6PZCoZCqF0KkHW81PNcZD';

exports.share = function(req, res)
{
  graph.setAccessToken(accessToken);
  console.log("Facebook publishing");
  console.log("Event id:");
  console.log(req.params.eid);
  Ev.findById(req.params.eid, function(ev) {
    if (ev)
      console.log("Something");
    else
      console.log("Nothing");
    res.json(ev);
  });

  /*var wallPost = {
    message: "Je vais à l'événement " + "https://www.facebook.com/events/" + req.params.eid + "/\n"
    + "Trouvé sur Wooepa.com"
  };
  
    graph.post('/' + req.user.facebook.id + '/feed' + '?access_token=' + accessToken, wallPost, function(err, result) {
      if (err) {
        console.log(err);
      }
      else {
        console.log(result);
      }
    });*/
};


