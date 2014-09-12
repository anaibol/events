process.env['NODE_ENV'] = 'production';

var config = require('../config/config');

var db = require('monk')(config.db);

var Pho = require('../app/services/photos.js');

Pho.searchPhotoEvents(db);