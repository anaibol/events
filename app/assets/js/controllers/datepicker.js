var DatepickerCtrl = function ($scope) {
  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.minDate = new Date();

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
};