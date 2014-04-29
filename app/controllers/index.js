'use strict';

var request = require('request');

exports.render = function(req, res) {
	console.log(req.user)
  res.render('index', {
    title: 'Wooeva',
    user: req.user ? JSON.stringify(req.user) : 'null',
    fbAppId: global.fbAppId,
    //events: events,
    //pos: pos
  });
};