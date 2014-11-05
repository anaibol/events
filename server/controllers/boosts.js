var Boosts = global.db.get('boosts');

var Results = global.db.get('results');

var Game = require('../services/game.js');

exports.supBoost = function(req, res) {

  var boost = {
    event_id: req.params.eid,
    father_id: req.user.facebook.id,
    son_id: req.params.uid
  }

  console.log("Remove");
              Boosts.remove({
                          'event_id': boost.event_id,
                          'father_id': boost.father_id,
                          'son_id': boost.son_id
              }, function (err) {
                if (err)
                  console.log(err);
                res.json(boost);
              });

}

exports.addBoost = function(req, res) {

  score = 2;

  console.log("Add");

  console.log(req.user.facebook.id);
  console.log(req.params.eid);

  Results.findOne({
    user_id: req.user.facebook.id,
    event_id: req.params.eid
  }, function (err, result) {
    if (err)
      console.log('err');

    if (result) {
    console.log(result);

      var boost = {
        event_id: req.params.eid,
        father_id: req.user.facebook.id,
        son_id: req.params.uid,
        score: result.result,
        old:0,
      }
      Boosts.insert(boost,function(err, boost) {
          if (err)
            console.log(err);
          res.json(boost);
      });
    }
    else
      res.json(null);

  })

};

exports.getBoost = function(req, res) {

  Boosts.findOne({
      event_id: req.params.eid,
      father_id: req.user.facebook.id
    }, function(err, boost) {
                if (err)
                  console.log(err);
                else if (boost)
                  res.json(boost);
    });
};

exports.updateBoosts = function (req, res) {

  console.log("Update boosts / Resolution");

  Results.findOne(
    {'user_id': req.params.uid,
     'event_id': req.params.eid
    }, function(err, player_result) {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else if (player_result)
    {
        Boosts.find(
          {'son_id': req.params.uid,
           'event_id': req.params.eid
          }, function(err, father_boosts) {
          if (err) {
            res.render('error', {
              status: 500
            });
          } else if (father_boosts)
          {
            console.log("There is boosts here");

            for (i = 0; i < father_boosts.length; i++) {
              console.log("Boost n°" + i);
              console.log(father_boosts[i]);

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
                    console.log("Update");
                    if (boost.old > 0)
                    {
                      Game.AddPoints(boost.son_id, req.params.eid, boost.old * -1);
                    }
                    Boosts.update({_id: boost._id},
                      {$set: {old: Math.max(boost.score, score), score: Math.max(boost.score, score)}},
                      function(err, result) {
                      if (err) {
                        console.log(err);
                      }
                      Game.AddPoints(boost.son_id, req.params.eid, Math.max(boost.score, score));
                      //res.json(result);
                    });
                  }
                  else
                  {
                    console.log('Insert new boosts');

                    var new_boost = {
                      event_id: req.params.eid,
                      father_id: father_id,
                      son_id: req.params.uid,
                      score: score
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
    }
    else
      res.json(player_result);
  });

};