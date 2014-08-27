var graph = require('fbgraph');

var Events = global.db.get('events');

var Ev = require('../../ev.js');

var accessToken = 'CAAVebA5FD2cBANk1iZABMISk0GS5MkjMes0gNZBJg2DpvUgXKfZAoXWxQab3L1AMXLR6M50ZBVm5h7RZCQM3jXXfRUppsGqLkaXYCsZBOoedO8q8YB6t7JZAGXIGs33WJBWIAKLtZB6AAtvVclsIDOgIK9k76f7mHyYsG5WZAZBSpM9tKUtOaf2xBcTSnTgflEtclToUcLKkb5ixfJkceZC78hzBE1mGGuZCZARsZD';

exports.share = function(req, res)
{
  var months = [ "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december" ];
  var days = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
    "Sunday" ];


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
      name: name,
      link: "www.wooepa.com/" + ev.slug + "/" + ev.eid,
      picture: ev.pic_cover.source,
      description: ""
    };

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
    {
      wallPost.description += "W! "

      var currentdate = new Date();

      console.log(currentdate.getDate());

      if (ev.start_time.getDate() == currentdate.getDate())
        wallPost.description += "Today "
      else
        wallPost.description += days[ev.start_time.getDay()] + " "
      + ev.start_time.getDate() + " " 
      + months[ev.start_time.getMonth()]

      wallPost.description += " at " + ev.start_time.getHours() + "h"
      
      if (ev.start_time.getMinutes() < 10)
        wallPost.description += "0"
      
      wallPost.description += ev.start_time.getMinutes() + "\n"
    }

    if (ev.price.full)
      wallPost.description += "$ " + ev.price.full + "\n"

    wallPost.description += "+" 

    if (ev.tags[0])
      wallPost.description += " de "

    for(i = 0; i < 3; i++)
    {
      if (ev.tags[i])
        wallPost.description += Ev.capitalize(ev.tags[i])
      if (i < 2 && ev.tags[i + 1])
        wallPost.description += " "
    }
  
    wallPost.description += " -> www.wooepa.com"

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


