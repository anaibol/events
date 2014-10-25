app.controller('DatepickerCtrl', function($rootScope, $scope) {
  $scope.minDate = $rootScope.today;

  $scope.date = $scope.minDate;

  $scope.dateOptions = {
    'year-format': "'yy'",
    'starting-day': 1,
    'show-weeks': false,
    'show-button-bar': false,
    'day-title-format': 'MMMM',
    'month-title-format': ''
  };

  $scope.format = 'dd - MMMM';
});