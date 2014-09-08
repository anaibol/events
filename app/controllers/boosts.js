var Boosts = global.db.get('boosts');

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

  var boost = {
    event_id: req.params.eid,
    father_id: req.user.facebook.id,
    son_id: req.params.uid
  }

  console.log("Add");
  Boosts.insert(boost, function(err) {
                if (err)
                  console.log(err);
                else
                {
                  res.json(boost);
                }
              });
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