
function refreshBoosts(db, result, cb) {

	if (!db)
	{
		console.log("Database is null");
		return ;
	}

	Results = db.get('results');

	Boosts = db.get('boosts');

	Boosts.find({
		father_id: result.user_id,
			event_id: result.event_id
	}, function (err, boosts) {
		if (err) {
			console.log(err);
			cb(err);
		}
		else if (boosts) {

			for (j = 0; j < boosts.length; j++) {
				console.log("Boosts n°:" + j);
				console.log(boosts[j]);
				Boosts.update({_id: boosts[j]._id},
					{$set: {score: result.result}},
						function (err) {
						if (err)
							console.log(err)
					});
				if (j == (boosts.length - 1))
					cb();
			}

		}
		else
			cb();
	});

}

function refreshResults(db, event_id, cb) {

	if (!db)
	{
		console.log("Database is null");
		return ;
	}

	Results = db.get('results');

	Boosts = db.get('boosts');

	Results.find({
		'event_id': event_id
	}, function (err, results) {
		if (err)
		{
			console.log(err)
			cb(err)
		}
		else if (results) {
			console.log("There is " + results.length + " results");
			for (i = 0; i < results.length; i++) {
			console.log("Result n°:" + i);
			console.log(results[i]);

			exports.refreshBoosts(db, results[i], function (err) {
				if (err)
					console.log(err);
			});

			if (i == (results.length - 1))
				cb();
			}
		}
		else
			console.log("No results for this event")
	});
}

function refreshOneResultsBoosted(db, event_id, result, i, cb) {

	if (!db)
	{
		console.log("Database is null");
		cb(i);
	}

	var Boosts = db.get('boosts');

	var Results = db.get('results');

	Boosts.find({
		son_id: result.user_id,
		event_id: event_id
	}, function (err, boosts) {
		if (err) {
			console.log(err);
			cb(i, null, err);
		}
		else if (boosts) {

			var result_boosted = 0;

			for (j = 0; j < boosts.length; j++) {
				result_boosted += boosts[j].score;
			}

			result_boosted += result.result;

			console.log("Result boosted : " + result_boosted);

			Results.update({_id: result._id},
				{$set: {'result_boosted': result_boosted}},
				function (err, res) {
				if (err) {
					console.log(err);
					cb(i, result, err);
				}
				else
					cb(i, result);
			});
		}
		else
			cb(i);
	});

}

function refreshResultsBoosted(db, event_id, cb) {

	if (!db)
	{
		console.log("Database is null");
		cb();
	}

	Results = db.get('results');

	Boosts = db.get('boosts');

	Results.find({
		'event_id': event_id
	}, function (err, results) {
		if (err) {
			console.log(err);
			cb(err);
		}
		else if (results) {
			console.log("There is " + results.length + " results");

			var nb_done = 0;

			for (i = 0; i < results.length; i++) {

			exports.refreshOneResultsBoosted(db, event_id, results[i], i, function(i, result, err) {
				nb_done++;
				results[i].result_boosted = result.result_boosted;
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

module.exports.refreshResults = refreshResults;
module.exports.refreshResultsBoosted = refreshResultsBoosted;
module.exports.refreshOneResultsBoosted = refreshOneResultsBoosted;
module.exports.refreshBoosts = refreshBoosts;