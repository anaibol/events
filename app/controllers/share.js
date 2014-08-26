var graph = require('fbgraph');

var accessToken = 'CAAVebA5FD2cBAO6ZBQYJOYy7BNfSdPpJC1nA5ozH9ZCFh8ZCaDgvdgZCl2TKjJGkOVTNb94ZCn26EYzi8JKa1nV1xvZBwjfIIkKnK5idQNeWoe8ZCGBaWoST7BQmg7DJLet6cBCxvXlZCH8ikmTFIZBZArMzZCH3V3j45NwIQo9cwZAPI2ZACHdTTaIcdEG1FthZAFFCtNZC8IiRQBqg9HsIhgkNsH7eE2rKMXWji0ZD';

var Events = global.db.get('events');

function shareEventOnFB(req, res, event)
{
  console.log("event : " + event.toString());

  graph.setAccessToken(accessToken);
  console.log("ligne 8");

  var wallPost = {
    message: "I'm gonna come at you like a spider monkey, chip!",
    article : "http://techcrunch.com/2013/02/06/facebook-launches-developers-live-video-channel-to-keep-its-developer-ecosystem-up-to-date/"
  };

   console.log(req.user);
   console.log("req : " + req);

//https://graph.facebook.com/me/news.publishes?
//access_token=ACCESS_TOKEN&
//method=POST&
//article=http%3A%2F%2Fsamples.ogp.me%2F434264856596891

var message = {article : "http://techcrunch.com/2013/02/06/facebook-launches-developers-live-video-channel-to-keep-its-developer-ecosystem-up-to-date/"}

 // graph.post('/' + req.user.facebook.id + '/feed?access_token=' + req.user.accessToken, {message: 'Hello world'}, function(err, result) {
    /* ?access_token=' + req.user.accessToken, function(err, result) { */
      // req.user.accessToken
   graph.post('/me/news.publishes?access_token=' + req.user.accessToken + "&method=POST&", wallPost , function(err, result) {
    if (err)
    {
      console.log(err);
      res.json(err);
    }
    else {
      res.json(result);
    }
});

 // graph.redirectLoginForm(req, res);

/*
facebook: {
    clientID: "1511193072439143",
    clientSecret: "2d463b32df69fd1f1e398868705ff0eb",
*/


/*
  var fb = new fbgraph.Facebook(global.fbAppId + '|' + "2d463b32df69fd1f1e398868705ff0eb");
    console.log("ligne 9");
  fb.post('/' + req.user.user_id + '/feed', {message: 'Hello world'}, function(err, res)
  {
    console.log(err, res);
  });
*/

/*  graph.post('/' + req.params.eid + '/share/' + req.params.uid + '?access_token=' + req.user.accessToken, function(err, result) {
    if (err)
    {
      res.json(err);
    }
    else
    {
      res.json(result);
    }
  });
*/
};


exports.share = function(req, res)
{
  Events.find({"eid" : req.param.eid}).then(function(ev) {
    console.log("FOUND !");
    shareEventOnFB(req, res, ev);
  });
  /*
  Ev.fetch(req.params.eid, 'event', function (ev)
  {
    console.log("FOUND !");
    shareEventOnFB(req, res, ev);
  });
*/
};


