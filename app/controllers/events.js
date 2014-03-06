'use strict';

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
  console.log(req.body);

  Events.insert(ev, function(err) {
    console.log(err);
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

  ev = _.extend(ev, req.body);

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
 * List of Eventss
 */
exports.all = function(req, res) {
  Events.find().sort('-created').exec(function(err, evs) {
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
        if (err) console.log(err) // ...
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

exports.fromNow = function(req, res) {
  var date = new Date();

  date.setSeconds(0);
  date.setMinutes(0);
  date.setHours(0);

  Events.find({
    start_time: {
      $gte: date
    },
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