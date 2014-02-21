var graph = require('fbgraph');

var accessToken = 'CAACEdEose0cBAPUYeAJUPY6kLnvcBedCIt5ZC9GMXjAR8f19L4aiCTbjJoVhpzZCd2YRqSgU7QdYw8o4oabJuWYmMusj8yU6VgAoIAbysiVDdvqZAakSO3vDLqZCebsS6l4nAcVO7RiZALhkRfpbZBZBO9ZAXoJG6ahHdtz3LX8E4z9LGEoCTEirjDbZAhjd2NvKTyfLjufKvrQZDZD';
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
        /*if (res.paging && res.paging.next) {
          paginate(res.paging.next);
        }*/

        res.data.forEach(function(ev) {
          //existsInDb(ev.id, function(exists) {
          //  console.log(exists);
          //  return
          //  if (!exists) {
          var query = "SELECT description, end_time, eid, location, name, privacy, start_time, end_time, update_time, ticket_uri, venue, pic_big, pic_square, pic_cover, has_profile_pic, pic, creator, timezone FROM event WHERE eid =" + ev.id;
          //    console.log(query);
          graph.fql(query, function(err, ev) {
            if (err) console.log(err);
            if (ev.data) {
              Events.insert(ev.data, function(err, doc) {
                if (err) console.log(err);
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