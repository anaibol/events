var Results = global.db.get('results');

var Boosts = global.db.get('boosts');

exports.getResults = function(req, res) {

  Results.find(
  	{'user_id': { $in: req.params.uids.split(',') },
  	 'event_id': req.params.eid
  	}, function(err, data) {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      res.json(data);
    }
  });
};

exports.getResult = function(req, res) {

  console.log("Getting result");

  Results.findOne(
    {'user_id': req.params.uid,
     'event_id': req.params.eid
    }, function(err, data) {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      res.json(data);
    }
  });
};

exports.addResult = function (req, res) {

  console.log("Adding result");

  if (!req.params.eid)
    return ;

  console.log(req.params.eid);

  var result = {
    user_id: req.user.facebook.id,
    event_id: req.params.eid,
    result: 2,
    result_boosted: 2
  } 

  Results.insert(result, function(err) {
    if (err)
      console.log(err);
    else
      res.json(result);
  });

};

exports.updateResult = function (req, res) {

  console.log("UPDATE result / Resolution");

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
          }, function(err, son_boosts) {
          if (err) {
            res.render('error', {
              status: 500
            });
          } else if (son_boosts)
          {
            console.log("There is boosts here");

            var result_boosted = 0;

            for (i = 0; i < son_boosts.length; i++) {
              result_boosted += son_boosts[i].score;
            }

            Results.update({_id: player_result._id},
              {$set: {result_boosted: player_result.result + result_boosted}}
              , function (err, result) {
                if (err)
                  console.log(err)
              })
            res.json({'result_boosted' : player_result.result + result_boosted});
          }
          else
            res.json(son_boosts);
        });
    }
    else
      res.json(player_result);
  });

}

exports.un_updateResult = function (req, res) {

  console.log("Un-Update result");

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
        Results.findOne(
          {'user_id': req.user.facebook.id,
           'event_id': req.params.eid
          }, function(err, father_result) {
          if (err) {
            res.render('error', {
              status: 500
            });
          } else if (father_result)
          {
              Results.update({_id: player_result._id}, 
                {$set: {result_boosted: player_result.result_boosted - father_result.result}}, 
                function(err, result) {
                if (err) {
                  console.log(err);
                }
                res.json(result);
              });
          }
          else
            res.json(father_result);
        });
    }
    else
      res.json(player_result);
  });

};
