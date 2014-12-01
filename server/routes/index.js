var url = require('url');
var request = require('request');
var Events = global.db.get('events');

module.exports = function(app) {
  app.get('*', function(req, res) {

    getLocation(req, function(loc) {
      var url_parts = url.parse(req.url, true);
      var params = url_parts.query;

      var limit;

      if (req.isMobile) {
        limit = 5;
      } else {
        limit = 30;
      }

      var skip = params.skip || 0;
      var sortBy = params.sortBy || 'start_time';
      var sortOrder = params.sortOrder || 1;
      var since = params.since || 0;
      var until = params.until || 0;

      if (params.sortBy === 'popularity') {
        sortBy = 'attending_count';
        sortOrder = -1;
      }

      var sortStr = '{"' + sortBy + '" :' + sortOrder + '}';
      var sort = JSON.parse(sortStr);

      since = new Date(since);

      var query = {
        start_time: {
          $gte: since
        }
      };

      var coord;

      if (params.lat && params.lng) {
        coord = {
          lng: parseFloat(params.lng),
          lat: parseFloat(params.lat)
        };
      } else {
        coord = {
          lng: loc.lng,
          lat: loc.lat
        };
      }

      if (params.lat && params.lng) {
        query['venue.coord'] = {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [coord.lng, coord.lat]
            },
            $maxDistance: 50000
          }
        };
      }

      if (params.country) {
        query['venue.country'] = {
          $regex: new RegExp(params.country, "i")
        };

        delete query['venue.coord'];
      }

      var options = {
        limit: limit,
        skip: skip,
        fields: {
          attending: 0
        }
      };

      if (params.sortBy !== 'proximity') {
        options.sort = sort;
      }

      var tags = params.tags;
      var realTags = [];

      if (tags) {
        tags = tags.split(',');

        tags.forEach(function(tag) {
          switch (tag) {
            case 'popular':
              query.attending_count = {
                $gt: 50
              };

              break;

            case 'festival':
              query.festival = true;

              break;

            case 'promoted':
              query.in_promotion = true;

              break;

            case 'free':
              query["price.num"] = 0;

              break;

            default:
              realTags.push(tag);

              break;
          }
        });

        if (realTags.length) {
          query.tags = {
            $all: realTags
          };
        }
      }

      Events.find(query, options, function(err, data) {
        if (err) {
          console.log(err);
          res.render('error', {
            status: 500
          });
        } else {
          res.render('index', {
            title: 'Wooepa',
            is_mobile: req.is_mobile,
            user: req.user ? JSON.stringify(req.user) : 'null',
            fbAppId: global.fbAppId,
            events: data,
            loc: loc
          });
        }
      });
    });
  });

  function getLocation(req, cb) {
    if (!req.session.loc) {
      var ip;
      if (process.env.NODE_ENV === 'development') {
        ip = '82.142.63.255';
      } else {
        ip = req.connection.remoteAddress;
      }

      request('http://ipinfo.io/' + ip, function(error, response, body) {
        var location = JSON.parse(body);
        req.session.loc = location;

        req.session.loc.lat = req.session.loc.latitude;
        req.session.loc.lng = req.session.loc.longitude;

        delete req.session.loc.latitude;
        delete req.session.loc.longitude;

        cb(req.session.loc);
      });
    } else {
      cb(req.session.loc);
    }
  }

};