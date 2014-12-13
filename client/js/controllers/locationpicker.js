app.controller('LocationpickerCtrl', function($scope, $state, $http, $rootScope) {
  $scope.locationSelected = $rootScope.loc.city;
  $scope.onSelect = function($item, $model, $label) {
    $rootScope.loc.city = $item.description.split(',')[0];

    $http.get('/api/autocomplete/placeid', {
      params: {
        placeid: $item.place_id,
      }
    }).then(function(response) {
      var loc = response.data;

      $rootScope.loc.lng = loc.lng;
      $rootScope.loc.lat = loc.lat;

      $state.go('list', {
        lng: $rootScope.loc.lng,
        lat: $rootScope.loc.lat,
        city: $rootScope.loc.city
      });
    });
  };

  $scope.getLocation = function(val) {
    return $http.get('/api/autocomplete/locations', {
      params: {
        q: val,
        lang: $rootScope.lang,
        lng: $rootScope.loc.lng,
        lat: $rootScope.loc.lat
      }
    }).then(function(response) {
      return response.data;
      // return response.data.filter(function(location) {
      //   if (location.types.indexOf("locality") !== -1 || location.types.indexOf("neighborhood") !== -1) {
      //     return location;
      //   }
      // });
    });
  };
});