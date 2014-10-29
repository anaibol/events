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


  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();
  $scope.myCustomObj = [{
    "month": 'june',
    "day": 19
  }, {
    "month": 'june',
    "day": 28
  }];

  $scope.initDate = new Date('2016-15-20');
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
});