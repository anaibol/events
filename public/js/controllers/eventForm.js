var EventFormCtrl = function($scope, $modalInstance, ev, Restangular, $http, $q, $filter) {
  $scope.result = '';

  $scope.form = {
    type: 'geocode',
    bounds: {SWLat: 49, SWLng: -97, NELat: 50, NELng: -96},
    country: 'ca',
    typesEnabled: false,
    boundsEnabled: false,
    componentEnabled: false,
    watchEnter: true
  };

  var events = Restangular.all('events');

  if (ev) {
    $scope.ev = ev;
  }
  else {
    $scope.ev = {};
  }

  var words = ['salsa', 'bachata', 'kizomba', 'porto', 'cubaine', 'cubana', 'semba', 'samba', 'merengue', 'tango'];

  $scope.words = function(query) {
    var deferred = $q.defer();
    deferred.resolve($filter('filter')(words, query));
    return deferred.promise;
  };

  $scope.submit = function(image) {
    console.log(image);
    if ($scope.ev._id) {
      if (image) {
        //fd.append('data',JSON.stringify($scope.ev));

        var formData = new FormData();
        formData.append('image', image, image.name);

        Restangular.all('events/' + $scope.ev._id).withHttpConfig({
          transformRequest: angular.identity
        }).customPOST(formData, '', {}, {
          'Content-Type': false
        }).then(function(res) {
            $scope.ev._id = res._id;
            events.push($scope.ev);
            $modalInstance.close($scope.ev);
        });
      }
      else {
        Restangular.all('events/' + $scope.ev._id).post($scope.ev).then(function(res) {
          $scope.ev._id = res._id;
          events.push($scope.ev);
          $modalInstance.close($scope.ev);
        });
      }
    } else {
      Restangular.all('events/').post($scope.ev).then(function(res) {
          $scope.ev._id = res._id;
          $scope.$parent.events.push($scope.ev);
          $modalInstance.close($scope.ev);
      });
    }
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };

  $scope.files = [];

  //listen for the file selected event
  $scope.$on("fileSelected", function (event, args) {
      $scope.$apply(function () {            
          //add the file object to the scope's files collection
          $scope.files.push(args.file);
      });
  });

};