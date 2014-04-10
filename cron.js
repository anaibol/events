var request = require('request')
  , cheerio = require('cheerio')
  , async = require('async')
  , format = require('util').format;
  
var config = require('./config/config');
var db = require('monk')(config.db);
var Events = db.get('events');

var winston = require('winston');

winston.loggers.add('eventNames', {
  console: {
    level: 'info',
    colorize: 'false',
    label: 'event names'
  },
  file: {
    filename: __dirname + '/public/logs/eventNames.json'
  }
});

winston.loggers.add('numEvents', {
  console: {
    level: 'info',
    colorize: 'true',
    label: 'num events'
  },
  file: {
    filename: __dirname + '/public/logs/numEvents.json'
  }
});

var eventNames = winston.loggers.get('eventNames');
var numEvents = winston.loggers.get('numEvents');

var graph = require('fbgraph');

var accessToken = 'CAAGPsrwaxr4BADGXeox8qWYOtUe14RLbobooZA4DMJEzReUROPJvaxbnBzI3LGgNAn9qfDUefXGZBZBzZBXwxWgw3ZCyAhKe5qZAKEAveKo9VhzdOEEceUquxWaFrlEdPwXfJKEZBAnXqI8MeprXVGrCPaqJUfpUqZCkZBZBEjWpUvNoPQxE07tINZAjKSwuM34U8wZD';
graph.setAccessToken(accessToken);

var keywords = ['salsa', 'bachata', 'kizomba', 'porto', 'cubaine', 'cubana', 'semba', 'samba', 'merengue', 'tango', 'lambazouk', 'regueton', 'reggaeton'];
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
var newEvents;


// new cronJob('*/30 * * * * ', function() {
  newEvents = 0;
  var date = new Date();
  console.log(date.toString());


  fetchEventsFromKeywords();

  //updateAttendees();
  fetchEventsFromUsers();
  fetchEventsFromUsers2();
  fetchEventsFromLocations();

// }, null, true);

function paginate(page, term) {
  graph.get(page, function(err, res) {
    if (res) {
      if (res.paging && res.paging.next) {
        paginate(res.paging.next, term);
      }

      var events = res.data;

      events.forEach(function(ev) {
        fetchEvent(ev.id, term, function(){
          newEvents++;
        });
      });
    }
  });
}

function fetchEventsFromKeywords() {
  for (var i = 0; i < keywords.length; i++) {
    searchEventsFromKeyword(keywords[i]);
  }
}

function searchEventsFromKeyword(term, cb) {
  var searchOptions = {
    q: term,
    type: 'event',
    limit: 5000,
  };

  var options = {
    /*timezone: "Europe/Paris",*/
    since: 'now'
  };

  graph.search(searchOptions, function(err, res) {
    if (err) {
      console.log(err);
      return;
    }

    if (res.data) {
      if (res.data.length) {
        // if (res.paging && res.paging.next) {
        //   paginate(res.paging.next, term);
        // }

        var events = res.data;

        async.each(events, function(ev, cb){
          fetchEvent(ev.id, term, function(ev){
            newEvents++;
            console.log(term + ': ' + ev.name);
            cb();
          });
        }, function(err) {
          numEvents.info(term + ': ' + newEvents);
        });
      }
    }
  });
}

function fetchEvent(id, term, cb) {
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
                  //console.log(newEv.name);
                  //console.log(newEv.eid);
                  cb(newEv);
                }
              });
            }
          }
        }
      });
    }
  });
}

function getTags(eve) {
  var tags = [];

  var name = eve.name;
  var desc = eve.description;

  var text = name + ' ' + desc;
  text = text.toLowerCase();

  for (var i = 0; i < keywords.length; i++) {
    var str = keywords[i];
    var n = text.search(str);

    if (n > 0) {
      tags.push(keywords[i]);
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

function crawlUserEvents(userName, cb) {
  var options = {
    url: format('http://facebook.com/%s/events', userName),
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

        fetchEvent(id[0], '', function(){
          newEvents++;
        });
      });
    }
    cb();
  });
}

function fetchEventsFromUsers() {
  async.each(users, function (user, next) {
    crawlUserEvents(user, function(){
      next();
    });
  });
}

function fetchEventsFromUsers2() {
  Events.find({
    start_time: {
      $gte: date
    }
  }, function(err, evs) {
    var creatorsIds = [];
    async.each(evs, function (ev, next) {
      if (ev.creator) {
        if (creatorsIds.indexOf(ev.creator.id) < 0) {
          creatorsIds.push(ev.creator.id);

          graph.get(ev.creator.id, function(err, res) {
            if (err) {
              console.log(err);
              return;
            }

            crawlUserEvents(res.username, function(){
              next();
            });
          });
        }
      }
    });
  });
}

function fetchEventsFromLocations() {
  Events.find({
    start_time: {
      $gte: date
    }
  }, function(err, evs) {
    var locations = [];
    async.each(evs, function (ev, next) {
      if (locations.indexOf(ev.location) < 0) {
        locations.push(ev.location);
        searchEventsFromKeyword(ev.location);
      }
    });
  });
}

function updateAttendees() {
  var date = new Date();

  date.setSeconds(0);
  date.setMinutes(0);
  date.setHours(0);

  Events.find({
    start_time: {
      $gte: date
    }
  }, function(err, evs) {
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