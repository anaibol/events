'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Event = mongoose.model('Event'),
  _ = require('lodash');

var request = require('request');
var graph = require('fbgraph');


/**
 * Find event by id
 */
exports.event = function(req, res, next, id) {
  Event.load(id, function(err, event) {
    if (err) return next(err);
    if (!event) return next(new Error('Failed to load event ' + id));
    req.event = event;
    next();
  });
};

/**
 * Create a event
 */
exports.create = function(req, res) {
  var event = new Event(req.body);
  event.user = req.user;

  event.save(function(err) {
    if (err) {
      return res.send('users/signup', {
        errors: err.errors,
        event: event
      });
    } else {
      res.jsonp(event);
    }
  });
};

/**
 * Update a event
 */
exports.update = function(req, res) {
  var event = req.event;

  event = _.extend(event, req.body);

  event.save(function(err) {
    if (err) {
      return res.send('users/signup', {
        errors: err.errors,
        event: event
      });
    } else {
      res.jsonp(event);
    }
  });
};

/**
 * Delete an event
 */
exports.destroy = function(req, res) {
  var event = req.event;

  event.remove(function(err) {
    if (err) {
      return res.send('users/signup', {
        errors: err.errors,
        event: event
      });
    } else {
      res.jsonp(event);
    }
  });
};

/**
 * Show an event
 */
exports.show = function(req, res) {
  res.jsonp(req.event);
};

/**
 * List of Events
 */
exports.all = function(req, res) {
  Event.find().sort('-created').populate('user', 'name username').exec(function(err, events) {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      res.jsonp(events);
    }
  });
};


/**
 * Find events
 */
exports.find = function(req, res) {
  var pos = req.body.pos;

  if (req.user) {
    graph.setAccessToken(req.user.accessToken);

    /*var query = 'SELECT name, pic_cover,start_time, end_time, location, description,venue  FROM event WHERE eid in(SELECT eid FROM event_member WHERE uid IN (SELECT page_id FROM place WHERE distance(latitude, longitude, "' + pos.latitude + '", "' + pos.longitude + '") < 50000)) ORDER BY start_time desc';
        //var query = 'SELECT name, pic_cover,start_time, end_time, location, description,venue  FROM event WHERE eid in(SELECT eid FROM event_member WHERE uid IN (SELECT page_id FROM place WHERE distance(latitude, longitude, "' + pos.latitude + '", "' + pos.longitude + '") < 50000)) ORDER BY start_time desc';
        graph.fql(query, function(err, events) {
            res.json(events.data);
            console.log(events.data);
        });*/


    var searchOptions = {
      q: pos.city,
      type: "event"
    };

    graph.search(searchOptions, function(err, events) {
      res.json(events.data);

      Event.create(events.data, function(err) {
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
      events: 'null'
    });
  }
};