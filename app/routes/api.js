'use strict';

var url = require('url');

var _ = require('lodash');

var request = require('request');
var graph = require('fbgraph');

var moment = require('moment');

var fs = require('fs');

var slugify = require('slugify');

var Creators = db.get('creators');
var Locations = db.get('locations');


function parseDataURL(string) {
  var regex = /^data:.+\/(.+);base64,(.*)$/;

  var match = string.match(regex);

  var buffer = new Buffer(match[2], 'base64');

  return {
    ext: match[1],
    data: new Buffer(match[2], 'base64')
  };
}

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
      case 'get':
        if (req.params.slug) {
          Entity.findOne({slug: req.params.slug}, function(err, data) {
            if (err) {
              res.render('error', {
                status: 500
              });
            } else {
              res.json(data);
            }
          });
        } else {
          getCountry(req, function(country) {
            var url_parts = url.parse(req.url, true);
            var params = url_parts.query;

            var limit = params.limit;
            var skip = (params.page - 1) * params.limit;

            var sortStr = '{"' + params.sortBy + '" :' + params.sortOrder + '}';
            var sort = JSON.parse(sortStr);

            var from = new Date(params.fromDate);

            var query = {
              start_time: {
                $gte: from
              },
              "venue.country": country
            };

            var options = {
              limit: limit,
              skip: skip,
              sort: sort
            };

            switch (params.type) {
              case 'user':
                delete query.start_time;
                delete query["venue.country"];

                if (params.user) {
                  query["creator.name"] = params.user;
                } else {
                  query["creator.id"] = req.user.facebook.id;
                }

                break;

              case 'date':
                if (params.toDate) {
                  var to = new Date(params.toDate);

                  query.start_time = {
                    $gte: from,
                    $lt: to
                  };
                } else {
                  query.start_time = {
                    $gte: from
                  };
                }

                break;

              case 'worldwide':
                delete query["venue.country"];

                break;

              case 'popular':
                sort.attending_count = -1;

                break;

              case 'festival':
                query.festival = true;
                delete query["venue.country"];

                break;

              case 'free':
                query["price.num"] = 0;

                break;
              case 'today':
                var dateIncreased = new Date(from.getTime() + (24 * 60 * 60 * 1000) );

                query = {
                  start_time: {
                    $gte: from,
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

            console.log(query)

            // var query2 = _.clone(query);

            // delete query2.start_time;

            // query2.repeat = moment().format('dddd');

            // query = {$or:[
            //     query,
            //     query2
            // ]};

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
        }

        break;

      case 'put':
        var obj = req.body;

        obj.start_time = new Date(obj.start_time);
        obj.end_time = new Date(obj.end_time);

        if (req.body.image) {
          var parsed = parseDataURL(req.body.image);
          ev.image = parsed.ext;
        }

        Entity.updateById(obj._id, obj, function(err) {
          if (err) {
            return res.send('users/signup', {
              errors: err.errors,
              obj: obj
            });
          } else {
            if (obj.image) {
              var newImageLocation = __dirname + '/../../public/uploads/' + obj._id + '.' + obj.image.split('.').pop();
              fs.writeFileSync(newImageLocation, parsed.data);
            }

            res.jsonp(obj);
          }
        });

        break;
    
      case 'post':
        var ev;

        if (typeof req.body.model === 'string') {
          ev = JSON.parse(req.body.model);
        } else {
          ev = req.body;
        }

        ev.start_time = new Date(ev.start_time);
        ev.end_time = new Date(ev.end_time);

        if (req.body.image) {
          var parsed = parseDataURL(req.body.image);
          ev.image = parsed.ext;
        }

        ev.slug = slugify(ev.name.toLowerCase());

        ev.creator = {
          id: req.user.facebook.id,
          name: req.user.username
        }

        Entity.insert(ev, function(err, obj) {
          if (err) {
            console.log(err);
          } else {
            if (req.body.image) {
              var newImageLocation = __dirname + '/../../public/uploads/' + obj._id + '.' + parsed.ext;
              fs.writeFileSync(newImageLocation, parsed.data);
            }

            if (obj) {
              if (obj.location && obj.venue) {
                Locations.insert({location: obj.location, venue: obj.venue, place: obj.place});
              }

              if (obj.creator) {
                Creators.insert({fid: obj.creator.id, username: obj.creator.name});
              }
            }


            res.json(obj);
          }
        });

        break;

      case 'delete':
        break;
    }
  }
};