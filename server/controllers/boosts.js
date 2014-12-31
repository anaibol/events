var Boosts = global.db.get('boosts');

var Results = global.db.get('results');

var Game = require('../services/game.js');


exports.addBoost = function(req, res) {
  if (parseInt(req.user.facebook.id) == parseInt(req.params.uid))
  {
      res.json(null);
      return (-1);
  }
  Results.findOne({
    user_id: req.user.facebook.id,
    event_id: req.params.eid
  }, function (err, result) {
    if (err)
      console.log(err);

    if (result) {
      var boost = {
        event_id: req.params.eid,
        father_id: req.user.facebook.id,
        son_id: req.params.uid,
        score: result.result,
        name: req.user.facebook.name
      }
    Boosts.findOne({event_id : req.params.eid, father_id: req.user.facebook.id, son_id: req.params.uid}, function(err, first_boost){
      if (first_boost)
      {
        Game.AddPointsBoost(req.params.uid, req.params.eid, Math.max(first_boost.score, boost.score) - first_boost.score);
        Boosts.update(boost, function(err, boost) {
          if (err)
            console.log(err);
      });
      }
      else
      {
        Game.AddPointsBoost(req.params.uid, req.params.eid, boost.score);
        Boosts.insert(boost, function(err, boost) {
          if (err)
            console.log(err);
        
        });
      }
});
    }
    else
      res.json(null);

  });

};

exports.updateBoosts = function (req, res) {

 Boosts.find(
          {'son_id': req.user.facebook.id,
           'event_id': req.params.eid
          }, function(err, father_boosts) {
          if (err) {
            res.render('error', {
              status: 500
            });
          } else if (father_boosts)
          {
            for (i = 0; i < father_boosts.length; i++) {

              var father_id = father_boosts[i].father_id;

              var score = father_boosts[i].score;

              Boosts.findOne({
                'father_id': father_boosts[i].father_id,
                'son_id' : req.params.uid,
                'event_id': req.params.eid
              }, function (err, boost) {
                  if (err)
                    console.log(err)
                  else if (boost) {
                    Boosts.update({_id: boost._id},
                      {$set: {score: Math.max(boost.score, score)}},
                      function(err, result) {
                      if (err) {
                        console.log(err);
                      }
                      Game.AddPointsBoost(boost.son_id, req.params.eid, Math.max(boost.score, score) - boost.score);
                    });
                  }
                  else
                  {
                    var new_boost = {
                      event_id: req.params.eid,
                      father_id: father_id,
                      son_id: req.params.uid,
                      score: score,
                      name: req.user.facebook.name
                    }
                    Boosts.insert(new_boost, function (err) {
                      if (err)
                        console.log(err);
                    });

                  }

              });
              
            }
            res.json({'message': 'done'});
          }
          else
            res.json(father_boosts);
        });

};