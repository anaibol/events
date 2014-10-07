var boosts = require(controllersDir + 'boosts');

module.exports = function(app, passport) {
	app.post('/api/boost/:eid/:uid', boosts.addBoost);
	app.post('/api/boost/:eid/:uid/sup', boosts.supBoost);
	app.get('/api/boost/:eid/boost', boosts.getBoost);
	app.post('/api/boost/update/:eid/:uid', boosts.updateBoosts);
};