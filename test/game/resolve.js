process.env['NODE_ENV'] = 'development';

var config = require('../../config/config');

var db = require('monk')(config.db);

var Res = require('../../app/services/resolve.js');

Res.resolveGames(db, '187848574716656');