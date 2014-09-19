
var Events = global.db.get('events');

var Rsu = require('../services/results.js');

var Upd = require('../services/update.js');

var Rso = require('../services/resolve.js')

var Ret = require('../services/retrieve.js');

exports.getResults = function(req, res) {

  console.log("Resolve the game for the event with id: " + req.params.eid);

    Upd.updateActions(req.params.eid , function(err) {
      if (err)
        console.log(err)

      console.log("UPDATE DONE");
      Rso.resolveGames(req.params.eid, function(err) {
        if (err)
          console.log(err)
        console.log("RESOLVE DONE");

        Rsu.refreshResultsBoosted(req.params.eid, function (results, err) {
          if (err)
            console.log(err);
          console.log("REFRESH DONE");
          console.log(results);
          res.json(results);
        });
      });
    });

};