'use strict';

// User routes use users controller
var share = require(controllersDir + 'share');

module.exports = function(app, passport) {
//	app.get('/api/share/:eid', share.share);
	app.post('/api/share/:eid', share.share);
};