'use strict';

var mongoose = require('mongoose'),
  Event = mongoose.model('Event');

exports.render = function(req, res) {
  Event.findFromNow().exec(function(err, events) {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
  	  res.render('index', {
  	    title: 'Wooeva',
  	    user: req.user ? JSON.stringify(req.user) : 'null',
  	    fbAppId: global.fbAppId,
  	    events: events
  	  });
    }
  });
};