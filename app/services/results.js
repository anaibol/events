var config = require('../../config/config');

var db = require('monk')(config.db);

function refreshOneResultsBoosted(event_id, result, cb) {

	var Boosts = db.get('boosts');

	var Results = db.get('results');

	Boosts.find({
		son_id: result.user_id,
		event_id: event_id
	}, function (err, boosts) {
		if (err) {
			console.log(err);
			cb(err);
		}
		else if (boosts) {

			var result_boosted = 0;

			for (j = 0; j < boosts.length; j++) {
				result_boosted += boosts[j].score;
			}

			result_boosted += result.result;

			console.log("Result boosted : " + result_boosted);

			result.result_boosted = result_boosted;

			Results.update({_id: result._id},
				{$set: {'result_boosted': result_boosted}},
				function (res, err) {
				if (err) {
					console.log(err);
					cb(err);
				}
				else
					cb();
			});
		}
		else
			cb();
	});

}

function refreshResultsBoosted(event_id, cb) {

	Results = db.get('results');

	Boosts = db.get('boosts');

	Results.find({
		'event_id': parseInt(event_id)
	}, function (err, results) {
		if (err) {
			console.log(err);
			cb(err);
		}
		else if (results) {
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
		}
		else {
			console.log("No results for this event")
			cb();
		}
	});
}

module.exports.refreshResultsBoosted = refreshResultsBoosted;
module.exports.refreshOneResultsBoosted = refreshOneResultsBoosted;