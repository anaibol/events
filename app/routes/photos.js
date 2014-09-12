var photos = require('../controllers/photos');

module.exports = function(app, passport) {
  app.get('/api/photos/:eid', photos.addPhotos);
};