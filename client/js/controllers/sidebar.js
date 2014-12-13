app.controller('SidebarCtrl', function($scope, Event, moment) {
  $scope.isCollapsed = true;
  $scope.isCollapsed2 = true;

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

  $scope.getNextDay = function(date) {
    var next;

    switch(date){
      case 'Sunday':
        next = moment().day(0);
        break;
      case 'Monday':
        next = moment().day(1);
        break;
      case 'Tuesday':
        next = moment().day(2);
        break;
      case 'Wednesday':
        next = moment().day(3);
        break;
      case 'Thursday':
        next = moment().day(4);
        break;
      case 'Friday':
        next = moment().day(5);
        break;
      case 'Saturday':
        next = moment().day(6);
        break;
    }
    next = new Date(next);
    var dd = next;
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