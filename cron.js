var request = require('request')
  , cheerio = require('cheerio')
  , async = require('async')
  , format = require('util').format;
  

var graph = require('fbgraph');

var accessToken = 'CAAGPsrwaxr4BADGXeox8qWYOtUe14RLbobooZA4DMJEzReUROPJvaxbnBzI3LGgNAn9qfDUefXGZBZBzZBXwxWgw3ZCyAhKe5qZAKEAveKo9VhzdOEEceUquxWaFrlEdPwXfJKEZBAnXqI8MeprXVGrCPaqJUfpUqZCkZBZBEjWpUvNoPQxE07tINZAjKSwuM34U8wZD';
graph.setAccessToken(accessToken);

var words = ['salsa', 'bachata', 'kizomba', 'porto', 'cubaine', 'cubana', 'semba', 'samba', 'merengue', 'tango'];
var users = [ 'EsenciaSalsaClub',
'clubastoriabcn',
'SevenDanceEscuelaBaile',
'manisero.delasalsa',
'antillasalsabarcelona',
'aguadelunasalsa',
'El.Cel.Badalona‎',
'pacomorenotheclub',
'mojito.barcelona',
'bailongu',
'kizombafusionmadrid',
'lelebahia',
'bikinitheoriginal',
'Camanaclub',
'thebeachmilano1',
'puertoalegre.zythum',
'TropicanaMilano',
'MangosTropCafe'];

var cronJob = require('cron').CronJob;



new cronJob('*/30 * * * * ', function() {
  var date = new Date();
  console.log(date.toString());

  for (var i = 0; i < words.length; i++) {
    search(words[i], function(numEvents){
      console.log(numEvents);
    });
  }

  updateAttendees();
  updateEventsFromUsers();

}, null, true);

function paginate(page) {
  graph.get(page, function(err, res) {
    if (res.paging && res.paging.next) {
      paginate(res.paging.next);
    }
    /*if (events) {
      events.forEach(function(ev) {
        graph.get(ev.id, function(err, res) {
          if (res) {
            Events.insert(res);
          }
        });
      });
    }*/
  });
}

var config = require('./config/config');
var db = require('monk')(config.db);
var Events = db.get('events');

function search(term, cb) {
  //var newEvents = 0;

  var searchOptions = {
    q: term,
    type: 'event',
    limit: 5000
  };

  var options = {
    /*timezone: "Europe/Paris",
    until: 'today'*/
  };

  graph.search(searchOptions, function(err, res) {
    if (err) {
      console.log(err);
      return;
    }

    if (res.data) {
      if (res.data.length) {
        /*if (res.paging && res.paging.next) {
          paginate(res.paging.next);
        }*/

        var events = res.data;
        events.forEach(function(ev, index) {
          //var lastEvent = false;
          //if (index === events.length - 1) lastEvent = true;

          fetchEvent(ev.id, term);
        });
      }
    }
  });
}

function fetchEvent(id, term) {
  id = parseInt(id);

  existsInDb(id, function(exists) {
    if (!exists) {
      var query = {
        user_event: "SELECT description, eid, location, name, privacy, start_time, end_time, update_time, ticket_uri, venue, pic, pic_big, pic_small, pic_square, pic_cover, has_profile_pic, pic, creator, timezone FROM event WHERE eid =" + id,
        event_attending: "SELECT uid FROM event_member WHERE eid IN (SELECT eid FROM #user_event) and rsvp_status = 'attending' LIMIT 50000",
        event_creator: "SELECT name, id FROM profile WHERE id IN (SELECT creator FROM #user_event)",
        event_unsure: "SELECT uid FROM event_member WHERE eid IN (SELECT eid FROM #user_event) and rsvp_status = 'unsure' LIMIT 50000"
      };

      //    console.log(query);
      graph.fql(query, function(err, res) {
        if (err) {
          console.log(err);
          return;
        }

        var data = res.data;

        if (data) {               
          if (data[0].fql_result_set[0]) {
            eve = data[0].fql_result_set[0];

            eve.attending = data[1].fql_result_set;
            eve.unsure = data[3].fql_result_set;

            eve.attendingNum = eve.attending.length;
            eve.unsureNum = eve.unsure.length;

            eve.creator = data[2].fql_result_set[0];

            eve.start_time = new Date(Date.parse(eve.start_time));
            eve.end_time = new Date(Date.parse(eve.end_time));

            //eve.location = (eve.venue.location) ? eve.venue.location : '' + (eve.venue.city) ? eve.venue.city : '' + (eve.venue.state) ? eve.venue.state : '' + (eve.venue.state) ? eve.venue.state : '';

            eve.place = [];

            if (eve.location) eve.place.push(eve.location);

            if (eve.venue) {
              if (eve.venue.street) eve.place.push(eve.venue.street);
              if (eve.venue.city) eve.place.push(eve.venue.city);
              if (eve.venue.state) eve.place.push(eve.venue.state);
              if (eve.venue.country) eve.place.push(eve.venue.country);
            }

            eve.place = eve.place.join(', ');

            eve.query = term;

            eve.saved = new Date();

            eve.tags = getTags(eve);

            eve.price = getPrice(eve);

            if (eve.place.indexOf('porto')) {
              if (term === 'porto') {
                eve = null;
              }
            }

            // if (eve) {
            //   if (!eve.tags.length) {
            //     eve = null;
            //   }
            // }

            if (eve) {
              eve.eid = parseInt(eve.eid);

              Events.insert(eve, function(err, newEv) {
                if (err) {
                  console.log(err);
                }
                else {
                  console.log(newEv.name);
                  //console.log(newEv.eid);

                  //newEvents++;
                  //if (lastEvent) cb(newEvents);
                }
              });
            }
            else {
              //if (lastEvent) cb(newEvents);
            }
          }
        }
        else {
          //if (lastEvent) cb(newEvents);
        }
      });
    }
    else {
      //if (lastEvent) cb(newEvents);
    }
  });
}

