var config = require('./config/config');

var Ev = require('./ev');

var db = require('monk')(config.db);

var Events = db.get('events');
var Users = db.get('users');
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


var keywords = ['salsa', 'bachata', 'kizomba', 'cubaine', 'cubana', 'semba', 'samba', 'merengue', 'tango', 'lambazouk', 'regueton', 'reggaeton', 'kuduru']; //'suelta', 'porto'

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


var job = new cronJob('*/30 * * * *', function() {
  newEvents = 0;
  var date = new Date();
  console.log(date.toString());

  fetchEventsFromKeywords();
  updatePopular();

  // fetchEventsFromUsers();
  // fetchEventsFromLocations();
}, null, true);

var job = new cronJob('0 */3 * * *', function() {
  var date = new Date();
  console.log(date.toString());
  updateWeek();
}, null, true);

function updatePopular() {
  var date = new Date();

  date.setSeconds(0);
  date.setMinutes(0);
  date.setHours(0);

  Events.find({
    start_time: {
      $gte: date
    }
  },
  {
    sort: {
      'attending_count': -1
    },
    limit: 30
  }).success(function(evs) {
    var eids = [];

    evs.forEach(function(ev) {
      eids.push(parseInt(ev.eid));
    });

    Ev.updateMultiple(eids);
  }).error(function(err) {
    console.log(err);
  });
}

function updateWeek() {
  var date = new Date();

  date.setSeconds(0);
  date.setMinutes(0);
  date.setHours(0);

  var datePlusWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7);

  Events.find({
    start_time: {
      $gte: date,
      $lt: datePlusWeek
    }
  }).success(function(evs) {
    var eids = [];

    evs.forEach(function(ev) {
      eids.push(parseInt(ev.eid));
    });

    Ev.updateMultiple(eids);
  }).error(function(err) {
    console.log(err);
  });
}

function paginate(page, term) {
  graph.get(page, function(err, res) {
    if (res) {
      if (res.paging && res.paging.next) {
        paginate(res.paging.next, term);
      }

      var evs = res.data;
      
      if (evs) {
        var eids = [];

        evs.forEach(function(ev) {
          eids.push(parseInt(ev.id));
        });

        Ev.fetchMultiple(eids, function(eves) {
          eves.forEach(function(ev) {
            Ev.save(ev, function(newEv) {
              console.log(newEv.name);
            });
          });
        });
      }
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

  // var options = {
  //   timezone: "Europe/Paris",
  //   since: 'now'
  // };

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

        var eids = [];

        evs.forEach(function(ev) {
          eids.push(parseInt(ev.id));
        });

        Ev.fetchMultiple(eids, function(eves) {
          eves.forEach(function(eve) {
            Ev.save(eve, function(newEv) {
              console.log(newEv.name + ': ' + newEv.name);
            });
          });
        });
      }
    }
  });
}

function fetchEventsFromUsers() {
  Creators.find({}).each(function(creator) {
    Ev.getFromUser(creator.username, null, false, function() {});
  });

  Users.find({}).each(function(user) {
    Ev.getFromUser(user.username, null, false, function() {});
  });
}

function fetchEventsFromLocations() {
  Locations.find({}).each(function(location) {
    fetchEventsFromKeywords(location.location);
  });
}