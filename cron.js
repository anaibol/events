var graph = require('fbgraph');

var accessToken = 'CAAKvXHZBBCIUBAE7zzoXKHRMhT6KZC7GzdcTbVtffjyAswthi4iK60rp2yPzgAqaqEZBNJcbJBfZBmRN9Udfeh1NWKtzZAjvHGbScKdLTP5nxK5i9QzJnvmrB8WlHbpMenmjRYZC93XfZB3rZCp8EW9XxROsA9nQ0KC6rz7jKtOTLRXdZA8es5cDPWIrvJh7mIDxDIx7IF0jlgAZDZD';
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

function search(term) {

  var searchOptions = {
    q: term,
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

          var query = {
            user_event: "SELECT description, eid, location, name, privacy, start_time, end_time, update_time, ticket_uri, venue, pic, pic_big, pic_small, pic_square, pic_cover, has_profile_pic, pic, creator, timezone FROM event WHERE eid =" + ev.id,
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

            if (res.data) {;
              if (res.data[0].fql_result_set[0]) {
                eve = res.data[0].fql_result_set[0];

                eve.attending = res.data[1].fql_result_set;
                eve.unsure = res.data[3].fql_result_set;

                // console.log(eve.unsure);

                if (res.data[2].fql_result_set[0]) {
                  eve.creator = {
                    id: res.data[2].fql_result_set[0].id,
                    name: res.data[2].fql_result_set[0].name
                  };
                }
                
                eve.start_time = new Date(Date.parse(eve.start_time));
                eve.end_time = new Date(Date.parse(eve.end_time));

                eve.query = term;

                eve.saved = new Date();

                //getTags(eve);
                eve.price = getPrice(eve);

                Events.insert(eve, function(err, doc) {
                  if (err) console.log(err);
                  console.log(doc.name);
                });
              }
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

function getTags() {
  Events.find({}, function(err, evs) {
    evs.forEach(function(ev) {
      var name = ev.name;
      var desc = ev.description;

      var text = name + ' ' + desc;

      var n = text.search("salsa");

      if (n > 0) {
        console.log(n);
        console.log(name);
        console.log(desc);
      }

      /*Events.updateById(ev._id, ev, function(err, doc) {
        if (err) console.log(err);

        if (ev.attending.length < updatedEv.attending.length) {
          console.log(ev.name);
        }
      });*/
    });
  });
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
    return match[numbers.indexOf(min.toString())];
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


function update() {
  Events.find({}, function(err, evs) {
    evs.forEach(function(ev) {
      //existsInDb(ev.id, function(exists) {
      //  console.log(exists);
      //  return
      //  if (!exists) {

      var query = {
        event_attending: "SELECT uid FROM event_member WHERE eid =" + ev.eid + " and rsvp_status = 'attending' LIMIT 50000",
        event_unsure: "SELECT uid FROM event_member WHERE eid =" + ev.eid + " and rsvp_status = 'unsure' LIMIT 50000"
      };

      //    console.log(query);
      graph.fql(query, function(err, res) {
        if (err) {
          console.log(err);
          return;
        }

        if (res.data) {
          if (res.data[0].fql_result_set[0]) {
            var updatedEv = JSON.parse(JSON.stringify(ev));

            updatedEv.attending = res.data[0].fql_result_set;
            updatedEv.unsure = res.data[1].fql_result_set;

            Events.updateById(ev._id, ev, function(err, doc) {
              if (err) console.log(err);

              if (ev.attending.length < updatedEv.attending.length) {
                //console.log(ev.name);
              }
            });
          }
        }
      });
    });
  });
}

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

// search('paris');
// search('salsa');
// search('bachata');
// search('kizomba');
// search('porto');
// search('cubaine');
// search('semba');
// search('samba');

function searches() {
  search('paris');
  search('salsa');
  search('bachata');
  search('kizomba');
  search('porto');
  search('cubaine');
  search('cubana');
  search('semba');
  search('samba');
  search('merengue');
  search('tango');
}


//update();

//getTags();

searches();

//}, null, true);