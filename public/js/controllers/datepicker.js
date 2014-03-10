var DatepickerCtrl = function ($scope) {
  $scope.clear = function () {
    $scope.date = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.open = function(dateScope) {
    $scope.dateScope = dateScope;

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

  $scope.format = 'd';
};