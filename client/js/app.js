var app = angular.module('wooepa', ['wooepa-templates', 'geolocation', 'ngStorage', 'ui.router', 'ui.bootstrap', 'ui.router', 'ezfb', 'truncate', 'ngSanitize', 'angular-data.DS', 'angular-data.DSCacheFactory', 'angularMoment', 'gettext', 'infinite-scroll', 'headroom']); //'imageupload', , 'seo' 'leaflet-directive'

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


app.service('slug', function() {
	return {
		slugify: function(str) {
			str = str.replace(/^\s+|\s+$/g, ''); // trim
			str = str.toLowerCase();

			// remove accents, swap ñ for n, etc
			var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
			var to = "aaaaaeeeeeiiiiooooouuuunc------";
			for (var i = 0, l = from.length; i < l; i++) {
				str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
			}

			str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
			.replace(/\s+/g, '-') // collapse whitespace and replace by -
			.replace(/-+/g, '-'); // collapse dashes

			return str;
		}
	};
});