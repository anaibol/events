var db = require('monk')(global.config.db);

var Pro = require('./promoter.js');

var Results = db.get('results');

function addResult(event_id, user_id, cb) {

	Results.findOne({
		user_id: user_id,
		event_id: event_id
	}, function(err, result) {
		if (err) {
			console.log(err);
			cb(err);
		} else if (!result) {
			console.log("Adding result");

			var result = {
				user_id: user_id,
				event_id: event_id,
				result: 2,
				result_boosted: 2
			}

			Pro.associatePlayer(user_id, event_id);

			Results.insert(result, function(err) {
				if (err)
					console.log(err);
				cb();
			});
		} else {
			Pro.associatePlayer(user_id, event_id);
			cb();
		}
	});

}

function refreshOneResultsBoosted(event_id, result, cb) {

	var Boosts = db.get('boosts');

	var Results = db.get('results');

	Boosts.find({
		son_id: result.user_id,
		event_id: event_id
	}, function(err, boosts) {
		if (err) {
			console.log(err);
			cb(err);
		} else if (boosts) {

			var result_boosted = 0;

			for (j = 0; j < boosts.length; j++) {
				result_boosted += boosts[j].score;
			}

			result_boosted += result.result;

			console.log("Result boosted : " + result_boosted);

			result.result_boosted = result_boosted;

			Results.update({
					_id: result._id
				}, {
					$set: {
						'result_boosted': result_boosted
					}
				},
				function(res, err) {
					if (err) {
						console.log(err);
						cb(err);
					} else
						cb();
				});
		} else
			cb();
	});

}

function refreshResultsBoosted(event_id, cb) {

	Results = db.get('results');

	Boosts = db.get('boosts');

	Results.find({
		'event_id': parseInt(event_id)
	}, function(err, results) {
		if (err) {
			console.log(err);
			cb(err);
		} else if (results) {
			console.log("There is " + results.length + " results");

			var nb_done = 0;

			if (results.length == 0)
				cb(results);

			for (i = 0; i < results.length; i++) {

				exports.refreshOneResultsBoosted(event_id, results[i], function(err) {
					nb_done++;
					if (err)
						console.log(err);
					if (nb_done == results.length)
						cb(results);
				});

			}
		} else {
			console.log("No results for this event")
			cb();
		}
	});
}

module.exports.refreshResultsBoosted = refreshResultsBoosted;
module.exports.refreshOneResultsBoosted = refreshOneResultsBoosted;
module.exports.addResult = addResult;