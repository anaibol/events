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
var Events = global.db.get('events');

var Ev = require('../../ev');

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
      cb(pos);
    });
  } else {
    cb(req.session.country);
  }
}

exports.importFromUser = function(req, res) {
  // Ev.crawlUser(req.params.name, function (result) {
  //   if (!result) {
  //     Ev.getFromUser(req.params.name, null, function (result) {
  //       res.send(result);
  //     });
  //   } else {
  //     res.send(result);
  //   }
  // });

  Ev.getFromUser(req.params.name, null, function (result) {
    res.send(result);
  });
};

exports.importFromUserTimeline = function(req, res) {
  Ev.crawlUserTimeline(req.params.name, function (result) {
    res.send(result);
  });
};

exports.importFromPage = function(req, res) {
  Ev.crawlPage(req.params.pid, function (result) {
    res.send(result);
  });
};

exports.importFromPageTimeline = function(req, res) {
  Ev.crawlPageTimeline(req.params.pid, function (result) {
    res.send(result);
  });
};

exports.import = function(req, res) {
  Ev.fetch(req.params.eid, 'event', function (ev) {
    res.json(ev);
  });
};

exports.get = function(req, res) {
  if (req.params.slug) {
    Events.findOne({slug: req.params.slug}, function(err, data) {
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
          delete query["venue.country"]; // rapha add
          sort.attending_count = -1;

          break;

        case 'festival':
          query.festival = true;
          delete query["venue.country"];
          sort.attending_count = -1; // rapha add

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

      // var query2 = _.clone(query);

      // delete query2.start_time;

      // query2.repeat = moment().format('dddd');

      // query = {$or:[
      //     query,
      //     query2
      // ]};

      Events.find(query, options, function(err, data) {
        if (err) {
          res.render('error', {
            status: 500
          });
        } else {
          Events.count(query, function(err, count) {
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
      });
    });
  }
};

exports.getOne = function(req, res) {
  Events.findOne({slug: req.params.slug}, function(err, data) {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      res.json(data);
    }
  });
};

exports.create = function(req, res) {
  var ev;
  var image;

  if (typeof req.body.model === 'string') {
    ev = JSON.parse(req.body.model);
    image = req.body.image;
  } else {
    ev = req.body;
  }

  ev.start_time = new Date(ev.start_time);
  ev.end_time = new Date(ev.end_time);

  if (image) {
    var parsed = parseDataURL(image);
    ev.imageExt = parsed.ext;
  }

  ev.slug = slugify(ev.name.toLowerCase());

  ev.creator = {
    id: req.user.facebook.id,
    name: req.user.username
  }

  if (ev.price.full) {
    ev.price = Ev.getPriceFromFullPrice(ev.price.full);
  }

  Events.insert(ev, function(err, obj) {
    if (err) {
      console.log(err);
    } else {
      if (image) {
        var newImageLocation = __dirname + '/../../public/uploads/' + obj._id + '.' + obj.imageExt;
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

      var fbEv = {
        name: ev.name,
        description: ev.description,
        start_time: ev.start_time
      }

      graph.post('/me/events?access_token=' + req.user.accessToken, fbEv, function(err, res) {
          // returns the post id
          console.log(err)
          console.log(res); // { id: xxxxx}
      });

      res.json(obj);
    }
  });
};

exports.update = function(req, res) {
  var ev;
  var image;

  if (typeof req.body.model === 'string') {
    ev = JSON.parse(req.body.model);
    image = req.body.image;
  } else {
    ev = req.body;
  }

  if (!req.user.admin) {
      if (ev.creator.id !== req.user.facebook.id) {
         return res.send('Not allowed');
      }
  }

  ev.start_time = new Date(ev.start_time);
  ev.end_time = new Date(ev.end_time);

  if (image) {
    var parsed = parseDataURL(image);
    ev.imageExt = parsed.ext;
  }

  ev.slug = slugify(ev.name.toLowerCase());

  if (ev.price.full) {
    ev.price = Ev.getPriceFromFullPrice(ev.price.full);
  }

  Events.updateById(ev._id, ev, function(err) {
    if (err) {
      return res.send('users/signup', {
        errors: err.errors
      });
    } else {
      if (image) {
        var newImageLocation = __dirname + '/../../public/uploads/' + ev._id + '.' + ev.imageExt;
        fs.writeFileSync(newImageLocation, parsed.data);
      }

      res.jsonp(ev);
    }
  });
};

exports.destroy = function(req, res) {
  var ev = req.ev;

  ev.remove(function(err) {
    if (err) {
      return res.send('users/signup', {
        errors: err.errors,
        ev: ev
      });
    } else {
      res.jsonp(ev);
    }
  });
};