function getTags(eve) {
  var tags = [];

  var name = eve.name;
  var desc = eve.description;

  var text = name + ' ' + desc;
  text = text.toLowerCase();

  for (var i = 0; i < words.length; i++) {
    var str = words[i];
    var n = text.search(str);

    if (n > 0) {
      tags.push(words[i]);
    }
  }

  return tags;

  // if (n > 0) {
  //   console.log(n);
  // }

  /*Events.updateById(ev._id, ev, function(err, doc) {
    if (err) console.log(err);

    if (ev.attending.length < updatedEv.attending.length) {
      console.log(ev.name);
    }
  });*/
}

function getPrice(ev) {
  var desc = ev.description;

  // var n = desc.indexOf('$');
  // var n2 = desc.indexOf('€');
  // var n3 = desc.indexOf('euro');

  var regex = /(\d+[-\s]?[\$\£\€])|([\$\£\€][-\s]?\d+)/g;

  var match = desc.match(regex);

  if (match) {
    var numbers = match.join().removeAll("$").removeAll("£").removeAll("€").split(',');
    var min = numbers.min();

    var price = {
      full: match[numbers.indexOf(min.toString())],
      num: min
    };

    return price;
  }
}

Array.prototype.min = function() {
  return Math.min.apply(Math, this);
};

String.prototype.replaceAll = function(target, replacement) {
  return this.split(target).join(replacement);
};

String.prototype.removeAll = function(target) {
  return this.split(target).join('');
};

function updateEventsFromUsers() {
  var concurrency = 2;

  async.eachLimit(users, concurrency, function (user, next) {
    var options = {
      url: format('http://facebook.com/%s/events', user),
      headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1667.0 Safari/537.36'
      }
    };

    request(options, function (err, response, body) {
      if (err) throw err;

      body = body.removeAll('<!--').removeAll('-->');

      var $ = cheerio.load(body);

      var html = $('.fbTimelineEvents').html();

      if (html) {
        var $2 = cheerio.load(html);

        $2('.eventsGrid').each(function(i, elem) {
          var url = $2(this).find('a').attr('href');
          var re = /\d+/i;
          var id = url.match(re);
          fetchEvent(id[0], '');
        });
      }

      next();
    });
  });

}

function updateAttendees() {
  Events.find({}, function(err, evs) {
    evs.forEach(function(ev) {
      var query = {
        event_attending: "SELECT uid FROM event_member WHERE eid =" + ev.eid + " and rsvp_status = 'attending' LIMIT 50000",
        event_unsure: "SELECT uid FROM event_member WHERE eid =" + ev.eid + " and rsvp_status = 'unsure' LIMIT 50000"
      };

      graph.fql(query, function(err, res) {
        if (err) {
          console.log(err);
          return;
        }

        var events = res.data;

        if (events) {
          if (events[0].fql_result_set[0]) {
            var updatedEv = JSON.parse(JSON.stringify(ev));

            updatedEv.attending = events[0].fql_result_set;
            updatedEv.attendingNum = updatedEv.attending.length;
            updatedEv.unsure = events[1].fql_result_set;
            updatedEv.unsureNum = updatedEv.unsure.length;

            Events.updateById(ev._id, ev, function(err, doc) {
              if (err) console.log(err);

              // if (ev.attending.length < updatedEv.attending.length) {
                //console.log(ev.name);
              // }
            });
          }
        }
      });
    });
  });
}

function existsInDb(eid, cb) {
  var res;

  Events.findOne({
    eid: eid
  }).on('complete', function(err, doc) {
    if (err) console.log(err);

    if (!doc) {
      res = false;
    } else {
      res = true;
    }

    cb(res);
  });
}