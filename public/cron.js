var graph = require('fbgraph');

var accessToken = 'CAAKvXHZBBCIUBAMhjNvscAsqYKXMpH8CUlCR9ObOaoK6eBe4UUMoxIPlp3bpBaXE9Aqml1s7qujkLZBWX3js9oupt4cxbrz0EX4ff7286LHYUkTSqZBr90b5Vy9ZCgBmk0i7abLL01knhHXFfZCErC67zPcWHMAjAHulPEehyqFZB9mdCZAJFFgzMNfqgqsIQMZD';
graph.setAccessToken(accessToken);



function paginate(page) {
  graph.get(page, function(err, res) {
    if (res.paging && res.paging.next) {
      paginate(res.paging.next);
    }
    if (res.data) {
      console.log(res.data.length);
      for (var i = res.data.length - 1; i >= 0; i--) {
        graph.get(res.data[i].id, function(err, res) {
          if (res) {
            Events.insert(res);
          }
        });
      };
    }
  });
}

var db = require('monk')('localhost/wooeva-dev'),
  Events = db.get('events');

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
    console.log(err);
    if (res.data) {
      if (res.paging && res.paging.next) {
        paginate(res.paging.next);
      }
      for (var i = res.data.length - 1; i >= 0; i--) {
        graph.get(res.data[i].id, options, function(err, res) {
          if (res) {
            console.log(res.name);
            console.log(err);
            Events.insert(res);
          }
        });
      };
    }
  });

}

//var cronJob = require('cron').CronJob;
//new cronJob('*/5 * * * * * ', function() {

search('paris');
search('salsa');
search('bachata');
search('kizomba');
search('porto');
search('cubaine');
search('semba ');
search('paris');

//}, null, true);
