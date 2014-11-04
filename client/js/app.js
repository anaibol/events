var app = angular.module('wooepa', ['wooepa-templates', 'geolocation', 'angular-data.DSCacheFactory', 'ngStorage', 'querystring', 'ui.router', 'ui.bootstrap', 'ezfb', 'truncate', 'ngSanitize', 'angular-data.DS', 'angular-data.DSCacheFactory', 'angularMoment', 'gettext', 'infinite-scroll', 'headroom']); //'imageupload', , 'seo' 'leaflet-directive'

angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 500);

app.factory('Event', function(DS) {
  return DS.defineResource({
    name: 'event',
    endpoint: '/api/events',
    idAttribute: 'eid'
  });
});

var tokenInstagram = '1491272863.4fa115a.678e407407db496fa1db455f5d2f5eab';

app.factory('instagram', function($http) {
  var base = "https://api.instagram.com/v1";

  return {
    getLocationId: function(lat, lng) {
      var request = '/locations/search';
      var url = base + request;
      var config = {
        'params': {
          'access_token': tokenInstagram,
          'lat': lat,
          'lng': lng,
          'callback': 'JSON_CALLBACK'
        }
      };
      return $http.jsonp(url, config);
    },
    getPhotosByLocationId: function(locationId, count) {
      var request = '/locations/' + locationId + '/media/recent';
      var url = base + request;
      var config = {
        'params': {
          'access_token': tokenInstagram,
          'count': count,
          'callback': 'JSON_CALLBACK'
        }
      };
      return $http.jsonp(url, config);
    }
  };
});

app.service('geoip', function($http) {
  return {
    getLocation: function(lat, lng) {
      return $http.get('http://ipinfo.io/json');
    }
  };
});

// app.service('reverseGeocode', function() {
//   var geocoder = new google.maps.Geocoder();

//   return {
//     getAddress: function(lat, lng, cb) {
//       var latlng = new google.maps.LatLng(lat, lng);

//       geocoder.geocode({
//         'latLng': latlng
//       }, function(results, status) {
//         if (status == google.maps.GeocoderStatus.OK) {
//           if (results[1]) {
//             cb(results[1]);
//           }
//         } else {
//           element.text('Geocoder failed due to: ' + status);
//         }
//       });
//     }
//   };
// });


// app.service('slug', function() {
//   return {
//     slugify: function(str) {
//       str = str.replace(/^\s+|\s+$/g, ''); // trim
//       str = str.toLowerCase();

//       // remove accents, swap ñ for n, etc
//       var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
//       var to = "aaaaaeeeeeiiiiooooouuuunc------";
//       for (var i = 0, l = from.length; i < l; i++) {
//         str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
//       }

//       str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
//       .replace(/\s+/g, '-') // collapse whitespace and replace by -
//       .replace(/-+/g, '-'); // collapse dashes

//       return str;
//     }
//   };
// });

// });

var getStringDate = function(date) {
  var dd = date;
  var yy = dd.getYear();
  var mm = dd.getMonth() + 1;
  dd = dd.getDate();
  if (yy < 2000) {
    yy += 1900;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  if (dd < 10) {
    dd = "0" + dd;
  }
  var rs = yy + "-" + mm + "-" + dd;
  return rs;
};

app.factory('Events', function($q, $http, DSCacheFactory, $rootScope, $querystring) {
  var cache = DSCacheFactory('eventCache');

  var query = {};

  return {
    query: query,
    getOne: function(eid) {
      return cache.get(eid);
    },
    get: function(params) {
      // console.log(query.since));
      query = {
        since: params.since || getStringDate($rootScope.today),
        country: query.country || params.country,
        lng: query.lng || params.lng,
        lat: query.lat || params.lat,
        tags: query.tags || params.tags,
        sortBy: query.sortBy || params.sortBy
      };

      console.log(query);

      return this.runQuery();
    },
    getMore: function() {
      if (!query.skip) {
        query.skip = 30;
      } else {
        query.skip += 30;
      }

      return this.runQuery();
    },
    normalize: function(ev) {
      if (ev.attending_count >= 99) {
        ev.tags.push('popular');
      }

      if (ev.price.num === 0) {
        ev.tags.push('free');
      }

      if (ev.festival) {
        ev.tags.push('festival');
      }

      ev.tags = _.uniq(ev.tags);

      return ev;
    },
    runQuery: function() {
      var that = this;
      var deferred = $q.defer();

      $http.get('/api/events?' + $querystring.toString(_.compactObject(query))).success(function(evs) {
        var ev = {};

        for (var i = evs.length - 1; i >= 0; i--) {
          ev = evs[i];
          ev = that.normalize(ev);

          cache.put(ev.eid, ev);
        }

        deferred.resolve(evs);
      });

      return deferred.promise;
    }
  };
});