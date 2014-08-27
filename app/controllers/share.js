var graph = require('fbgraph');

var Events = global.db.get('events');

var Ev = require('../../ev.js');

var accessToken = 'CAAVebA5FD2cBANk1iZABMISk0GS5MkjMes0gNZBJg2DpvUgXKfZAoXWxQab3L1AMXLR6M50ZBVm5h7RZCQM3jXXfRUppsGqLkaXYCsZBOoedO8q8YB6t7JZAGXIGs33WJBWIAKLtZB6AAtvVclsIDOgIK9k76f7mHyYsG5WZAZBSpM9tKUtOaf2xBcTSnTgflEtclToUcLKkb5ixfJkceZC78hzBE1mGGuZCZARsZD';

exports.share = function(req, res)
{
  var months = [ "janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre" ];
  var days = [ "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi",
    "Dimanche" ];


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
      return (0);
    }

    if (ev.name.length > 64)
      var name = ev.name.substring(0,64) + "..."
    else
      var name = ev.name

    var wallPost = {
      message: name + "\n",
    };

    if (ev.location)
    {
      wallPost.message += "@ " + ev.location
      if (ev.venue)
      {
        if (ev.venue.city)
        {
          wallPost.message += ", " + ev.venue.city
          if (ev.venue.country)
            wallPost.message += ", "
        }
        if (ev.venue.country)
          wallPost.message += ev.venue.country + "\n"
      }
    }

    if (ev.start_time)
    {
      wallPost.message += "W! "

      var currentdate = new Date();

      console.log(currentdate.getDate());

      if (ev.start_time.getDate() == currentdate.getDate())
        wallPost.message += "Today "
      else
        wallPost.message += days[ev.start_time.getDay()] + " "
      + ev.start_time.getDate() + " " 
      + months[ev.start_time.getMonth()]

      wallPost.message += " à " + ev.start_time.getHours() + "h"
      
      if (ev.start_time.getMinutes() < 10)
        wallPost.message += "0"
      
      wallPost.message += ev.start_time.getMinutes() + "\n"
    }

    if (ev.price.full)
      wallPost.message += "$ " + ev.price.full + "\n"

    wallPost.message += "+" 

    if (ev.tags[0])
      wallPost.message += " de "

    for(i = 0; i < 3; i++)
    {
      if (ev.tags[i])
        wallPost.message += Ev.capitalize(ev.tags[i])
      if (i < 2 && ev.tags[i + 1])
        wallPost.message += " "
    }
  
    wallPost.message += " -> www.wooepa.com"

    graph.post('/' + req.user.facebook.id + '/feed' + '?access_token=' + accessToken, wallPost, function(err, result) {
      if (err) {
        console.log(err);
      }
      else {
        console.log(result);
        res.json(ev);
      }
    });
  });

};


