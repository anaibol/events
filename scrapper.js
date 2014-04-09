var request = require('request')
  , cheerio = require('cheerio')
  , async = require('async')
  , format = require('util').format;
  
var concurrency = 2;

async.eachLimit(users, concurrency, function (user, next) {
    var options = {
        url: format('http://facebook.com/%s/events', user),
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1667.0 Safari/537.36'
        }
    };

    request(options, function (err, response, body) {
        if (err) throw err;

        body = body.removeAll('<!--').removeAll('-->');

        var $ = cheerio.load(body);

        var html = $('.fbTimelineEvents').html();

        if (html) {
          var $2 = cheerio.load(html);

          $2('.eventsGrid').each(function(i, elem) {
            var url = $2(this).find('a').attr('href');
            var re = /\d+/i;
            var id = url.match(re);
            console.log(id[0]);
          });
        }

        next();
    });
});