'use strict';

/**
 * Module dependencies.
 */
var express = require('express');
var passport = require('passport');

global.rootDir = __dirname + '/';
global.publicDir = rootDir + '../client/public/';
global.distDir = rootDir + '../client/dist/';
global.configDir = rootDir + 'config';
global.routesDir = rootDir + 'routes/';
global.middlewaresDir = routesDir + 'middlewares/';
global.viewsDir = rootDir + '../client/views/';
global.controllersDir = rootDir + 'controllers/';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Initializing system variables 
global.config = require(configDir + '/env/' + process.env.NODE_ENV + '.js');

var app = express();

global.db = require('monk')(config.db);
global.Ev = require('./ev');
global.keywords = require('./keywords.json').keywords;

// Bootstrap passport config
require('./config/passport')(passport);

// Express settings
require('./config/express')(app, passport, config.db);

// Start the app by listening on <port>
var port = process.env.PORT || config.port;

app.listen(port);

console.log('Express app started on port ' + port);

// Expose app
exports = module.exports = app;