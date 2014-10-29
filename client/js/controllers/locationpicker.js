app.controller('LocationpickerCtrl', function($scope, $http, $rootScope) {
  $scope.getLocation = function(val) {
    return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: val,
        sensor: false,
        language: $rootScope.userLang
      }
    }).then(function(response) {
      return response.data.results.map(function(location) {
        $scope.locationSelected = location;
        return location.formatted_address;
      });
    });
  };
});