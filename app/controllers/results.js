var Results = global.db.get('results');

exports.getResult = function(req, res) {

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