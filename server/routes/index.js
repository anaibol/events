var url = require('url');
var request = require('request');
var Events = global.db.get('events');

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

module.exports = function(app) {
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

  app.post('', function(req, res) {
    console.log(1);
    if (req.query.fb_source) {
      console.log(2);
      req.query.request_ids = req.query.request_ids.split(',')[0];

      var query = req.query.request_ids + '_' + req.user.facebook.id + '?access_token=' + req.user.accessToken;
      graph.get(query, function(err, data) {
        console.log(3);
        res.redirect(data.data);
      });
    }
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
            lon: 2.3333,
            lat: 48.8667
          };
        }
        else
        {
          var location = JSON.parse(body);
          location.city = slug(location.city);
        }
        cb(location);
        // req.session.loc = location;

        // req.session.loc.lat = req.session.loc.latitude;
        // req.session.loc.lng = req.session.loc.longitude;

        // delete req.session.loc.latitude;
        // delete req.session.loc.longitude;

        // cb(req.session.loc);
      });
    // } else {
    //   cb(req.session.loc);
    // }
  }

};