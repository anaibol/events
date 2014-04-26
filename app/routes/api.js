'use strict';

var url = require('url');

var _ = require('lodash');

var request = require('request');
var graph = require('fbgraph');

var moment = require('moment');

function getCountry(req, cb) {
  if (!req.session.country) {
    var ip = '';
    if (process.env.NODE_ENV === 'development') {
      ip = '82.142.63.255';
    } else {
      ip = req.connection.remoteAddress;
    }
     
    request('http://freegeoip.net/json/' + ip, function(error, response, body) {
      var pos = JSON.parse(body);
      req.session.country = pos.country_name;
      cb(req.session.country);
    });
  } else {
    cb(req.session.country);
  }
}

module.exports = function(req, res) {
  if (req.url) {
    var url_parts = url.parse(req.url, true);
    var params = url_parts.query;

    var Entity = global.db.get(req.params.entity);

    var verb = req.method.toLowerCase();

    switch (verb) {
      case 'post':
        var obj = req.body;

        obj.start_time = new Date(obj.start_time);
        obj.end_time = new Date(obj.end_time);

        var venue;

        if (obj.place) {
          venue = ev.place.split(', ');

          obj.venue = {
            country: venue[venue.length - 1]
          };

          //ev.venue.city = venue[venue.length - 2];
        }

        console.log(123);

        Entity.insert(obj, function(err, ev) {
          console.log(456);
          if (err) {
            console.log(err);
          }

          res.json(ev);
        });

        break;

      case 'get':
        getCountry(req, function(country) {
          var url_parts = url.parse(req.url, true);
          var params = url_parts.query;

          var date = new Date();

          date.setSeconds(0);
          date.setMinutes(0);
          date.setHours(0);

          var limit = params.limit;
          var skip = (params.page - 1) * params.limit;

          var sortStr = '{"' + params.sortBy + '" :' + params.sortOrder + '}';
          var sort = JSON.parse(sortStr);

          var query = {
            start_time: {
              $gte: date
            }
          };

          var options = {
            limit: limit,
            skip: skip,
            sort: sort
          };

          query["venue.country"] = country;

          switch (params.type) {
            case 'worldwide':
              delete query["venue.country"];

              break;

            case 'popular':
              sort.attending_count = -1;

              break;

            case 'free':
              query["price.num"] = 0;

              break;
            case 'today':
              var dateIncreased = new Date(date.getTime() + (24 * 60 * 60 * 1000) );

              query = {
                start_time: {
                  $gte: date,
                  $lt: dateIncreased
                }
              };

              break;
            case 'weekend':
              var friday = moment().day(5).toDate();
              var sunday = moment().day(7).toDate();

              query.start_time = {
                $gte: friday,
                $lt: sunday
              };

              break;
          }

          Entity.find(query, options, function(err, data) {
            if (err) {
              res.render('error', {
                status: 500
              });
            } else {
              if (data.length < limit) {
                var response = {
                  data: data,
                  count: data.length
                };

                res.json(response);
              } else {
                Entity.count(query, function(err, count) {
                  if (err) {
                    res.render('error', {
                      status: 500
                    });
                  } else {
                    var response = {
                      data: data,
                      count: count
                    };

                    res.json(response);
                  }
                });
              }
            }
          });
        });

        break;

      case 'update':
        var obj = req.obj;

        // if (req.files.image) {
        //   console.log(req.files);
        //   var image = req.files.image;
        //       console.log(image.name);
        //   var newImageLocation = path.join(__dirname, 'public/uploads', image.name);
          
        //   fs.readFile(image.path, function(err, data) {
        //       fs.writeFile(newImageLocation, data, function(err) {
        //           res.json(200, {
        //               src: 'images/' + image.name,
        //               size: image.size
        //           });
        //       });
        //   });
        // }

        // console.log(req.body.data);
        obj = _.extend(req.body);
        // ev.start_time = new Date(ev.start_time);
        // ev.end_time = new Date(ev.end_time);

        // var venue;

        // if (ev.place) {
        //   venue = ev.place.split(', ');

        //   ev.venue = {
        //     country: venue[venue.length - 1]
        //   };

          //ev.venue.city = venue[venue.length - 2];
        //}

        Entity.updateById(obj._id, obj, function(err) {
          if (err) {
            return res.send('users/signup', {
              errors: err.errors,
              obj: obj
            });
          } else {
            res.jsonp(obj);
          }
        });

        break;
    
      case 'delete':
        break;
    }
  }
};