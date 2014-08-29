var graph = require('fbgraph');

var Events = global.db.get('events');

var Ev = require('../../ev.js');

var accessToken = 'CAAGPsrwaxr4BAIu7rFCcSYYZBoo5apR7NRqId4ZCWTxedks7q6pFUceEZBZCGzTp5wuxJ89QSqB6WO93Pfv8phKTFjkA5s323Lgf3ll5esiXbznFGifhlRUQnkOIPCdCXpX7BQDAZCJCMR9F3TyutCxard4xGlt2r1J1wUsCTeBydIfwcgGbwcguJnkZBJ6kcAivh0aHabdAxGAT3eeDZC8';

exports.share = function(req, res)
{
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
      description: "",
      message: ""
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
        wallPost.description += "Aujourd'hui "
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

    wallPost.message += wallPost.description

    console.log(req.user.accessToken);

    graph.post('/' + req.user.facebook.id + '/feed' + '?access_token=' + req.user.accessToken, wallPost, function(err, result) {
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


