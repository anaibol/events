var EventFormCtrl = function($scope, $modalInstance, ev, $q, $filter) {
  $scope.result = '';

  $scope.options = {
    types: '(establishment)'
  };

  if (ev) {
    $scope.ev = ev;
  }
  else {
    $scope.ev = {};
  }

var words = ['salsa', 'bachata', 'kizomba', 'porto', 'cubaine', 'cubana', 'semba', 'samba', 'merengue', 'tango', 'lambazouk', 'regueton', 'reggaeton', 'kuduru', 'suelta'];

  $scope.words = function(query) {
    var deferred = $q.defer();
    deferred.resolve($filter('filter')(words, query));
    return deferred.promise;
  };

  $scope.submit = function(image) {
    if ($scope.ev._id) {
      // if (image) {
      //   //fd.append('data',JSON.stringify($scope.ev));

      //   var formData = new FormData();
      //   formData.append('image', image, image.name);

      //   Restangular.all('events/' + $scope.ev._id).withHttpConfig({
      //     transformRequest: angular.identity
      //   }).customPOST(formData, '', {}, {
      //     'Content-Type': false
      //   }).then(function(res) {
      //       $scope.ev._id = res._id;
      //       events.push($scope.ev);
      //       $modalInstance.close($scope.ev);
      //   });
      // }
      // else {
        Events.update($scope.ev).then(function(res) {
          $modalInstance.close($scope.ev);
        });
      //}
    } else {

      if (ev.place) {
        venue = ev.place.split(', ');

        ev.venue = {
          country: venue[venue.length - 1]
        };

        //ev.venue.city = venue[venue.length - 2];
      }

      Events.create($scope.ev).then(function(res) {
        $scope.ev._id = res._id;
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