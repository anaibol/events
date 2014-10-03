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
var config = require('./config');

var db = require('monk')(config.db);

var Events = db.get('events');

var url = require('url');

var env = process.env.NODE_ENV || 'development';

module.exports = function(app, passport, db) {


  if (env === 'development') {
    app.use(morgan('dev'));
    app.locals.pretty = true;
    app.set('showStackError', true);
    app.use(express.logger('dev'));
  }

  if (env === 'production') {
    app.locals.cache = 'memory';

    app.use(compression({
      filter: function(req, res) {
        return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
      },
      level: 9
    }));
  }

  // Set views path, template engine and default layout
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'jade');

  app.use(cookieParser());

  app.use(bodyParser.urlencoded());
  app.use(bodyParser.json());
  app.use(methodOverride());

  app.use(express.multipart());

  app.use(express.limit('15mb'));

  // Request body parsing middleware should be above methodOverride
  app.use(express.urlencoded());
  app.use(express.json());

  // Express/Mongo session storage
  app.use(session({
    secret: config.sessionSecret,
    store: new MongoStore({
      url: config.db
    })
  }));

  // Use passport session
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(helpers(config.app.name));

  app.use(flash());

  app.use(favicon(config.root + '/public/favicon.ico'));

  app.use(serveStatic(config.root + '/public'));

  app.use(app.router);

  // Assume "not found" in the error msgs is a 404. this is somewhat
  // silly, but valid, you can do whatever you like, set properties,
  // use instanceof etc.
  app.use(function(err, req, res, next) {
    // Treat as 404
    if (~err.message.indexOf('not found')) return next();

    // Log it
    console.error(err.stack);

    // Error page
    res.status(500).render('500', {
      error: err.stack
    });
  });

  // // Assume 404 since no middleware responded
  app.use(function(req, res, next) {
    res.status(404).render('404', {
      url: req.originalUrl,
      error: 'Not found'
    });
  });
};