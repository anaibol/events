var graph = require('fbgraph');

var accessToken = 'CAAGPsrwaxr4BAPKJSNN5m7L2vHx1XKNfOBdIA6jAoYBZCj8Y3C3mZBxCSlJRzZAffOJgQjbcsfYOalNWAwi9rkpFghWiesRLi0klrlyvC02iEqj3xHO4WfMmPB4SB3buVaEaJOzljE1AehVtA0MTj93sRc8BMRAJLebZBy1GTeIOK3K2Lp38ZBJUBKZCVZAoRlPus4wwl4dlF72sJtIvLf47WShxBK8xEgZD';

exports.share = function(req, res)
{
  graph.setAccessToken(accessToken);
  console.log("ligne 8");
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


