// User routes use users controller
var invite = require(controllersDir + 'invite');

module.exports = function(app, passport) {
	app.post('/api/invite', invite.sendInvitations);
};