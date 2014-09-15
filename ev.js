var request = require('request')
  , cheerio = require('cheerio')
  , async = require('async')
  , format = require('util').format;

var config = require('./config/config');

var Pho = require('./app/services/photos.js');

var Ev = require('./ev');

var db = require('monk')(config.db);

var Events = db.get('events');
var Creators = db.get('creators');
var Locations = db.get('locations');

var graph = require('fbgraph');

var accessToken = 'CAAGPsrwaxr4BAIu7rFCcSYYZBoo5apR7NRqId4ZCWTxedks7q6pFUceEZBZCGzTp5wuxJ89QSqB6WO93Pfv8phKTFjkA5s323Lgf3ll5esiXbznFGifhlRUQnkOIPCdCXpX7BQDAZCJCMR9F3TyutCxard4xGlt2r1J1wUsCTeBydIfwcgGbwcguJnkZBJ6kcAivh0aHabdAxGAT3eeDZC8';
graph.setAccessToken(accessToken);

var keywords = ['salsa', 'bachata', 'kizomba', 'porto', 'cubaine', 'cubana', 'semba', 'samba', 'merengue', 'tango', 'lambazouk', 'zouk', 'regueton', 'reggaeton', 'kuduru', 'chachacha', 'zumba']; //'suelta'

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

