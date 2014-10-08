module.exports = function(app) {
	app.get('*', function(req, res) {
		res.render('index', {
			title: 'Wooepa',
			user: req.user ? JSON.stringify(req.user) : 'null',
			fbAppId: global.fbAppId,
			//events: events,
			//pos: pos
		});
	});
}