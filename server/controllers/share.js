var graph = require('fbgraph');

var Events = global.db.get('events');

var Ev = require('../ev.js');

var actions = global.db.get('actions');

var moment = require('moment-timezone');
var Game = require("../services/game.js")

function convertToUTC(date, timezone) {
  date = new Date(date);

  if (!timezone) {
    return date;
  }

  var transformed = moment(date.getTime()).tz(timezone).format("YYYY/MM/DD hh:mm A");
  transformed = new Date(transformed);

  return transformed;
}

exports.saveShare = function(post_id, event_id, user_id, data) {

  var action = {
    user_id: user_id,
    post_id: post_id,
    event_id: event_id,
    type: 'share',
    creation_date: new Date(),
    active: true,
    data: data
  }
  actions.find({user_id:user_id, event_id:event_id}, function(err, act){
    if (act.length <= 1)
    {
      Game.AddPoints(user_id, event_id, 2);
    }
  });
  actions.insert(action, function(err) {
    if (err)
      console.log(err);
  });
}

exports.share = function(req, res) {
  if (!req.user) {
    res.json({
      error: "Please log-in"
    });
    return (null);
  }
  var months = ["janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre"
  ];
  var days = ["Lundi", "Mardi", "Mecredi", "Jeudi", "Vendredi", "Samedi",
    "Dimanche"
  ];

  Ev.findById(req.params.eid, function(ev) {
    if (!ev)
      return (0);
    if (ev.name.length > 56)
      var name = ev.name.substring(0, 56) + "..."
    else
      var name = ev.name

    if (ev.pic_cover)
      var pic = ev.pic_cover.source;
    else
      var pic = "";

    var wallPost = {
      name: name,
      link: "www.wooepa.com/" + ev.slug + "/" + ev.eid,
      picture: pic,
      description: "",
      message: ""
    };

    if (ev.location) {
      wallPost.description += "@ " + ev.location
      if (ev.venue) {
        if (ev.venue.city) {
          wallPost.description += ", " + ev.venue.city
          if (ev.venue.country)
            wallPost.description += ", "
        }
        if (ev.venue.country)
          wallPost.description += ev.venue.country + "\n"
      }
    }

    if (ev.start_time)
      ev.start_time = convertToUTC(ev.start_time, ev.timezone); {
      wallPost.description += "W! "

      var currentdate = new Date();

      console.log(currentdate.getDate());

      if (ev.start_time.getDate() == currentdate.getDate())
        wallPost.description += "Aujourd'hui "
      else
        wallPost.description += days[ev.start_time.getDay() - 1] + " " + ev.start_time.getDate() + " " + months[ev.start_time.getMonth()]

      wallPost.description += " à " + ev.start_time.getHours() + "h"

      if (ev.start_time.getMinutes() < 10)
        wallPost.description += "0"

      wallPost.description += ev.start_time.getMinutes() + "\n"
    }
    if (ev.attending_count) {
      if (ev.attending_count > 10) {
        wallPost.description += 'A! ' + ev.attending_count + ' \n'

      }
    }
    if (ev.price.full) {
      if (ev.price.num == 0)
        wallPost.description += '$ #' + ev.price.full + ' \n'
      else
        wallPost.description += "$ " + ev.price.full + " \n"
    }
    for (i = 0; i < 3; i++) {
      if (ev.tags[i])
        wallPost.description += '#' + Ev.capitalize(ev.tags[i])
      if (i < 2 && ev.tags[i + 1])
        wallPost.description += " "
    }
    graph.post('/' + req.user.facebook.id + '/feed' + '?access_token=' + req.user.accessToken, wallPost, function(err, result) {
      if (err) {
        console.log(err);
        res.json({
          error: "Please refresh your facebook connexion"
        });
      } else if (result) {
        console.log(result);

        var str = result.id;

        var splited_result = str.split('_');

        var post_id = splited_result[1];

        var data = [];

        graph.get('/' + req.user.facebook.id + '_' + post_id + '?access_token=' + req.user.accessToken, function(err, result) {
          if (err) {
            console.log(err);
            res.json({
              error: "Please refresh your facebook connexion"
            });
          } else {
            exports.saveShare(post_id, req.params.eid, req.user.facebook.id, result);
            res.json(ev);
          }
        });

      }

    });
  });

};