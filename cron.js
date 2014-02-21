var graph = require('fbgraph');

var accessToken = 'CAAVebA5FD2cBABTDkJhuEQ7THoKVTWL9CTpeW5m02te18SO5WRMBtqJgZADUaZC5SnfrvaVrD9vMJJvZAr3o7mVqhk1LZCZBTsi6FWaJRIGxFwHHAJ2ZCCv4EfYHjbiRGVZAYSe2NxiEZCpTQXUnH4xUr9gdoRmo6ASu10BciGmIzZC73BJnsDzBMZAZASmkhQ012EZD';
graph.setAccessToken(accessToken);

function paginate(page) {
  graph.get(page, function(err, res) {
    if (res.paging && res.paging.next) {
      paginate(res.paging.next);
    }
    /*if (res.data) {
      res.data.forEach(function(ev) {
        graph.get(ev.id, function(err, res) {
          if (res) {
            Events.insert(res);
          }
        });
      });
    }*/
  });
}

var db = require('monk')('localhost/wooeva-dev');
var Events = db.get('events');

function search(query) {

  var searchOptions = {
    q: query,
    type: "event"
  };

  var options = {
    /*timezone: "Europe/Paris",
    until: 'today'*/
  };

  graph.search(searchOptions, function(err, res) {
    if (err) console.log(err);
    if (res.data) {
      if (res.data.length) {
        if (res.paging && res.paging.next) {
          paginate(res.paging.next);
        }
        res.data.forEach(function(ev) {
          Events.findOne({
            id: ev.id
          }).on('complete', function(err, doc) {
            if (err) console.log(err);

            if (!doc) {
              if (ev) {
                var query = "SELECT description, end_time, eid, location, name, privacy, start_time, end_time, update_time, ticket_uri, venue, pic_big, pic_square, pic_cover, has_profile_pic, pic, creator, timezone FROM event WHERE eid = " + ev.id;

                graph.fql(query, function(err, evs) {
                  if (err) console.log(err);
                  if (evs.data) {
                    if (evs.data.length) {
                      console.log(evs.data[0]);
                      Events.insert(evs.data[0], function(err, doc) {
                        if (doc) console.log(doc.name);
                      });
                    }
                  }
                });
              }
              //} else {
              //  console.log(doc.id);
            }
          });
        });
      }
    }
  });

}
//var cronJob = require('cron').CronJob;
//new cronJob('*/5 * * * * ', function() {
var date = new Date();
console.log(date.toString());

search('paris');
search('salsa');
search('bachata');
search('kizomba');
search('porto');
search('cubaine');
search('semba ');
search('paris');

//}, null, true);