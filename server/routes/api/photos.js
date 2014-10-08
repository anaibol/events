var photos = require(controllersDir + 'photos');

module.exports = function(app, passport) {
	app.get('/api/photos/:eid', photos.addPhotos);
};