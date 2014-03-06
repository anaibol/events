'use strict';

var db = require('monk')('localhost/wooeva-dev');
var Events = db.get('events');

exports.fromNow = function(req, res) {
  var date = new Date();

  date.setSeconds(0);
  date.setMinutes(0);
  date.setHours(0);

  Events.find({
    start_time: {
      $gte: new Date()
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


exports.render = function(req, res) {
  var date = new Date();

  date.setSeconds(0);
  date.setMinutes(0);
  date.setHours(0);

  Events.find({
    start_time: {
      $gte: new Date()
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
      res.render('index', {
        title: 'Wooeva',
        user: req.user ? JSON.stringify(req.user) : 'null',
        fbAppId: global.fbAppId,
        events: evs
      });
    }
  });
};