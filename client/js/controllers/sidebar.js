app.controller('SidebarCtrl', function($scope, Event) {
  $scope.isCollapsed = true;

  // $scope.setQueryParam = function(date) {
  //   Events
  //   date = getStringDate(date);
  //   $location.url('/date/' + date);
  // };

  $scope.getStringDate = function(date) {
    var dd = date;
    var yy = dd.getYear();
    var mm = dd.getMonth() + 1;
    dd = dd.getDate();
    if (yy < 2000) {
      yy += 1900;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    if (dd < 10) {
      dd = "0" + dd;
    }
    var rs = yy + "-" + mm + "-" + dd;
    return rs;
  };
});