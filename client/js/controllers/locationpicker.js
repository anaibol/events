app.controller('LocationpickerCtrl', function($scope, $state, $http, $rootScope) {
  $scope.locationSelected = $rootScope.loc.city;
  $scope.onSelect = function($item, $model, $label) {
    var city;

    if ($item.address_components[0].types[0] === 'locality') {
      city = $item.address_components[0].long_name.toLowerCase();
      city = city.replace(' ', '-');
    }
    $state.go('list', {
      lng: $item.geometry.location.lng,
      lat: $item.geometry.location.lat,
      city: city
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