var config = require('./config/config');

var Ev = require('./ev');

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
        Ev.fetch(ev.eid, term, function(ev){
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

        // evs.forEach(function(ev) {
        async.each(evs, function(ev, cb){ 
          Ev.fetch(ev.id, term, function(ev){
            newEvents++;
            console.log(term + ': ' + ev.name);
            cb();
          });
        }, function(err) {
          // numEvents.info(term + ': ' + newEvents);
          console.log(term + ': ' + newEvents);
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
    Ev.crawlUser(user);
  });
}

function fetchEventsFromUsers2() {
  Creators.find({}).each(function(creator) {
    Ev.crawlUser(creator.username);
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
