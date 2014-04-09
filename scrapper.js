var request = require('request')
  , cheerio = require('cheerio')
  , async = require('async')
  , format = require('util').format;

String.prototype.removeAll = function(target) {
  return this.split(target).join('');
};

var users = [ 'clubastoriabcn', 'El.Cel.Badalona', 'lelebahia' ]
  , concurrency = 2;

async.eachLimit(users, concurrency, function (user, next) {
    var options = {
        url: format('http://facebook.com/%s/events', user),
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1667.0 Safari/537.36'
        }
    };

    request(options, function (err, response, body) {
        if (err) throw err;
        var $ = cheerio.load(body);

        var html = $('.hidden_elem#u_0_7').html();

        if (html) {
          html = html.removeAll('<!--').removeAll('-->');
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