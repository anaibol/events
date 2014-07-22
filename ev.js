var request = require('request')
  , cheerio = require('cheerio')
  , async = require('async')
  , format = require('util').format
  , slugify = require('slugify');

var config = require('./config/config');

var Ev = require('./ev');

var db = require('monk')(config.db);

var Events = db.get('events');
var Creators = db.get('creators');
var Locations = db.get('locations');

var graph = require('fbgraph');

var accessToken = 'CAAGPsrwaxr4BANBarNZB64XKbfRmWXzeGCWHFzuh6osoGvKm5Y9v2XD1CCy5RfPZBC6U6zopOhHroAEZCoZAPZBYBt4TolXIFvwg6fSpLTjCbNzWPFe8u9mWo0olari2PkUQchNtJkuz2uAvwADlaeisz5CsdIFWyhZAonqnVnoMZAor6JKJhR68Y2hDXNGCrnYrrZCKkGODwrpAzmGpF6Mj';
graph.setAccessToken(accessToken);

var keywords = ['salsa', 'bachata', 'kizomba', 'porto', 'cubaine', 'cubana', 'semba', 'samba', 'merengue', 'tango', 'lambazouk', 'regueton', 'reggaeton', 'kuduru']; //'suelta'

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

function runQuery(query, cb) {
  graph.fql(query, function(err, res) {
    if (err) {
      console.log(err);
      cb(false)
      return;
    }

    if (res.data) {
      if (res.data.length) {
        result = res.data
      } else {
        result = false;
      }
    } else {
      result = false;
    }

    cb(result);
  });
}

function fetch(eid, term, cb) {
  eid = parseInt(eid);

  existsInDb(eid, function(exists) {
    console.log('hola')
    if (!exists) {
      var query = {
        user_event: "SELECT description, feed_targeting, host, attending_count, eid, location, name, privacy, start_time, end_time, update_time, ticket_uri, venue, pic, pic_big, pic_small, pic_square, pic_cover, has_profile_pic, pic, creator, timezone FROM event WHERE eid =" + eid,
        // event_attending: "SELECT uid FROM event_member WHERE eid IN (SELECT eid FROM #user_event) and rsvp_status = 'attending' LIMIT 50000",
        event_creator: "SELECT name, id FROM profile WHERE id IN (SELECT creator FROM #user_event)",
        //event_unsure: "SELECT uid FROM event_member WHERE eid IN (SELECT eid FROM #user_event) and rsvp_status = 'unsure' LIMIT 50000"
      };

      runQuery(query, function(data) {
        if (data) {
          if (data[0].fql_result_set[0]) {

            ev = data[0].fql_result_set[0];

            ev.eid = eid;
            ev.creator = data[1].fql_result_set[0];

            ev.start_time = new Date(Date.parse(ev.start_time));
            ev.end_time = new Date(Date.parse(ev.end_time));

            ev.place = [];

            if (ev.location) ev.place.push(ev.location);

            if (ev.venue) {
              if (ev.venue.street) ev.place.push(ev.venue.street);
              if (ev.venue.city) ev.place.push(ev.venue.city);
              if (ev.venue.state) ev.place.push(ev.venue.state);
              if (ev.venue.country) ev.place.push(ev.venue.country);
            }

            ev.place = ev.place.join(', ');

            ev.query = term;

            ev.saved = new Date();

            ev.slug = slugify(ev.name.toLowerCase());

            ev.tags = getTags(ev);

            ev.festival = getFestival(ev);
            
            ev.price = getPrice(ev);

            if (ev.place.indexOf('porto')) {
              if (term === 'porto') {
                ev = null;
              }
            }

            // if (term == 'user') {
              if (ev) {
                if (!ev.tags.length) {
                  ev = null;
                }
              }
            // }

            if (ev) {
              Events.insert(ev, function(err, newEv) {
                if (err) {
                  // console.log(err);
                }
                else {
                  if (ev) {
                    if (ev.location && ev.venue) {
                      Locations.insert({location: ev.location, venue: ev.venue, place: ev.place});
                    }

                    if (ev.creator) {
                      Creators.insert({fid: ev.creator.id, username: ev.creator.name});
                    }
                  }

                  cb(newEv);
                }
              });
            }
          } else {
            cb(false);
          }
        } else {
          cb(false);
        }
      });
    } else {
      cb(false);
    }
  });
}


