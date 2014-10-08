'use strict';

var url = require('url');

var request = require('request');
var graph = require('fbgraph');

var moment = require('moment');

var fs = require('fs');

var slugify = require('slugify');

var Creators = db.get('creators');
var Locations = db.get('locations');
var Events = global.db.get('events');

var Ev = require('../ev');

function clone(a) {
  return JSON.parse(JSON.stringify(a));
}

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

  Ev.getFromUser(req.params.name, null, function(result) {
    res.send(result);
  });
};

exports.importFromUserTimeline = function(req, res) {
  Ev.crawlUserTimeline(req.params.name, function(result) {
    res.send(result);
  });
};

exports.importFromPage = function(req, res) {
  Ev.crawlPage(req.params.pid, function(result) {
    res.send(result);
  });
};

exports.importFromPageTimeline = function(req, res) {
  Ev.crawlPageTimeline(req.params.pid, function(result) {
    res.send(result);
  });
};

exports.import = function(req, res) {
  Ev.fetch(req.params.eid, 'import', function(ev) {
    res.json(ev);
  });
};

exports.get = function(req, res) {
  if (req.params.slug) {
    Events.findOne({
      slug: req.params.slug
    }, function(err, data) {
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

      var since = new Date(params.since);

      var query = {
        start_time: {
          $gte: since
        },
        "venue.country": country
      };

      var options = {
        limit: limit,
        skip: skip,
        sort: sort,
        fields: {
          attending: 0
        }
      };

      switch (params.type) {
        case 'user':
          delete query.start_time;
          delete query["venue.country"];

          var query1 = clone(query);
          var query2 = clone(query);

          if (params.user) {
            query1["creator.name"] = params.user;

            graph.get(params.user, function(err, res) {
              var usr = res.data;

              // if (usr) {
              //   console.log(urs);
              // }
            });
          } else {
            query1["creator.id"] = req.user.facebook.id;
          }

          query2.attending = {
            $all: [parseInt(req.user.facebook.id)]
          };

          query = {
            $or: [query1, query2]
          };

          break;

        case 'date':
          if (params.until) {
            var until = new Date(params.until);

            query.start_time = {
              $gte: since,
              $lt: until
            };
          } else {
            query.start_time = {
              $gte: since
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

        case 'promote':
          query.in_promotion = true;
          delete query["venue.country"];

          break;

        case 'free':
          query["price.num"] = 0;
          delete query["venue.country"];

          break;
        case 'today':
          var dateIncreased = new Date(from.getTime() + (24 * 60 * 60 * 1000));

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
          res.json(data);

          // Events.count(query, function(err, count) {
          //   if (err) {
          //     res.render('error', {
          //       status: 500
          //     });
          //   } else {
          //     var response = {
          //       data: data,
          //       count: count
          //     };

          //     res.json(response.data);
          //   }
          // });
        }
      });
    });
  }
};

var tokenInstagram = "1491272863.4fa115a.678e407407db496fa1db455f5d2f5eab";

function searchPhotos(data, res) {

  if (!data) {
    res.json(data);
    return;
  }

  var accessToken = "439472799532734|q2yZ3bxPv8magGScTA672Ab-x7Y";

  var currentDate = new Date();

  if (data.images && data.last_update_images) {
    var next_update = data.last_update_images;
    next_update.setDate(next_update.getDate() + 7);
    if (next_update >= currentDate) {
      console.log('Already in DB, next update at :' + next_update);
      res.json(data);
      return;
    }
  }

  var id = [];

  var images = [];

  graph.get('/' + data.eid + '/feed' + '?access_token=' + accessToken, function(err, result) {
    if (err) {
      console.log(err);
      res.json(data);
    } else if (result) {

      for (var i = 0; i < result.data.length; i++) {

        if (result.data[i].type == 'photo')
          id.push(result.data[i].object_id)
      }

      for (var j = 0; j < id.length; j++) {
        graph.get('/' + id[j] + '?access_token=' + accessToken, function(err, result) {
          if (err) {
            console.log(err);
            res.json(data);
            return;
          } else if (result) {

            images.push(result.images);

            Events.update({
                eid: parseInt(data.eid)
              }, {
                $push: {
                  'images': result.images
                }
              }, {
                $set: {
                  'last_update_images': currentDate
                }
              },
              function(err, event) {
                if (err) {
                  console.log(err);
                }
              });

            data.images = images;

            if (data.images.length == id.length)
              res.json(data);
          }
        });
      }
    } else
      res.json(data);
  });

}

