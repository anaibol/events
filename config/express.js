'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
  mongoStore = require('connect-mongo')(express),
  flash = require('connect-flash'),
  helpers = require('view-helpers'),
  config = require('./config');

var db = require('monk')(config.db);

var Events = db.get('events');

var url = require('url');
var path = require('path');
var zlib = require('zlib');
var fs = require('fs');

module.exports = function(app, passport, db) {

  app.set('showStackError', true);

  // Prettify HTML
  app.locals.pretty = true;

  // Should be placed before express.static
  // To ensure that all assets and data are compressed (utilize bandwidth)
  app.use(express.compress({
    filter: function(req, res) {
      return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
    },
    // Levels are specified in a range of 0 to 9, where-as 0 is
    // no compression and 9 is best compression, but slowest
    level: 9
  }));

  // Only use logger for development environment
  if (process.env.NODE_ENV === 'development') {
    app.use(express.logger('dev'));
  }

  // Set views path, template engine and default layout
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'jade');

  // Enable jsonp
  // app.enable("jsonp callback");

  app.configure(function() {
    // The cookieParser should be above session
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.multipart());

    app.use(express.limit('15mb'));

    // Request body parsing middleware should be above methodOverride
    app.use(express.urlencoded());
    app.use(express.json());
    app.use(express.methodOverride());

    // Express/Mongo session storage
    app.use(express.session({
      secret: config.sessionSecret,
      store: new mongoStore({
        db: config.dbName,
      })
    }));

    // Dynamic helpers
    app.use(helpers(config.app.name));

    // Use passport session
    app.use(passport.initialize());
    app.use(passport.session());

    // Connect flash for flash messages
    app.use(flash());

    // Routes should be at the last
    app.use(app.router);

    //var resources = ['user', 'event'];

    app.all('/api/:entity/:slug?*', function(req, res, next) {
      require('../app/routes/api')(req, res);
    });

    app.get('/popular', function(req, res, next) {
      var events = {};

       res.render('index', {
         title: 'Wooepa',
         user: req.user ? JSON.stringify(req.user) : 'null',
         fbAppId: global.fbAppId,
         events: events
       });
    });

    app.get('/today', function(req, res, next) {
      var events = {};

      res.render('index', {
       title: 'Wooepa',
       user: req.user ? JSON.stringify(req.user) : 'null',
       fbAppId: global.fbAppId,
       events: events
      });
    });

    app.get('/weekend', function(req, res, next) {
      var events = {};

      res.render('index', {
       title: 'Wooepa',
       user: req.user ? JSON.stringify(req.user) : 'null',
       fbAppId: global.fbAppId,
       events: events
      });
    });

    app.get('/free', function(req, res, next) {
      var events = {};

      res.render('index', {
       title: 'Wooepa',
       user: req.user ? JSON.stringify(req.user) : 'null',
       fbAppId: global.fbAppId,
       events: events
      });
    });

    app.get('/worldwide', function(req, res, next) {
      var events = {};

      res.render('index', {
       title: 'Wooepa',
       user: req.user ? JSON.stringify(req.user) : 'null',
       fbAppId: global.fbAppId,
       events: events
      });
    });

    app.get('/:slug', function(req, res, next) {
      Events.findOne({ slug: req.params.slug }, function(err, ev) {
        res.render('event', {
          title: 'Wooepa',
          ev: ev
        });
      });
    });

    app.get('/tag/:tag', function(req, res, next) {
      Events.find({ tags: { $all: [ req.params.tag ] } }, function(err, evs) {
        console.log(evs)
        res.render('list', {
          title: 'Wooepa',
          evs: evs
        });
      });
    });

    app.get('/sitemap/index.xml.gz', function(req, res) {
      var siteMapFile = path.join(config.root + '/public', 'index.xml.gz');
      //fs.exists(siteMapFile, function(exists) {
      //if (!exists) {
      generateSitemapIndex(req.headers.host, siteMapFile, function(success) {
        if (success) {
          res.type('gzip');
          res.sendfile(siteMapFile);
        }
      });
      //}
      //else {
      //  res.sendfile(siteMapFile);
      //}
    });
 
    app.get('/sitemap/:id.xml.gz', function(req, res) {
      var id = req.params.id;
      var siteMapFile = path.join(config.root + '/public', id + '.xml.gz');
 
      //fs.exists(siteMapFile, function(exists) {
      //if (!exists) {
 
      generateSitemap(id, req.headers.host, siteMapFile, function(success) {
        if (success) {
          res.type('gzip');
          res.sendfile(siteMapFile);
        }
      });
      //}
      //else {
      //  res.sendfile(siteMapFile);
      //}
      //});
    });

    var MaxSitemapUrls = 10000;
   
    function generateSitemapIndex(host, siteMapFile, cb) {
      var url;
      var priority = 0.5;
      var freq = 'monthly';
      var xml = '<sitemapindex xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/siteindex.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
 
      var siteMap = {};
      var slug;
      var dateModified;

      var options = {
        sort: { id: 1 }
      };

      return Events.find({}, options, function(err, evs) {
        var numSiteMaps = Math.floor(evs.length / MaxSitemapUrls);
        if (numSiteMaps < 1) {
          numSiteMaps = 1;
        }

        for (var i = 1; i <= numSiteMaps; i++) {
          //dateModified = post.dateModified;
          url = 'http://' + host + '/sitemap/' + i + '.xml.gz';
          xml += '<sitemap>';
          xml += '<loc>' + url + '</loc>';
          //xml += '<lastmod>' + dateModified + '</lastmod>';
          //xml += '<changefreq>' + freq + '</changefreq>';
          //xml += '<priority>' + priority + '</priority>';
          xml += '</sitemap>';
        }
   
        xml += '</sitemapindex>';
   
        zlib.gzip(xml, function(_, result) { // The callback will give you the 
          fs.writeFile(siteMapFile, result, function(err) {
            if (err) {
              console.log(err);
   
            } else {
              if (typeof cb == "function") cb(true);
            }
          }); // result, so just send it.
        });
      });
    }
 
    function generateSitemap(id, host, siteMapFile, cb) {
      var from = MaxSitemapUrls * (id - 1);

      var options = {
        limit: MaxSitemapUrls,
        skip: from,
        sort: { id: 1 }
      };

      return Events.find({}, options, function(err, evs) {
        console.log(err)
        if (err) return;
   
        var url;
        var priority = 0.5;
        var freq = 'monthly';
        var xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
   
        var ev = {};
        var slug;
   
        var date;
        var month;
        var day;
   
        for (var i = 0; i < evs.length; i++) {
          ev = evs[i];
          //date = new Date(post.dateModified);
          //month = ('0' + date.getMonth() + 1).slice(-2);
          //day = ('0' + date.getDate()).slice(-2);
   
          //date = date.getFullYear() + '-' + month + '-' + day;
          url = 'http://' + host + '/' + ev.slug;
   
          xml += '<url>';
          xml += '<loc>' + url + '</loc>';
          //xml += '<lastmod>' + date + '</lastmod>';
          //xml += '<changefreq>' + freq + '</changefreq>';
          //xml += '<priority>' + priority + '</priority>';
          xml += '</url>';
        }
   
        xml += '</urlset>';
   
        zlib.gzip(xml, function(_, result) { // The callback will give you the 
          fs.writeFile(siteMapFile, result, function(err) {
            if (err) {
              console.log(err);
   
            } else {
              if (typeof cb == "function") cb(true);
            }
          }); // result, so just send it.
        });
      });
    }

    // Setting the fav icon and static folder
    app.use(express.favicon());
    app.use(express.static(config.root + '/public'));

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

    // Assume 404 since no middleware responded
    app.use(function(req, res, next) {
      res.status(404).render('404', {
        url: req.originalUrl,
        error: 'Not found'
      });
    });
  });
};