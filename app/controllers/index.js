'use strict';

var request = require('request');
var Events = global.db.get('events');

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
  var ip = '';
  if (process.env.NODE_ENV === 'development') {
    ip = '82.142.63.255';
  } else {
    ip = req.connection.remoteAddress;
  }

  request('http://freegeoip.net/json/' + ip, function(error, response, body) {
  //request('http://freegeoip.net/json/82.142.63.255', function(error, response, body) {
    var pos = JSON.parse(body);

    var date = new Date();

    date.setSeconds(0);
    date.setMinutes(0);
    date.setHours(0);

    Events.find({
      start_time: {
        $gte: date
      },
      "venue.country": pos.country_name
    }, {
      sort: {
        start_time: 1
      },
    },
    function(err, events) {
      if (err) {
        res.render('error', {
          status: 500
        });
      } else {
        res.render('index', {
          title: 'Wooeva',
          user: req.user ? JSON.stringify(req.user) : 'null',
          fbAppId: global.fbAppId,
          events: events,
          pos: pos
        });
      }
    });
  });
};