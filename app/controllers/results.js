var Results = global.db.get('results');

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
    result: 2
  } 

  Results.insert(result, function(err) {
    if (err)
      console.log(err);
    else
      res.json(result);
  });

};

exports.updateResult = function (req, res) {

  console.log("Update result");

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
              Results.update({_id: father_result._id}, 
                {$set: {result: father_result.result + player_result.result}}, 
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
              Results.update({_id: father_result._id}, 
                {$set: {result: father_result.result - player_result.result}}, 
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
