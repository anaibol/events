var graph = require('fbgraph');

var accessToken = 'CAAKvXHZBBCIUBAGXMqZCmo1TBn9Q1YdibOZCrB5Cw9xKA2pmQdaFNV5qGmY3VieLzImZBJWZBZAA1GbettQ3HQpzffVGqc9xnYBndAkIA5ZB52LY8ZBZCt5Y6W3MPtSbwsFLPIL8kiwBoYQtW3VLIFBjFQXujVe9Ck2fUkEAeK7rshb230pZBQVogRADz5W7HrIzwDKQ7AV9sVtgZDZD';
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
    if (err) {
      console.log(err);
      return;
    }

    if (res.data) {
      if (res.data.length) {
        /*if (res.paging && res.paging.next) {
          paginate(res.paging.next);
        }*/

        res.data.forEach(function(ev) {
          //existsInDb(ev.id, function(exists) {
          //  console.log(exists);
          //  return
          //  if (!exists) {
          var query = "SELECT description, eid, location, name, privacy, start_time, end_time, update_time, ticket_uri, venue, pic_big, pic_square, pic_cover, has_profile_pic, pic, creator, timezone FROM event WHERE eid =" + ev.id;


          var query = {
            user_event: "SELECT description, eid, location, name, privacy, start_time, end_time, update_time, ticket_uri, venue, pic_big, pic_square, pic_cover, has_profile_pic, pic, creator, timezone FROM event WHERE eid =" + ev.id,
            event_creator: "SELECT name, id FROM profile WHERE id IN (SELECT creator FROM #user_event)"
          };

          //    console.log(query);
          graph.fql(query, function(err, ev) {
            if (err) {
              console.log(err);
              return;
            }

            if (ev.data) {
              console.log(ev.data);
              eve = ev.data[0];
              eve.start_time = new Date(Date.parse(eve.start_time));

              eve.end_time = new Date(Date.parse(eve.end_time));

              eve.saved = new Date();

              Events.insert(eve, function(err, doc) {
                if (err) console.log(err);
                console.log(doc.name);
              });
            }
          });
          //}
          //});
          return;
        });
      }
    }
  });
}

/*graph.search(searchOptions, function(err, res) {
    if (err) console.log(err);
    if (res.data) {
      if (res.data.length) {
        if (res.paging && res.paging.next) {
          paginate(res.paging.next);
        }

        var ids = [];


        res.data.forEach(function(ev) {
          if (!existsInDb(ev.id)) {
            ids.push(ev.id);
          }
        });

        var query = "SELECT description, end_time, eid, location, name, privacy, start_time, end_time, update_time, ticket_uri, venue, pic_big, pic_square, pic_cover, has_profile_pic, pic, creator, timezone FROM event WHERE eid IN (" + ids.join() + ')';
        console.log(query);
        graph.fql(query, function(err, res) {
          if (err) console.log(err);

          Events.insert(res.data, function(err, doc) {
            console.log(doc);
          });
        });
      }
    }
  });
}*/

function existsInDb(id, cb) {
  Events.findOne({
    id: id
  }).on('complete', function(err, doc) {
    if (err) console.log(err);
    console.log(doc);
    console.log(err);
    if (!doc) {
      cb(false);
    } else {
      cb(true);
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

//}, null, true);