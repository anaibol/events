
var tokenInstagram = "1491272863.4fa115a.678e407407db496fa1db455f5d2f5eab";

function searchPhotos(data, db, cb) {

  if (!data)
    cb(data);

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
      console.log('Facebook: Already in DB, next update at :' + next_update);
      cb(data);
      return ;
    }
  }

  var id = [];

  var images = [];

  graph.get('/' + data.eid + '/feed' + '?access_token=' + accessToken, function(err, result) {
      if (err) {
        console.log(err);
        cb(data, err);
      }
      else if (result) {

        for (var i = 0; i < result.data.length; i++){

          if (result.data[i].type == 'photo')
            id.push(result.data[i].object_id)
        }

        var nb_done = 0;

        for (var j = 0; j < id.length; j++)
        {
          graph.get('/' + id[j] + '?access_token=' + accessToken, function(err, result) {
            if (err)
            {
              console.log(err);
              nb_done++;
                if (nb_done == id.length)
                  cb(data, err);
            }
            else if (result) {

              images.push(result.images);

              Events.findOne({eid: parseInt(data.eid)}, function (err, event) {
                if (!event) {
                  nb_done++;
                  if (nb_done == id.length)
                    cb(data);
                }
                else if (event.images && event.images.indexOf(result.images)) {
                  console.log("Image already exist / No UPDATE")
                  nb_done++;
                  if (nb_done == id.length)
                    cb(data);
                }
                else
                {
                  Events.update({eid: parseInt(data.eid)}, 
                  {$push: {'images': result.images}},
                  function(err, event) {
                    if (err)
                      console.log(err);
                    
                    Events.update({eid: parseInt(data.eid)},
                      {$set: {'last_update_images': currentDate}},
                      function(err, event) {
                        if (err)
                          console.log(err);

                        nb_done++;
                        console.log("Update");
                        if (nb_done == id.length)
                          cb(data);
                    });

                  });
                }

              });
            }
            else {
              nb_done++;
              if (nb_done == id.length)
                cb(data);
            }

          });
        }
      }
      else
        cb(data);
    });

}

function searchPlaceAndRequestRecentPhotos(data, db, cb)
{
  if (!data)
    cb(data, 'No Database or no Data');

  var Events = db.get('events');

  var currentDate = new Date();

  console.log(currentDate);

  if (data.photos && data.last_update_photos)
  {
    var next_update = data.last_update_photos;
    next_update.setDate(next_update.getDate() + 7);
    if (next_update >= currentDate)
    {
      console.log('Instagram: Already in DB, next update at :' + next_update);
      cb(data);
      return ;
    }
  }

  var latitude = data.venue.latitude;
  var longitude = data.venue.longitude;
  var name = data.location;
  var query = "https://api.instagram.com/v1/locations/search?lat=" + latitude + "&lng=" + longitude + "&access_token=" + tokenInstagram;

  console.log(" query : " + query);
  try
  {
    request(query, function(error, response, body)
    {
      var id = null;

      if (data.location_instragram_id)
        id = data.location_instragram_id;
      else if (error)
      {
        console.log(" error ");
        cb(data);
      }
      else
      {
        console.log(" name : " + name);
        console.log(body);
        //if (body.toString().indexOf("Oops, an error occurred.") != -1 || 
        //if (!IsJsonString(body))
        var isJsonString = /^[\],:{}\s]*$/.test(body.replace(/\\["\\\/bfnrtu]/g, '@').
        replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
        replace(/(?:^|:|,)(?:\s*\[)+/g, ''));
        if (!isJsonString)
        {
            console.log(" error catched l319 ");
            cb(data);
        }

        var obj = JSON.parse(response.body);

        if (!obj.data) {
          cb(data);
        }

        if (obj.data.length == 0)
          cb(data);

        id = obj.data[0].id;
        var found = false;

        console.log("Things:" + data.location);
        for (var i = 0; i < obj.data.length; i++)
        {
          console.log(obj.data[i].name.toLowerCase());
          if (data.location.toLowerCase() == obj.data[i].name.toLowerCase())
          {
            Events.update(
              {'eid': data.eid}, 
              {$set: {'location_instragram_id': obj.data[i].id}}, function (err) {
                if (err)
                  console.log(err)
              }
            );
          }

          if (name == obj.data[i].name)
          {
            console.log("FOUND !");
            id = obj.data[0].id;
            found = true;
          }
        }

        if (!found)
            console.log(" NOT FOUND, we took the first one !");
      }

      var queryPhotos = "https://api.instagram.com/v1/locations/" + id + "/media/recent?access_token=" + tokenInstagram;
      console.log(queryPhotos);

      try
      {
        request(queryPhotos, function(error, response, body)
        {
          //if (body.toString().indexOf("Oops, an error occurred.") != -1)
          //if (!IsJsonString(body))
          var isJsonString = /^[\],:{}\s]*$/.test(body.replace(/\\["\\\/bfnrtu]/g, '@').
          replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
          replace(/(?:^|:|,)(?:\s*\[)+/g, ''));

          if (!isJsonString)
          {
            console.log("---- error catched l319 ----");
            cb(data);
          }
          if (error)
          {
            console.log("---- error ----");
            cb(data);
          }

          obj = JSON.parse(body);
          // console.log(obj);
          var photos = [];
          for (var j = 0; j < obj.data.length; j++)
          {
            var photo = {};

            photo.created_time = obj.data[j].created_time;
            photo.url = obj.data[j].images.standard_resolution.url;
            photo.url_medium = obj.data[j].images.low_resolution.url;
            photo.tags = obj.data[j].tags;
            photo.likes_count = obj.data[j].likes.count;
            photo.id = obj.data[j].id;
            photo.user = obj.data[j].user;

            // console.log(url);
            photos.push(photo);
          }

          console.log(" photos : " + photos.length);

          data.photos = photos;

          Events.update(
            {'eid': data.eid}, 
            {$set: {'photos': photos, 'last_update_photos': currentDate}}, function (err) {
              if (err)
                console.log(err)
            }
          );

        });
      }
      catch (e)
      {
        console.log("---- ERROR instagram catched ! ----");
        cb(data) ;
      }
    });
  }
  catch (e)
  {
      console.log("---- ERROR instagram catched ! ----");
      cb(data);
  }
  // JSON.stringify
}

function searchPhotoEvents(db, cb) {

  if (!db)
  {
    console.log("Database is null");
    cb();
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

    var nb_done = 0;

    if (evs) {
      for (i = 0; i < evs.length; i++) {

        searchPhotos(evs[i], db, function(ev, err) {
          if (err)
            console.log(err);
          else if (ev) {
              console.log("UPDATE FACEBOOK done for event with id: " + ev.eid);
          }
          nb_done++;
          if (nb_done == (2 * evs.length))
              cb();
        });
        searchPlaceAndRequestRecentPhotos(evs[i], db, function(ev, err) {
          if (err)
              console.log(err)
          else if (ev) {
              console.log("UPDATE INSTAGRAM done for event with id: "  + ev.eid);
          }
          nb_done++;
          if (nb_done == (2 * evs.length))
            cb();
              
        });
      }
    }
    else
      cb();

    });

}

module.exports.searchPhotoEvents = searchPhotoEvents;
module.exports.searchPhotos = searchPhotos;
