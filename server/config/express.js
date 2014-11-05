'use strict';

var express = require('express');
var session = require('express-session');
var helpers = require('view-helpers');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var compression = require('compression');
var methodOverride = require('method-override');
var favicon = require('serve-favicon');
var MongoStore = require('connect-mongo')({
  session: session
});
var flash = require('connect-flash');

var mobile = require('detectmobilebrowsers');

var db = require('monk')(global.config.db);

var Events = db.get('events');

var url = require('url');

var env = process.env.NODE_ENV || 'development';

var fs = require('fs');

module.exports = function(app, passport, db) {
  if (env === 'development') {
    app.use(morgan('dev'));
    app.locals.pretty = true;
    app.set('dumpExceptions', true);
    app.set('showStackError', true);
    // app.use(express.logger('dev'));
  }

  app.use(compression({
    filter: function(req, res) {
      return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
    },
    level: 9
  }));

  // Set views path, template engine and default layout
  app.set('views', viewsDir);
  app.set('view engine', 'jade');

  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(bodyParser.json());

  app.use(cookieParser());

  app.use(methodOverride());

  // Express/Mongo session storage
  app.use(session({
    secret: 'aguantepantera',
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({
      url: global.config.db,
      auto_reconnect: true
    })
  }));

  // Use passport session
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(helpers(global.config.app.name));

  app.use(flash());

  app.use(favicon(publicDir + 'favicon.ico'));

  app.use(serveStatic(publicDir));
  app.use(serveStatic(distDir));

  app.use(mobile.is_mobile());

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

  // app.use(function(err, req, res, next) {
  //   // Treat as 404
  //   if (~err.message.indexOf('not found')) return next();

  //   // Log it
  //   console.error(err.stack);

  //   // Error page
  //   res.status(500).render('500', {
  //     error: err.stack
  //   });
  // });

  // app.use(function(req, res, next) {
  //   res.status(404).render('404', {
  //     url: req.originalUrl,
  //     error: 'Not found'
  //   });
  // });

  app.use(require('prerender-node').set('prerenderToken', 'tlgCZ16mK7RTP1i5BQGK'));
};