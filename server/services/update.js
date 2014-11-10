var db = require('monk')(global.config.db);

var graph = require('fbgraph');

function updatePost(post, cb) {

  var Users = db.get('users');

  var Actions = db.get('actions');

  Users.findOne({
    'facebook.id': post.user_id
  }, function(err, user) {
    if (err) {
      console.log(err);
      cb(err);
    } else if (user) {
      graph.get('/' + post.user_id + '_' + post.post_id + '?access_token=' + user.accessToken, function(err, result) {
        if (err) {
          console.log(err);
          console.log("The post with id: " + post.post_id + " have been deleted");
          Actions.update({
              _id: post._id
            }, {
              $set: {
                "active": false
              }
            },
            function(err) {
              if (err)
                console.log(err);
            });
          cb(err);
        } else if (result) {
          Actions.update({
              _id: post._id
            }, {
              $set: {
                data: result
              }
            },
            function(err, action) {
              if (err) {
                console.log(err);
                cb(err);
              } else {
                console.log("Update done for the post with id: " + post.post_id);
                cb();
              }
            });
        } else
          cb();
      });

    } else
      cb();
  });
}

function updateActions(event_id, cb) {
  if (!db) {
    console.log("Database is null");
    cb();
  }

  var Actions = db.get('actions');

  Actions.find({
    'event_id': event_id
  }, function(err, actions) {
    if (err) {
      console.log(err);
      cb(err);
    } else if (actions && actions.length > 0) {
      console.log("Updating " + actions.length + " actions for the event with id: " + event_id);

      var nb_done = 0;

      for (i = 0; i < actions.length; i++) {
        updatePost(actions[i], function(err) {
          nb_done++;
          if (err)
            console.log(err);
          if (nb_done == actions.length)
            cb();
        });
      }
    } else {
      console.log("Nothing to do");
      cb();
    }
  });

}

// function updateEvent(event, cb) {

//   var Events = db.get('events');

//   graph.get('/' + event.eid + '?access_token=' + config.app.id, function(err, result) {
//     if (err) {
//       console.log(err);
//       cb(event, err);
//     } else if (result) {
//       console.log(result);
//       Events.update({
//         'eid': event.eid
//       }, {
//         $set: result
//       }, function(ev, err) {
//         if (err)
//           cb(ev, err);
//         else
//           cb(ev);
//         console.log("update done")
//       });
//     } else
//       cb(event);
//   });
// }

// function updateLastMonthEvents(cb) {

//   var Events = db.get('events');

//   var date = new Date();

//   date.setSeconds(0);
//   date.setMinutes(0);
//   date.setHours(0);

//   var dateLessMonth = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());

//   console.log(dateLessMonth)

//   Events.find({
//     'start_time': {
//       $gte: dateLessMonth,
//       $lt: date
//     }
//   }).success(function(evs) {

//     var nb_done = 0;

//     if (evs && evs.length > 0) {
//       for (i = 0; i < evs.length; i++) {

//         updateEvent(evs[i], function(ev, err) {
//           if (err)
//             console.log(err);
//           else if (ev) {
//             console.log("UPDATE done for event with id: " + ev.eid);
//           }
//           nb_done++;
//           if (nb_done == (evs.length))
//             cb();
//         });
//       }
//     } else
//       cb();

//   }).error(function(err) {
//     cb(err);
//   });
// }

//module.exports.updateLastMonthEvents = updateLastMonthEvents;
module.exports.updateActions = updateActions;
module.exports.updatePost = updatePost;