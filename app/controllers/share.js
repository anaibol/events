var graph = require('fbgraph');

var Events = global.db.get('events');

var Ev = require('../../ev.js');

var accessToken = 'CAAVebA5FD2cBAG6RgXiCc6NphVDwzL0SOxznVWSZBI5AOmtMB2dZChEnnHWHMBgtBdvPYJT0XkHRUK1x89ZAr6NIHadi0UmcAPn7qFACLM9sEiEMIHiZBPZAGHwU3lRRromjwz47ovc8kYAweRoSBN0ehvXXrG98Rf7Y88RP7ddOQ2K2PYeBAqEZBmCw6QEGctZARkOLyKPxrRLm6alnmlvE0hg3od7GssZD';

var actions = global.db.get('actions');

var Pro = require('../services/promoter.js');

var moment = require('moment-timezone');


function convertToUTC(date, timezone) {
  date = new Date(date);

  if (!timezone) {
    return date;
  }

  var transformed = moment(date.getTime()).tz(timezone).format("YYYY/MM/DD hh:mm A");
  transformed = new Date(transformed);

  return transformed;
}

exports.saveShare = function (post_id, event_id, user_id, data) {

      var action = {
        user_id: user_id,
        post_id: post_id,
        event_id: event_id,
        type: 'share',
        creation_date: new Date(),
        active: true,
        data: data
      }

      actions.insert(action, function(err) {
        if (err)
          console.log(err);
        else
        {
          Pro.associatePlayer(user_id, event_id);
          console.log(action);
        }
      });

}

exports.share = function(req, res)
{
  if (!req.user)
  {
    res.json({error: "Please log-in"});
    return (null);
  }

  var months = [ "janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre" ];
  var days = [ "Lundi", "Mardi", "Mecredi", "Jeudi", "Vendredi", "Samedi",
    "Dimanche" ];
  /*var months = [ "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december" ];
  var days = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
    "Sunday" ];*/


  graph.setAccessToken(accessToken);
  console.log("Facebook publishing...");
  console.log("Event id: " + req.params.eid);
  Ev.findById(req.params.eid, function(ev) {
    if (ev)
      console.log("Mongodb found something");
    else
    {
      console.log("Mongodb found nothing");
      console.log("EXIT");
      res.json({error: "Bad event ID"});
      return (0);
    }

    if (ev.name.length > 64)
      var name = ev.name.substring(0,64) + "..."
    else
      var name = ev.name

    var wallPost = {
      name: "Share this event: to win some champagne!"
      link: "www.wooepa.com/" + ev.slug + "/" + ev.eid,
      picture: ev.pic_cover.source,
      description: "",
      message: ""
    };

    wallPost.description += name + ' \n'
    if (ev.location)
    {
      wallPost.description += "@ " + ev.location
      if (ev.venue)
      {
        if (ev.venue.city)
        {
          wallPost.description += ", " + ev.venue.city
          if (ev.venue.country)
            wallPost.description += ", "
        }
        if (ev.venue.country)
          wallPost.description += ev.venue.country + "\n"
      }
    }

    if (ev.start_time)
      ev.start_time = convertToUTC(ev.start_time, ev.timezone);
    {
      wallPost.description += "W! "

      var currentdate = new Date();

      console.log(currentdate.getDate());

      if (ev.start_time.getDate() == currentdate.getDate())
        wallPost.description += "Aujourd'hui "
      else
        wallPost.description += days[ev.start_time.getDay() - 1] + " "
      + ev.start_time.getDate() + " " 
      + months[ev.start_time.getMonth()]

      wallPost.description += " à " + ev.start_time.getHours() + "h"
      
      if (ev.start_time.getMinutes() < 10)
        wallPost.description += "0"
      
      wallPost.description += ev.start_time.getMinutes() + "\n"
    }
    if (ev.attending_count)
    {
      if (ev.attending_count > 10)
      {
        wallPost.description += 'A! ' + ev.attending_count + ' \n'

      }  
    }  
    if (ev.price.full)
    {
      if (ev.price.num == 0)
          wallPost.description += '$ #'+ ev.price.full +' \n'
      else
          wallPost.description += "$ " + ev.price.full + " \n"
    }
    for(i = 0; i < 3; i++)
    {
      if (ev.tags[i])
        wallPost.description += '#' + Ev.capitalize(ev.tags[i])
      if (i < 2 && ev.tags[i + 1])
        wallPost.description += " "
    }

    wallPost.message = "Untel is offering a botlle of champagne whom will best promote his or her event. Fency some Champagne? \n Wooepa helps promoters to boost attendance through social media strategies. " 

    graph.post('/' + req.user.facebook.id + '/feed' + '?access_token=' + req.user.accessToken, wallPost, function(err, result) {
      if (err) {
        console.log(err);
        res.json({error: "Please refresh your facebook connexion"});
      }
      else if (result) {
        console.log(result);

        var str = result.id;

        var splited_result = str.split('_');

        var post_id = splited_result[1];

        var data = [];

        graph.get('/' + req.user.facebook.id + '_' + post_id + '?access_token=' + req.user.accessToken, function(err, result) {
            if (err) {
              console.log(err);
              res.json({error: "Please refresh your facebook connexion"});
            }
            else
            {
              exports.saveShare(post_id, req.params.eid, req.user.facebook.id, result);
              res.json(ev);
            }
        });
        
      }
        
    });
  });

};

