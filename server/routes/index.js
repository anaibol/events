var url = require('url');
var request = require('request');
var Events = global.db.get('events');

var users = require(controllersDir + 'users');

var graph = require('fbgraph');

function slug(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
  var to = "aaaaaeeeeeiiiiooooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
}

module.exports = function(app, passport) {
  // app.get('*', function(req, res) {
  //   res.json(req.query);
  // });

  app.get('', function(req, res) {
    getLocation(req, function(loc) {
      var i = 0;
      var longitude = loc.lon;
      var latitude = loc.lat;
      res.redirect('/' + loc.city);
    });
  });

  app.get('/:slug/:eid', function(req, res) {
    getLocation(req, function(loc) {
      res.render('index', {
        title: 'Wooepa',
        is_mobile: req.is_mobile,
        user: req.user ? JSON.stringify(req.user) : 'null',
        fbAppId: global.fbAppId,
        loc: loc
      });
    });
  });

  app.get('/:city/:slug/:eid', function(req, res) {
    getLocation(req, function(loc) {
      res.render('index', {
        title: 'Wooepa',
        is_mobile: req.is_mobile,
        user: req.user ? JSON.stringify(req.user) : 'null',
        fbAppId: global.fbAppId,
        loc: loc
      });
    });
  });

  app.get('/:city', function(req, res) {
    getLocFromSlug(req.params.city, function(loc) {
      req.session.loc = loc;

      // res.json(loc);

      res.render('index', {
        title: 'Wooepa',
        is_mobile: req.is_mobile,
        user: req.user ? JSON.stringify(req.user) : 'null',
        fbAppId: global.fbAppId,
        loc: loc
      });
    });
  });

  function getLocFromSlug(slug, cb) {
    request('http://maps.googleapis.com/maps/api/geocode/json?address=' + slug + '&sensor=false', function (error, res, body) {
      if (!error && res.statusCode == 200) {
        body = JSON.parse(body);
        if (body.results) {
          var loc = body.results[0];

          if (!loc) {
            cb({
              city: 'Paris',
              country: 'France',
              lng: 2.3333,
              lat: 48.8667
            });
            return;
          }

          loc = {
            city: loc.address_components[0].long_name,
            lng: loc.geometry.location.lng,
            lat: loc.geometry.location.lat
          };

          cb(loc);
        }
      }
    });
  }

  function getLocation(req, cb) {
    // if (!req.session.loc) {  
      var ip;
      if (process.env.NODE_ENV === 'development') {
        ip = "190.195.18.48";
      } else {
        ip = req.connection.remoteAddress;
      }
      request('http://ip-api.com/json/' + ip, function(error, response, body) {
       var location = JSON.parse(body);
        if (location.status === 'fail' || location.city === '' || location.lat === '' || location.lon === '') {
          var location = {
            city: 'Paris',
            country: 'France',
            lng: 2.3333,
            lat: 48.8667
          };
        }
        else
        {
          var location = JSON.parse(body);
          location.city = slug(location.city);
        }

        req.session.loc = location;

        req.session.loc.lat = req.session.loc.latitude;
        req.session.loc.lng = req.session.loc.longitude;

        delete req.session.loc.latitude;
        delete req.session.loc.longitude;

        cb(req.session.loc);
      });
    // } else {
    //   cb(req.session.loc);
    // }
  }

};