function save(ev, cb) {
  if (ev) {
    Events.insert(ev, function(err, newEv) {
      if (err) {
        console.log(err);
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
}

function fetchMultiple(eids, cb) {
  eids = eids.join(',');

  var query = {
    user_event: "SELECT description, feed_targeting, host, attending_count, eid, location, name, privacy, start_time, end_time, update_time, ticket_uri, venue, pic, pic_big, pic_small, pic_square, pic_cover, has_profile_pic, pic, creator, timezone FROM event WHERE eid IN (" + eids + ")"
  };

  runQuery(query, function(data) {
    if (data) {
      if (data[0].fql_result_set) {
        var evs = data[0].fql_result_set;
        cb(evs);
      } else {
        cb(false);
      }
    } else {
      cb(false);
    }
  });
}

function fetch(eid, term, cb) {
  eid = parseInt(eid);

  existsInDb(eid, function(exists) {
    if (!exists) {
      get(eid, term, function(ev) {
        if (ev){
          save(ev, function(newEv) {
            cb(newEv);
          });
        } else {
          cb('not exists');
        }
      });
    } else {
      Ev.update(eid, function (ev) {
        cb(ev);
      });
    }
  });
}

function get(eid, term, cb) {
  eid = parseInt(eid);

  var query = {
    user_event: "SELECT description, feed_targeting, host, attending_count, eid, location, name, privacy, start_time, end_time, update_time, ticket_uri, venue, pic, pic_big, pic_small, pic_square, pic_cover, has_profile_pic, pic, creator, timezone FROM event WHERE eid =" + eid,
    event_attending: "SELECT uid FROM event_member WHERE eid IN (SELECT eid FROM #user_event) and rsvp_status = 'attending' LIMIT 50000",
    event_creator: "SELECT name, id FROM profile WHERE id IN (SELECT creator FROM #user_event)",
  };

  runQuery(query, function(data) {
    if (data) {
      if (data[0].fql_result_set[0]) {

        ev = data[0].fql_result_set[0];

        ev.eid = eid;

        var attending = data[1].fql_result_set;

        ev.attending = [];

        for (var i = attending.length - 1; i >= 0; i--) {
          ev.attending.push(parseInt(attending[i].uid));
        };

        ev.creator = data[2].fql_result_set[0];

        ev.query = term;

        ev = normalize(ev);

        cb(ev);
      } else {
        cb(false);
      }
    } else {
      cb(false);
    }
  });
}

function update(eid, cb) {
  get(eid, null, function (ev) {
    Events.update({eid: ev.eid}, {$set: ev});
    cb(ev);
  });
}

function updateMultiple(eids) {
  Ev.fetchMultiple(eids, function(eves) {
    var eids = [];

    eves.forEach(function(ev) {
      eids.push(parseInt(ev.eid));
      ev = Ev.normalize(ev);
      ev.updated = new Date();

      Pho.searchPhotos(ev, db);

      Ev.getAttendings(ev.eid, function(attendings) {
        ev.attending = attendings;

        Events.update({eid: ev.eid}, {$set: ev});
      });
    });
    console.log('Updating ' + eids.length + ' events.')
  });
}

function slug(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
  var to   = "aaaaaeeeeeiiiiooooouuuunc------";
  for (var i=0, l=from.length ; i<l ; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
};

function normalize(ev) {
  ev.eid = parseInt(ev.eid);

  ev.start_time = new Date(Date.parse(ev.start_time));
  ev.end_time = new Date(Date.parse(ev.end_time));
  ev.update_time = new Date(Date.parse(ev.update_time));

  ev.saved = new Date();

  ev.slug = slug(ev.name.toLowerCase());

  ev.tags = getTags(ev);

  ev.festival = getFestival(ev);
  
  ev.price = getPrice(ev);

  // if (ev.place.indexOf('porto')) {
  //   if (ev.term === 'porto') {
  //     ev = null;
  //   }
  // }

  return ev;
}

function updateAttendings(eid, cb) {
  getAttendings(eid, function(attendings) {
    Events.update({ eid: parseInt(eid) }, {$set: {attending: attendings}});
  });
}

function getAttendings(eid, cb) {
  graph.get(eid + '/attending?limit=50000', function(err, res) {
    if (err) {
      console.log(err);
    }

    var att = res.data;

    if (att) {
      attendings = [];

      for (var i = att.length - 1; i >= 0; i--) {
        attendings.push(parseInt(att[i].id));
      };

      cb(attendings);
    }
  });

  // var query = "SELECT uid FROM event_member WHERE rsvp_status = 'attending' AND eid=" + eid + " LIMIT 50000";

  // graph.fql(query, function(err, result) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     attendings = [];

  //     for (var i = result.data.length - 1; i >= 0; i--) {
  //       attendings.push(parseInt(result.data[i].uid));
  //     };

  //     cb(attendings);
  //   }
  // }
}

function getFromUser(userName, accessToken, userLoggedIn, cb) {
  graph.get(userName + '/events?limit=50000', function(err, res) {
    var evs = res.data;

    if (evs) {
      evs.forEach(function (ev) {
        var start_time = new Date(Date.parse(ev.start_time));
        var now = new Date();

        if (start_time > now || start_time.getFullYear() < 2016) {
          var term = 'user';

          if (userLoggedIn) {
            term = 'userLoggedIn';
          }

          fetch(parseInt(ev.id), term, function(result){
            // newEvents++;
            console.log(userName + ': ' + ev.name);
            cb(true);

            if (!result) {
              Ev.updateAttendings(ev.id, function(attendings) {});
            }
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

function findById(eid, cb) {
  Events.findOne({
    eid: parseInt(eid)
  }).on('complete', function(err, doc) {
    if (err) console.log(err);
    cb(doc);
  });
}

function capitalize(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports.capitalize = capitalize;
module.exports.findById = findById;
module.exports.fetch = fetch;
module.exports.get = get;
module.exports.save = save;
module.exports.update = update;
module.exports.updateMultiple = updateMultiple;
module.exports.runQuery = runQuery;
module.exports.getTags = getTags;
module.exports.getPrice = getPrice;
module.exports.getPriceFromFullPrice = getPriceFromFullPrice;
module.exports.crawlPage = crawlPage;
module.exports.crawlPageTimeline = crawlPageTimeline;
module.exports.crawlUser = crawlUser;
module.exports.crawlUserTimeline = crawlUserTimeline;
module.exports.getFromUser = getFromUser;
module.exports.updateAttendings = updateAttendings;
module.exports.getAttendings = getAttendings;
module.exports.fetchMultiple = fetchMultiple;
module.exports.normalize = normalize;
module.exports.existsInDb = existsInDb;