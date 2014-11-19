var fbtok = 'CAAGPsrwaxr4BAB7D3ZBNlZAf7R5vPWZAu6xVZAD7gq1hdzMOVDsPq3Bsxl2AAojoGlDcQcEAzZAtmyDrOlrwDpOG7N64BTdloH0tDia3OPRb0fRLBXiLKATFMPzRoE0estUT8z6gz7Mb73yBLh3oXXFCt8UmI5fe3pLg0cUi1ZAamY02PZC25OxBYwMKYKMJKlzedF1CmIoh7Iekah5tJQ7';

app.factory('fbvideos', function($http) {
  var base = 'https://graph.facebook.com';

  return {
    getFbVideo: function(eid) {
      var request = '/' + eid + '/feed';
      var url = base + request;
      var config = {
        params: {
          event_id: eid,
          access_token: fbtok,
          filter: 'app_2392950137',
          callback: 'JSON_CALLBACK'
        }
      };
      return $http.jsonp(url, config);
    },
    getFbLink: function(feed, cb){
          if (feed && feed.data) {
      var i = 0;
      var url;
      var videos = [];
      while (feed.data[i]) {
        if (feed.data[i].type == "video") {
          url = feed.data[i].source;
          var j = 0;
          var youtube = url.indexOf("youtube");
          var facebook = url.indexOf("fbcdn-video");
          if (youtube != -1) {
            var test = 0;
            while (test != -1) {
              ++j;
              if (!url[j] || (url[j] == '/' && url[j + 1] == 'v' && url[j + 2] == '/'))
                test = -1;
            }
            j = j + 3;
            var videoId = "";
            var k = 0;
            while (url[j] && url[j] != '?') {
              videoId += url[j];
              ++j;
              ++k;
            }
            var new_url = "http://www.youtube.com/embed/" + videoId;
            j = 0;
            k = 0;
            videos.push(new_url)
          }
          else if (facebook != -1)
          {
            videos.push('http://www.facebook.com/video/embed?video_id=' + feed.data[i].object_id);
          }
        }
        ++i;
      }
        cb(videos);
    }
    }
  };
});