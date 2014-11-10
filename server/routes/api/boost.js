var boosts = require(controllersDir + 'boosts');

module.exports = function(app, passport) {
	app.post('/api/boost/:eid/:uid', boosts.addBoost);
	app.post('/api/boost/update/:eid/:uid', boosts.updateBoosts);
};