var express = require('express');
var passport = require('passport');

var fs = require('fs');
var http = require('http');
var https = require('https');

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

var port = process.env.PORT || config.port;

var privateKey  = fs.readFileSync(rootDir + 'wooepa-key.pem', 'utf8');
var certificate = fs.readFileSync(rootDir + 'wooepa-crt.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(port);
httpsServer.listen(443);

console.log('Express app started on port ' + port);

// Expose app
exports = module.exports = app;






