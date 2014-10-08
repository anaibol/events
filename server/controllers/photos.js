var graph = require('fbgraph');

var Events = global.db.get('events');

exports.addPhotos = function(req, res) {

  var id = [];

  graph.get('/' + req.params.eid + '/feed' + '?access_token=' + req.user.accessToken, function(err, result) {
    if (err) {
      console.log(err);
      res.json({
        error: "Please refresh your facebook connexion"
      });
    } else if (result) {

      for (i = 0; i < result.data.length; i++) {

        if (result.data[i].type == 'photo')
          id.push(result.data[i].object_id)
      }

      for (j = 0; j < id.length; j++) {
        graph.get('/' + id[j] + '?access_token=' + req.user.accessToken, function(err, result) {
          if (err)
            console.log(err);
          else if (result) {
            console.log("URLS:");

            Events.update({
                eid: parseInt(req.params.eid)
              }, {
                $push: {
                  'images': result.images
                }
              },
              function(err, event) {
                if (err) {
                  console.log(err);
                }
                if (event)
                  console.log('INSERT');
              });

            console.log(result.images);
          }

        });
      }

      res.json(result);
    }

  });

}