app.controller('LocationpickerCtrl', function($scope, $state, $http, $rootScope) {
  $scope.locationSelected = $rootScope.city;

  $scope.onSelect = function($item, $model, $label) {
    var country;

    if ($item.address_components[0].types[0] === 'country') {
      country = $item.address_components[0].long_name.toLowerCase();
    }

    $state.go('list', {
      lng: $item.geometry.location.lng,
      lat: $item.geometry.location.lat,
      country: country
    });
  };

  $scope.getLocation = function(val) {
    return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: val,
        sensor: false,
        language: $rootScope.lang
      }
    }).then(function(response) {
      return response.data.results.map(function(location) {
        return location;
      });
    });
  };
});