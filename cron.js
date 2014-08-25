var config = require('./config/config');

var Ev = require('./ev');

var db = require('monk')(config.db);

var Events = db.get('events');
var Creators = db.get('creators');
var Locations = db.get('locations');

var winston = require('winston');

var async = require('async');

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

var accessToken = 'CAAGPsrwaxr4BAIu7rFCcSYYZBoo5apR7NRqId4ZCWTxedks7q6pFUceEZBZCGzTp5wuxJ89QSqB6WO93Pfv8phKTFjkA5s323Lgf3ll5esiXbznFGifhlRUQnkOIPCdCXpX7BQDAZCJCMR9F3TyutCxard4xGlt2r1J1wUsCTeBydIfwcgGbwcguJnkZBJ6kcAivh0aHabdAxGAT3eeDZC8';
graph.setAccessToken(accessToken);


var keywords = ['salsa', 'bachata', 'kizomba', 'porto', 'cubaine', 'cubana', 'semba', 'samba', 'merengue', 'tango', 'lambazouk', 'zouk', 'regueton', 'reggaeton', 'kuduru', 'chachacha', 'zumba']; //'suelta'

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

// var TimeQueue = require('timequeue'); 

// // create a queue with max 5 concurrency every second
// var q = new TimeQueue(worker, { concurrency: 5, every: 1000 });

// // push tasks onto the queue
// q.push(42, 24);
// q.push(2, 74);

// // optional callback when pushing tasks
// q.push(2, 2, function(err) {
//   // task finished
// });


var job = new cronJob('*/30 * * * * ', function() {
  newEvents = 0;
  var date = new Date();
  console.log(date.toString());

  fetchEventsFromKeywords();

  // updateAttending();
  // updateTagsAndPrice();

  fetchEventsFromUsers();
  // fetchEventsFromUsers2();
  // fetchEventsFromLocations();

}, null, true);


function paginate(page, term) {
  graph.get(page, function(err, res) {
    if (res) {
      if (res.paging && res.paging.next) {
        paginate(res.paging.next, term);
      }

      var evs = res.data;

      evs.forEach(function(ev) {
        Ev.fetch(ev.eid, term, function(ev){
          if (ev) {
            newEvents++;
            console.log(term + ': ' + ev.name);
          }
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
        // async.each(evs, function(ev, cb){ 
          var start_time = new Date(Date.parse(ev.start_time));
          var now = new Date();

          if (start_time > now || start_time.getFullYear() < 2016) {
            Ev.fetch(ev.id, term, function(ev) {
              if (ev) {
                newEvents++;
                console.log(term + ': ' + ev.name);
              }
            });
          }
        // }, function(err) {
        //   // numEvents.info(term + ': ' + newEvents);
        //   console.log(term + ': ' + newEvents);
        });
        // console.log(term + ': ' + newEvents)
      }
    }
  });
}

function fetchEventsFromUsers() {
  // async.each(users, function (user, next) {
  //   Ev.crawlUser(user, function(){
  //     next();
  //   });
  // });

  users.forEach(function(user) {
    Ev.getFromUser(user, null, false, function() {});
    // Ev.crawlUser(user, function(){});
  });
}

function fetchEventsFromUsers2() {
  Creators.find({}).each(function(creator) {
    Ev.getFromUser(creator.username, null, false, function() {});
    // Ev.crawlUser(creator.username, function(){});
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
    // var query = "SELECT attending_count FROM event WHERE eid =" + ev.eid;

    var query = "SELECT uid FROM event_member WHERE eid =" + ev.eid + " and rsvp_status = 'attending' LIMIT 50000";

    //ACA FALTA LABURAR

    Ev.runQuery(query, function(updatedEv) {
      if (updatedEv) {
        if (ev.attending_count !== updatedEv.attending_count) {
          ev.attending_count = updatedEv.attending_count;

          Events.updateById(ev._id, updatedEv);
          console.log('UPDATE ATTENDING :' + ev.name);
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

    updatedEv = Ev.runQuery(query, function(updatedEv) {
      if (updatedEv) {
        if (updatedEv[0]) {
          updatedEv = updatedEv[0];
          var price = Ev.getPrice(updatedEv);
          var tags = Ev.getTags(updatedEv);

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