function searchPlaceAndRequestRecentPhotos(data, res) {
  if (!data) {
    res.json(data);
    return;
  }

  var currentDate = new Date();

  console.log(currentDate);

  if (data.photos && data.last_update_photos) {
    var next_update = data.last_update_photos;
    if (next_update.getDate) {
      next_update.setDate(next_update.getDate() + 7);
      if (next_update >= currentDate) {
        console.log('Already in DB, next update at :' + next_update);
        res.json(data)
        return;
      }
    } else {
      console.log("data.last_update_photos : " + data.last_update_photos + "Has no function getDate()");
      res.json(data);
      return;
    }
  }

  var latitude = data.venue.latitude;
  var longitude = data.venue.longitude;
  var name = data.location;
  var query = "https://api.instagram.com/v1/locations/search?lat=" + latitude + "&lng=" + longitude + "&access_token=" + tokenInstagram;

  console.log(" query : " + query);
  try {
    request(query, function(error, response, body) {
      var id = null;

      if (data.location_instragram_id)
        id = data.location_instragram_id;
      else if (error) {
        console.log(" error ");
        res.json(data);
        return;
      } else {
        console.log(" name : " + name);
        console.log(body);
        //if (body.toString().indexOf("Oops, an error occurred.") != -1 || 
        //if (!IsJsonString(body))
        var isJsonString = /^[\],:{}\s]*$/.test(body.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''));
        if (!isJsonString) {
          console.log(" error catched l319 ");
          res.json(data);
          return;
        }

        var obj = JSON.parse(response.body);

        if (!obj.data) {
          res.json(data);
          return;
        }

        if (obj.data.length == 0) {
          res.json(data);
          return;
        }

        id = obj.data[0].id;
        var found = false;

        console.log("Things:" + data.location);
        for (var i = 0; i < obj.data.length; i++) {
          console.log(obj.data[i].name.toLowerCase());
          if (data.location.toLowerCase() == obj.data[i].name.toLowerCase()) {
            Events.update({
              'eid': data.eid
            }, {
              $set: {
                'location_instragram_id': obj.data[i].id
              }
            }, function(err) {
              if (err)
                console.log(err)
            });
          }

          if (name == obj.data[i].name) {
            console.log("FOUND !");
            id = obj.data[0].id;
            found = true;
          }
        }

        if (!found)
          console.log(" NOT FOUND, we took the first one !");
      }

      var queryPhotos = "https://api.instagram.com/v1/locations/" + id + "/media/recent?access_token=" + tokenInstagram;
      console.log(queryPhotos);

      try {
        request(queryPhotos, function(error, response, body) {
          //if (body.toString().indexOf("Oops, an error occurred.") != -1)
          //if (!IsJsonString(body))
          var isJsonString = /^[\],:{}\s]*$/.test(body.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''));

          if (!isJsonString) {
            console.log(" error catched l319 ");
            res.json(data);
            return;
          }
          if (error) {
            console.log(" error ");
            res.json(data);
            return;
          }

          obj = JSON.parse(body);
          // console.log(obj);
          var photos = [];
          for (var j = 0; j < obj.data.length; j++) {
            var photo = {};

            photo.created_time = obj.data[j].created_time;
            photo.url = obj.data[j].images.standard_resolution.url;
            photo.url_medium = obj.data[j].images.low_resolution.url;
            photo.tags = obj.data[j].tags;
            photo.likes_count = obj.data[j].likes.count;
            photo.id = obj.data[j].id;
            photo.user = obj.data[j].user;

            // console.log(url);
            photos.push(photo);
          }

          console.log(" photos : " + photos.length);

          data.photos = photos;

          Events.update({
            'eid': data.eid
          }, {
            $set: {
              'photos': photos,
              'last_update_photos': currentDate
            }
          }, function(err) {
            if (err)
              console.log(err)
          });

          res.json(data);

        });
      } catch (e) {
        console.log("error instagram catched !");
        res.json(data);
        return;
      }
    });
  } catch (e) {
    console.log("error instagram catched !");
    res.json(data);
    return;
  }
  // JSON.stringify
}

exports.getOne = function(req, res) {

  // console.log("req : ");
  // console.log(req);
  Events.findOne({
    eid: parseInt(req.params.eid)
  }, function(err, data) {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      //searchPhotos(data, res);
      searchPlaceAndRequestRecentPhotos(data, res);

      Events.findOne({
        eid: parseInt(req.params.eid)
      }, function(err, ev) {
        if (err) {
          res.render('error', {
            status: 500
          });
        } else {
          // searchPlaceAndRequestRecentPhotos(eid, function(photos){
          // ev.photos = photos;
          //res.json(ev);
          // });
          // 035b1de3978528e1c1f896a2319a8ffaf6a94433
        }
      });

      Ev.update(req.params.eid, function(ev) {});
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
          Locations.insert({
            location: obj.location,
            venue: obj.venue,
            place: obj.place
          });
        }

        if (obj.creator) {
          Creators.insert({
            fid: obj.creator.id,
            username: obj.creator.name
          });
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