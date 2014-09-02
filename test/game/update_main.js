process.env['NODE_ENV'] = 'development';

var config = require('../../config/config');

var db = require('monk')(config.db);

var Upd = require('../../app/services/update.js');

Upd.updateActions('187848574716656', db);