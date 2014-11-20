var Events = db.get('events');
var Ev = require('../ev');
var Game = require('../services/game.js');
var graph = require('fbgraph');
var Results = db.get('results');
var Users = global.db.get('users');

exports.findPlayers = function(req, res) {
  var i = 0;
  var list = [];
  Results.find({
    event_id: req.params.eid
  }, function(err, rest) {
    if (err)
      console.log(err);
    if (rest) {

      while (rest[i]) {
        if (rest[i].result > 0) {
          var obj = {
            uid: 0,
            result: 0,
            name:""
          };
          obj.uid = parseInt(rest[i].user_id);
          obj.result = parseInt(rest[i].result_boosted);
          obj.name = rest[i].name;
          list.push(obj);
        }
        ++i;
      }
      res.json(list);
    }
  });
}

//exports.findPlayers = findPlayers;