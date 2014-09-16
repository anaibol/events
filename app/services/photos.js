
function searchPhotos(data, db) {

  if (!data)
    return ;

  var Events = db.get('events');

  var graph = require('fbgraph');

  var accessToken = "439472799532734|q2yZ3bxPv8magGScTA672Ab-x7Y";

  var currentDate = new Date();

  if (data.images && data.last_update_images)
  {
    var next_update = data.last_update_images;
    next_update.setDate(next_update.getDate() + 7);
    if (next_update >= currentDate)
    {
      console.log('Already in DB, next update at :' + next_update);
      return ;
    }
  }

  var id = [];

  var images = [];

  graph.get('/' + data.eid + '/feed' + '?access_token=' + accessToken, function(err, result) {
      if (err)
        console.log(err);
      else if (result) {

        for (var i = 0; i < result.data.length; i++){

          if (result.data[i].type == 'photo')
            id.push(result.data[i].object_id)
        }

        for (var j = 0; j < id.length; j++)
        {
          graph.get('/' + id[j] + '?access_token=' + accessToken, function(err, result) {
            if (err)
            {
              console.log(err);
              return ;
            }
            else if (result) {

              images.push(result.images);

              Events.findOne({eid: parseInt(data.eid)}, function (err, event) {
                if (event) return;

                if (event.images && event.images.indexOf(result.images))
                  console.log("image already exist")
                else
                {
                  Events.update({eid: parseInt(data.eid)}, 
                  {$push: {'images': result.images}},
                  {$set: {'last_update_images': currentDate}},
                  function(err, event) {
                    if (err) {
                      console.log(err);
                    }
                  });
                  console.log("Update");
                }

              });

              data.images = images;

              if (data.images.length == id.length)
                return ;
            }
          });
        }
      }
      else
        return ;
    });

}

function searchPhotoEvents(db) {

  if (!db)
  {
    console.log("Database is null");
    return ;
  }

  var Events = db.get('events');

  var date = new Date();

  date.setSeconds(0);
  date.setMinutes(0);
  date.setHours(0);

  var datePlusWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7);

  Events.find({
    'start_time': {
      $gte: date,
      $lt: datePlusWeek
    }
  }).success(function(evs) {

    evs.forEach(function(ev) {
      console.log(ev.eid);
      exports.searchPhotos(ev, db);
    });

  }).error(function(err) {
    console.log(err);
  });

}

module.exports.searchPhotoEvents = searchPhotoEvents;
module.exports.searchPhotos = searchPhotos;
