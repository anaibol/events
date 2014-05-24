'use strict';

var url = require('url');

var _ = require('lodash');

var request = require('request');
var graph = require('fbgraph');

var moment = require('moment');

var fs = require('fs');

var formidable = require('formidable');

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
          venue = obj.place.split(', ');

          obj.venue = {
            country: venue[venue.length - 1]
          };

          //obj.venue.city = venue[venue.length - 2];
        }

        Entity.insert(obj, function(err, obj) {
          if (err) {
            console.log(err);
          }

          res.json(obj);
        });

        break;

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


            console.log(from)

            var options = {
              limit: limit,
              skip: skip,
              sort: sort
            };

            switch (params.type) {
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


            // query.start_time = { $or: [ query.start_time, {  } ]}};


            // query.start_tim = { $or: [ query.start_time, {  } ]}};

            // $or: [ { qty: { $lt: 20 } }, { sale: true } ]

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
    
      case 'put':
    console.log(req.body);
    console.log(req.files);

        var form = new formidable.IncomingForm();
        //form.uploadDir = __dirname + 'public/uploads');

        form.parse(req, function(err, fields, files) {
          console.log(files)
          res.json(req.body)
        });


        if (req.files.image) {
          console.log(req.files);
          var image = req.files.image;
              console.log(image.name);
          var newImageLocation = path.join(__dirname, 'public/uploads', image.name);
          
          fs.readFile(image.path, function(err, data) {
              fs.writeFile(newImageLocation, data, function(err) {
                  res.json(200, {
                      src: 'images/' + image.name,
                      size: image.size
                  });
              });
          });
        }

        break;

      case 'delete':
        break;
    }
  }
};