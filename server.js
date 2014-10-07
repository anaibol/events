'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
  fs = require('fs'),
  passport = require('passport');
/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Load configurations
// Set the node enviornment variable if not set before
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Initializing system variables 
var config = require('./config/config');

var app = express();

global.db = require('monk')(config.db);
global.Ev = require('./ev');

global.rootDir = __dirname + '/app/';
global.publicDir = __dirname + '/public/';
global.routesDir = rootDir + 'routes/';
global.middlewaresDir = routesDir + 'middlewares/';
global.viewsDir = rootDir + 'views/';
global.controllersDir = rootDir + 'controllers/';

global.assetsDir = rootDir + 'assets/';

// Bootstrap passport config
require('./config/passport')(passport);

// Express settings
require('./config/express')(app, passport, config.db);

// Bootstrap routes
var walk = function(path) {
  fs.readdirSync(path).forEach(function(file) {
    var newPath = path + '/' + file;
    var stat = fs.statSync(newPath);
    if (stat.isFile()) {
      if (/(.*)\.(js$|coffee$)/.test(file)) {
        require(newPath)(app, passport, db);
      }
      // We skip the app/routes/middlewares directory as it is meant to be
      // used and shared by routes as further middlewares and is not a 
      // route by itself
    } else if (stat.isDirectory() && file !== 'middlewares') {
      walk(newPath);
    }
  });
};
walk(routesDir);

// app.get('partials/:name', function(req, res) {
//   res.send(1);
//   // res.render('partials/' + req.params.name);
// });

// app.get('/', function(req, res) {
//   res.render('index', {
//     title: 'Wooepa',
//     user: req.user ? JSON.stringify(req.user) : 'null',
//     fbAppId: global.fbAppId,
//     //events: events,
//     //pos: pos
//   });
// });

// Start the app by listening on <port>
var port = process.env.PORT || config.port;

app.listen(port);

console.log('Express app started on port ' + port);

// Expose app
exports = module.exports = app;