'use strict';

app.controller('MapCtrl', function($scope, $http, Restangular, $modal) {
  $scope.pos = {};

  $scope.markers = [];
  /*
  $http({
    method: 'GET',
    url: 'http://freegeoip.net/json/'
  }).
  success(function(pos, status, headers, config) {
    $scope.pos = {
      lat: pos.latitude,
      lng: pos.longitude,
      zoom: 14
    };

    $http({
      url: '/events/find',
      method: "POST",
      data: {
        pos: pos
      }
    }).success(function(data, status, headers, config) {
      $scope.events = data;
      angular.forEach(data, function(value, key) {
        if (value.venue) {
          if (value.venue.latitude !== undefined) {
            $scope.markers.push({
              lat: value.venue.latitude,
              lng: value.venue.longitude,
              message: "My Added Marker"
            });
          }
        }
      });

    });
  });
*/
  angular.extend($scope, {
    layers: {
      baselayers: {
        googleTerrain: {
          name: 'Google Terrain',
          layerType: 'TERRAIN',
          type: 'google'
        },
        googleHybrid: {
          name: 'Google Hybrid',
          layerType: 'HYBRID',
          type: 'google'
        },
        googleRoadmap: {
          name: 'Google Streets',
          layerType: 'ROADMAP',
          type: 'google'
        }
      }
    }
  });
});