function getFromUser(userName, accessToken, cb) {
  if (accessToken) {
    graph.setAccessToken(accessToken);
  }

  graph.get(userName + '/events', function(err, res) {
    var evs = res.data;
      console.log(res);
    if (evs) {
      evs.forEach(function (ev) {
        var start_time = new Date(Date.parse(ev.start_time));
        var now = new Date();

        if (start_time > now || start_time.getFullYear() < 2016) {
          fetch(ev.id, 'user', function(ev){
            // newEvents++;
            console.log(userName + ': ' + ev.name);
            cb(true);
          });
        }
      });
    }
  });
}

function crawlUser(userName, cb) {
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

    if (body) {
      if ($('.eventsGrid').length) {
        $('.eventsGrid').each(function(i, elem) {
          var url = $(this).find('a').attr('href');
          var re = /\d+/i;
          var id = url.match(re);

          fetch(id[0], 'user', function(ev){
            // newEvents++;
            console.log(userName + ': ' + ev.name);
            cb(true);
          });
        });
      } else {
        cb(false);
      }
    }
  });
}

function crawlUserTimeline(userName, cb) {
  var options = {
    url: format('http://facebook.com/%s', userName),
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1667.0 Safari/537.36'
    }
  };

  request(options, function (err, response, body) {
    if (err) throw err;

    body = body.removeAll('<!--').removeAll('-->');

    if (body) {
      var $ = cheerio.load(body);

      if ($('.timelineUnitContainer').length) {
        $('.timelineUnitContainer').each(function(i, elem) {
          var url = $(this).find('a[href^="/events/"]').attr('href');

          if (url) {
            var re = /\d+/i;
            var id = url.match(re);

            fetch(id[0], 'user', function(ev){
              // newEvents++;
              console.log(userName + ': ' + ev.name);
              cb(true);
            });
          }
        });
      } else {
        cb(false);
      }
    }
  });
}

function crawlPage(pageId) {
  var options = {
    url: format('http://facebook.com/%s', pageId),
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1667.0 Safari/537.36'
    }
  };

  request(options, function (err, response, body) {
    if (err) throw err;

    body = body.removeAll('<!--').removeAll('-->');

    var $ = cheerio.load(body);

    if (body) {
      $('.eventsGrid').each(function(i, elem) {
        var url = $2(this).find('a').attr('href');
        var re = /\d+/i;
        var id = url.match(re);

        fetch(id[0], 'user', function(ev){
          // newEvents++;
          console.log(userName + ': ' + ev.name);
        });
      });
    }
  });
}

function crawlPageTimeline(pageId) {
  var options = {
    url: format('http://facebook.com/%s', pageId),
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1667.0 Safari/537.36'
    }
  };

  request(options, function (err, response, body) {
    if (err) throw err;

    body = body.removeAll('<!--').removeAll('-->');

    if (body) {
      var $ = cheerio.load(body);

      $('.timelineUnitContainer').each(function(i, elem) {
        var url = $(this).find('a[href^="/events/"]').attr('href');

        if (url) {
          var re = /\d+/i;
          var id = url.match(re);

          fetch(id[0], 'page', function(ev){
            // newEvents++;
            console.log(pageId + ': ' + ev.name);
          });
        }
      });
    }
  });
}
  
function getTags(ev) {
  var tags = [];

  var name = ev.name;
  var desc = ev.description;

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

function getFestival(ev) {
  var festival=false;

  var name = ev.name;
  var desc = ev.description;

  var text = name + ' ' + desc;
  text = text.toLowerCase();
  var words = ["congress", "festival"]; 
  for (var i = 0; i < words.length; i++) {
    var str = words[i];
    var n = text.search(str);

    if (n > 0) {
      festival = true;
    }
  }

  return festival;
}

function getPrice(ev) {
  var desc = ev.name + ' ' + ev.description;
  desc = desc.toLowerCase();

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

function getPriceFromFullPrice(price) {
  var number = price.removeAll("$").removeAll("£").removeAll("€").split(',');

  var price = {
    full: price,
    num: number
  };

  return price;
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


module.exports.fetch = fetch;
module.exports.runQuery = runQuery;
module.exports.getTags = getTags;
module.exports.getPrice = getPrice;
module.exports.getPriceFromFullPrice = getPriceFromFullPrice;
module.exports.crawlPage = crawlPage;
module.exports.crawlPageTimeline = crawlPageTimeline;
module.exports.crawlUser = crawlUser;
module.exports.crawlUserTimeline = crawlUserTimeline;
module.exports.getFromUser = getFromUser;

