var promote = require(controllersDir + 'promoter.js');

module.exports = function(app, passport) {
	app.post('/api/promote/:eid', promote.associatePromoter);
};