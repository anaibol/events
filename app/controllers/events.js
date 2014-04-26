'use strict';

var url = require('url');

var _ = require('lodash');

var Events = global.db.get('events');

var request = require('request');
var graph = require('fbgraph');


/**
 * Find ev by id
 */
exports.ev = function(req, res, next, id) {
  Events.findById(id, function(err, ev) {
    if (err) return next(err);
    if (!ev) return next(new Error('Failed to load ev ' + id));
    req.ev = ev;
    next();
  });
};

/**
 * Create a ev
 */
exports.create = function(req, res) {
  var ev = req.body;

  ev.start_time = new Date(ev.start_time);
  ev.end_time = new Date(ev.end_time);

  var venue;

  if (ev.place) {
    venue = ev.place.split(', ');

    ev.venue = {
      country: venue[venue.length - 1]
    };

    //ev.venue.city = venue[venue.length - 2];
  }

  Events.insert(ev, function(err) {
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

/**
 * Update a ev
 */
exports.update = function(req, res) {
  var ev = req.ev;

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
  ev = _.extend(req.body);
  ev.start_time = new Date(ev.start_time);
  ev.end_time = new Date(ev.end_time);

  var venue;

  if (ev.place) {
    venue = ev.place.split(', ');

    ev.venue = {
      country: venue[venue.length - 1]
    };

    //ev.venue.city = venue[venue.length - 2];
  }

  Events.updateById(ev._id, ev, function(err) {
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

/**
 * Delete an ev
 */
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

/**
 * Show an ev
 */
exports.show = function(req, res) {
  res.jsonp(req.ev);
};

/**
 * List of Events
 */
exports.all = function(req, res) {
  var date = new Date();

  date.setSeconds(0);
  date.setMinutes(0);
  date.setHours(0);

  Events.find({
    start_time: {
      $gte: date
    }
  }, {
    sort: {
      attendingNum: -1
    },
  }, function(err, evs) {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      res.jsonp(evs);
    }
  });
};


/**
 * Find evs
 */
exports.find = function(req, res) {
  var pos = req.body.pos;

  if (req.user) {
    graph.setAccessToken(req.user.accessToken);

    /*var query = 'SELECT name, pic_cover,start_time, end_time, location, description,venue  FROM ev WHERE eid in(SELECT eid FROM ev_member WHERE uid IN (SELECT page_id FROM place WHERE distance(latitude, longitude, "' + pos.latitude + '", "' + pos.longitude + '") < 50000)) ORDER BY start_time desc';
        //var query = 'SELECT name, pic_cover,start_time, end_time, location, description,venue  FROM ev WHERE eid in(SELECT eid FROM ev_member WHERE uid IN (SELECT page_id FROM place WHERE distance(latitude, longitude, "' + pos.latitude + '", "' + pos.longitude + '") < 50000)) ORDER BY start_time desc';
        graph.fql(query, function(err, evs) {
            res.json(evs.data);
            console.log(evs.data);
        });*/


    var searchOptions = {
      q: pos.city,
      type: "ev"
    };

    graph.search(searchOptions, function(err, evs) {
      res.json(evs.data);

      Events.create(evs.data, function(err) {
        if (err) console.log(err)
      });
    });

  } else {
    var pos = {};
    pos.latitude = '40.712';
    pos.longitude = '-74.000';

    res.render('index', {
      title: 'Wooeva',
      user: 'null',
      pos: JSON.stringify(pos),
      evs: 'null'
    });
  }
};

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

exports.get = function(req, res) {
  getCountry(req, function(country) {
    var url_parts = url.parse(req.url, true);
    var params = url_parts.query;

    var date = new Date();

    date.setSeconds(0);
    date.setMinutes(0);
    date.setHours(0);
    
    var sortStr = '{"' + params.sortBy + '" :' + params.sortOrder + '}';
    var sort = JSON.parse(sortStr);

    var query = {
      start_time: {
        $gte: date
      }
    };

    if (!params.all) {
      query["venue.country"] = country;
    }

    Events.find(query, {
      sort: sort,
      limit: params.limit,
      skip: params.page * params.limit
    }, function(err, evs) {
      if (err) {
        res.render('error', {
          status: 500
        });
      } else {
        res.jsonp(evs);
      }
    });
  });
};

exports.nameLike = function(req, res) {
  Events.find({
    name: new RegExp(q.name || term, 'i'),
    sort: {
      start_time: 1
    }
  }, function(err, evs) {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      res.jsonp(evs);
    }
  });
};

exports.importFromUser = function(req, res) {
  Ev.crawlUser(req.params.name, function (result) {
    if (!result) {
      Ev.getFromUser(req.params.name, function (result) {
        res.send(result);
      });
    } else {
      res.send(result);
    }
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