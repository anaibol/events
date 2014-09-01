process.env['NODE_ENV'] = 'development';

var config = require('../../config/config');

var db = require('monk')(config.db);

var Re = require('../../app/services/retrieve.js');

Re.retrieveActions('712769105', db);