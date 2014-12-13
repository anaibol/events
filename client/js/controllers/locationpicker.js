app.controller('LocationpickerCtrl', function($scope, $state, $http, $rootScope) {
  $scope.locationSelected = $rootScope.loc.city;
  $scope.onSelect = function($item, $model, $label) {
    var city;

    if ($item.address_components[0].types[0] === 'locality') {
      city = $item.address_components[0].long_name.toLowerCase();
      city = city.replace(' ', '-');
    }
    $rootScope.loc.lng = $item.geometry.location.lng;
    $rootScope.loc.lat = $item.geometry.location.lat;
    $state.go('list', {
      lng: $item.geometry.location.lng,
      lat: $item.geometry.location.lat,
      city: city
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