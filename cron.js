var request = require('request')
  , cheerio = require('cheerio')
  , async = require('async')
  , format = require('util').format;

var config = require('./config/config');
var db = require('monk')(config.db);
var Events = db.get('events');
var Creators = db.get('creators');
var Locations = db.get('locations');

var winston = require('winston');

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

var numEvents = winston.loggers.get('numEvents');

var graph = require('fbgraph');

var accessToken = 'CAAGPsrwaxr4BADGXeox8qWYOtUe14RLbobooZA4DMJEzReUROPJvaxbnBzI3LGgNAn9qfDUefXGZBZBzZBXwxWgw3ZCyAhKe5qZAKEAveKo9VhzdOEEceUquxWaFrlEdPwXfJKEZBAnXqI8MeprXVGrCPaqJUfpUqZCkZBZBEjWpUvNoPQxE07tINZAjKSwuM34U8wZD';
graph.setAccessToken(accessToken);

var keywords = ['salsa', 'bachata', 'kizomba', 'porto', 'cubaine', 'cubana', 'semba', 'samba', 'merengue', 'tango', 'lambazouk', 'regueton', 'reggaeton', 'kuduru']; //'suelta'
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
'MangosTropCafe',
'victorsuco'];

var cronJob = require('cron').CronJob;
var newEvents;


// new cronJob('*/30 * * * * ', function() {
  newEvents = 0;
  var date = new Date();
  console.log(date.toString());

  fetchEventsFromKeywords();

  updateAttending();
  updateTagsAndPrice();
  fetchEventsFromUsers();
  // fetchEventsFromUsers2();
  // fetchEventsFromLocations();

// }, null, true);

function paginate(page, term) {
  graph.get(page, function(err, res) {
    if (res) {
      if (res.paging && res.paging.next) {
        paginate(res.paging.next, term);
      }

      var evs = res.data;

      evs.forEach(function(ev) {
        fetchEvent(ev.eid, term, function(ev){
          newEvents++;
          console.log(term + ': ' + ev.name);
        });
      });
    }
  });
}

function fetchEventsFromKeywords() {
  keywords.forEach(function(keyword) {
    fetchEventsFromKeyword(keyword);
  });
}

function fetchEventsFromKeyword(term) {
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

        var evs = res.data;

        evs.forEach(function(ev) {
        // async.each(events, function(ev, cb){ 
          fetchEvent(ev.id, term, function(ev){
            newEvents++;
            console.log(term + ': ' + ev.name);
            // cb();
          });
        // }, function(err) {
        //   numEvents.info(term + ': ' + newEvents);
        });
      }
    }
  });
}

function fetchEvent(eid, term, cb) {
  eid = parseInt(eid);

  existsInDb(eid, function(exists) {
    if (!exists) {
      var query = {
        user_event: "SELECT description, attending_count, eid, location, name, privacy, start_time, end_time, update_time, ticket_uri, venue, pic, pic_big, pic_small, pic_square, pic_cover, has_profile_pic, pic, creator, timezone FROM event WHERE eid =" + eid,
        // event_attending: "SELECT uid FROM event_member WHERE eid IN (SELECT eid FROM #user_event) and rsvp_status = 'attending' LIMIT 50000",
        event_creator: "SELECT name, id FROM profile WHERE id IN (SELECT creator FROM #user_event)",
        //event_unsure: "SELECT uid FROM event_member WHERE eid IN (SELECT eid FROM #user_event) and rsvp_status = 'unsure' LIMIT 50000"
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

            eve.eid = parseInt(eve.eid);

            eve.creator = data[1].fql_result_set[0];

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

            if (term == 'user') {
              if (eve) {
                if (!eve.tags.length) {
                  eve = null;
                }
              }
            }

            if (eve) {
              Events.insert(eve, function(err, newEv) {
                if (err) {
                  // console.log(err);
                }
                else {
                  if (eve) {
                    if (eve.location && eve.venue) {
                      Locations.insert({location: eve.location, venue: eve.venue, place: eve.place});
                    }

                    if (eve.creator) {
                      Creators.insert({fid: eve.creator.id, username: eve.creator.username});
                    }
                  }

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
}

function getPrice(ev) {
  var desc = ev.description.toLowerCase();

  // var n = desc.indexOf('$');
  // var n2 = desc.indexOf('€');
  // var n3 = desc.indexOf('euro');

  var regex = /(\d+[-\s]?[\$\£\€])|([\$\£\€][-\s]?\d+)/g;

  var match = desc.match(regex);

  if (match) {
    var numbers = match.join().removeAll("$").removeAll("£").removeAll("€").split(',');
    var min = numbers.min();

    if (min > 1000) {
      return {};
    }

    var price = {
      full: match[numbers.indexOf(min.toString())],
      num: min
    };

    return price;
  }
  else {
    var regex2 = /((gratuit)|(free)|(gratis))/;

    var match2 = desc.match(regex2);

    if (match2) {
      var price = {
        full: match2[0].toUpperCase(),
        num: 0
      };

      return price;
    }
    else {
      return {};
    }
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

function crawlUserEvents(userName) {
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

        fetchEvent(id[0], 'user', function(ev){
          newEvents++;
          console.log(userName + ': ' + ev.name);
        });
      });
    }
  });
}

function fetchEventsFromUsers() {
  // async.each(users, function (user, next) {
  //   crawlUserEvents(user, function(){
  //     next();
  //   });
  // });

  users.forEach(function(user) {
    crawlUserEvents(user);
  });
}

function fetchEventsFromUsers2() {
  Creators.find({}).each(function(creator) {
    crawlUserEvents(creator.username);
  });
}

function fetchEventsFromLocations() {
  Locations.find({}).each(function(location) {
    fetchEventsFromKeywords(location.location);
  });
}

function updateAttending() {
  var date = new Date();

  date.setSeconds(0);
  date.setMinutes(0);
  date.setHours(0);

  Events.find({
    start_time: {
      $gte: date
    }
  }).each(function(ev) {
    var query = "SELECT attending_count FROM event WHERE eid =" + ev.eid;

    graph.fql(query, function(err, res) {
      if (err) {
        console.log(err);
        return;
      }

      var updatedEv = res.data;

      if (updatedEv) {
        if (ev.attending_count !== updatedEv.attending_count) {
          ev.attending_count = updatedEv.attending_count;

          Events.updateById(ev._id, updatedEv);
          // console.log('UPDATE ATTENDING :' + ev.name);
        }
      }
    });
  });
}

function updateTagsAndPrice() {
  var date = new Date();

  date.setSeconds(0);
  date.setMinutes(0);
  date.setHours(0);

  Events.find({
    start_time: {
      $gte: date
    }
  }).each(function(ev) {
    var query = "SELECT description FROM event WHERE eid =" + ev.eid;

    graph.fql(query, function(err, res) {
      if (err) {
        console.log(err);
        return;
      }

      var updatedEv = res.data;

      if (updatedEv) {
        if (updatedEv[0]) {
          updatedEv = updatedEv[0];
          var price = getPrice(updatedEv);
          var tags = getTags(updatedEv);

          ev.price = price;
          ev.tags = tags;

          Events.updateById(ev._id, ev);
          // console.log('UPDATE PRICE :' + ev.name);
        }
      }
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