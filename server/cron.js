global.rootDir = __dirname + '/';
global.configDir = rootDir + 'config';
global.config = require(configDir + '/env/' + process.env.NODE_ENV + '.js');

var Ev = require('./ev');

var db = require('monk')(config.db);
var Events = db.get('events');
var Pho = require('./services/photos.js');

var Upd = require('./services/update.js');

var Events = db.get('events');
var Users = db.get('users');
var Creators = db.get('creators');
var Locations = db.get('locations');

var graph = require('fbgraph');

var accessToken = 'CAAGPsrwaxr4BAB7D3ZBNlZAf7R5vPWZAu6xVZAD7gq1hdzMOVDsPq3Bsxl2AAojoGlDcQcEAzZAtmyDrOlrwDpOG7N64BTdloH0tDia3OPRb0fRLBXiLKATFMPzRoE0estUT8z6gz7Mb73yBLh3oXXFCt8UmI5fe3pLg0cUi1ZAamY02PZC25OxBYwMKYKMJKlzedF1CmIoh7Iekah5tJQ7';
graph.setAccessToken(accessToken);

var keywords = ['salsa', 'bachata', 'kizomba', 'cubaine', 'cubana', 'semba', 'samba', 'merengue', 'tango', 'lambazouk', 'regueton', 'reggaeton', 'kuduru']; //'suelta', 'porto'

var users = ['EsenciaSalsaClub',
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
  'victorsuco'
];

var cronJob = require('cron').CronJob;

var env = process.env.NODE_ENV || 'development';

if (env === 'production') {
  var job = new cronJob('0 */1 * * *', function() {
    Pho.searchPhotoEvents(db, function(err) {
      if (err)
        console.log(err);
      console.log("---- UPDATE Pictures of week DONE ----")
    });
  }, null, true);

  var job = new cronJob('*/1 * * * *', function() {
    Upd.updateLastMonthEvents(function(err) {
      if (err)
        console.log(err);
      console.log("---- UPDATE Event of last month DONE ----")
    });
  });

  var job = new cronJob('*/30 * * * *', function() {
    var date = new Date();
    console.log(date.toString());

    fetchEventsFromKeywords();
    updatePopular();

    // fetchEventsFromUsers();
    // fetchEventsFromLocations();
  }, null, true);

  var job = new cronJob('*/60 * * * *', function() {
    // var date = new Date();
    console.log(date.toString());
    updatePrioritaires();
  }, null, true);

  var job = new cronJob('0 */1 * * *', function() {
    var date = new Date();
    console.log(date.toString());
    updateWeek();
  }, null, true);

} else {
  fetchEventsFromKeywords();
}

function updatePopular() {
  var date = new Date();

  date.setSeconds(0);
  date.setMinutes(0);
  date.setHours(0);

  Events.find({
    end_time: {
      $gte: date
    }
  }, {
    sort: {
      'attending_count': -1
    },
    limit: 50
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
    end_time: {
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

function updatePrioritaires() {
  var date = new Date();

  date.setSeconds(0);
  date.setMinutes(0);
  date.setHours(0);

  var datePlusWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7);

  Users.find({}).success(function(users) {
    var uids = [];

    users.forEach(function(user) {
      uids.push(parseInt(user.facebook.id));
    });
    console.log(uids);
    Events.find({
      end_time: {
        $gte: date
      },
      attending: {
        $in: uids
      }
    }).success(function(evs) {
      console.log(evs);
      var eids = [];

      evs.forEach(function(ev) {
        eids.push(parseInt(ev.eid));
      });

      Ev.updateMultiple(eids);
    }).error(function(err) {
      console.log(err);
    });
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

        Ev.fetchMultiple(eids, term, true, function(eves) {});
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

  var options = {
    // timezone: "Europe/Paris",
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

        var eids = [];

        evs.forEach(function(ev) {
          eids.push(parseInt(ev.id));
        });

        Ev.fetchMultiple(eids, term, true, function(eves) {});
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