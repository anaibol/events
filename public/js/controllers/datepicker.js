var DatepickerCtrl = function ($scope, Global) {
  $scope.global = Global;

  $scope.clear = function () {
    $scope.date = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.open = function(params) {
    $scope.params = params;

    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    'year-format': "'yy'",
    'starting-day': 1,
    'show-weeks': false,
    'show-button-bar': false,
    'day-title-format': 'MMMM',
    'month-title-format': ''
  };

  $scope.formats = ['dd-MMMM-yyyy', 'dd - MMMM', 'shortDate'];
  $scope.format = 'd';

  $scope.$watch('date', function() {
    if ($scope.date) {
      console.log(123);
      $scope.global.events = [$scope.global.events[0]];
    }
  });
};