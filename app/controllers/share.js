var graph = require('fbgraph');

var accessToken = 'CAAVebA5FD2cBAO6ZBQYJOYy7BNfSdPpJC1nA5ozH9ZCFh8ZCaDgvdgZCl2TKjJGkOVTNb94ZCn26EYzi8JKa1nV1xvZBwjfIIkKnK5idQNeWoe8ZCGBaWoST7BQmg7DJLet6cBCxvXlZCH8ikmTFIZBZArMzZCH3V3j45NwIQo9cwZAPI2ZACHdTTaIcdEG1FthZAFFCtNZC8IiRQBqg9HsIhgkNsH7eE2rKMXWji0ZD';

exports.share = function(req, res)
{
  graph.setAccessToken(accessToken);
  console.log("ligne 8");

  var wallPost = {
    message: "I'm gonna come at you like a spider monkey, chip!"
  };

  graph.post('/feed' + '?access_token=' + req.user.accessToken, function(err, result) {
    if (err) {
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


