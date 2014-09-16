process.env['NODE_ENV'] = 'development';

var config = require('../config/config');

var db = require('monk')(config.db);

var Rsu = require('../app/services/results.js');

var Upd = require('../app/services/update.js');

var Rso = require('../app/services/resolve.js')

var Ret = require('../app/services/retrieve.js');

Ret.retrieveForEvent(db, '772837492738201', function(err) {
	if (err)
		console.log(err);
	console.log("RETRIEVE DONE");
	Upd.updateActions(db, '772837492738201' , function(err) {
		if (err)
			console.log(err)

		console.log("UPDATE DONE");
		Rso.resolveGames(db, '772837492738201', function(err) {
			if (err)
				console.log(err)
			console.log("RESOLVE DONE");

			Rsu.refreshResultsBoosted(db, '772837492738201', function (err) {
				if (err)
					console.log(err);
				console.log("REFRESH DONE");
			});
		});
	});
});