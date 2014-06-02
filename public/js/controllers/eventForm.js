var EventFormCtrl = function($scope, $modalInstance, ev, $q, $filter, Restangular) {
  $scope.result = '';

  $scope.days =[
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ];

  $scope.options = {
    types: '(establishment)'
  };

  if (ev) {
    $scope.ev = ev;
  }
  else {
    $scope.ev = {
      start_time: new Date(),
      venue: {
        country: "Argentina"
      }
    };
  }

var words = ['salsa', 'bachata', 'kizomba', 'porto', 'cubaine', 'cubana', 'semba', 'samba', 'merengue', 'tango', 'lambazouk', 'regueton', 'reggaeton', 'kuduru', 'suelta'];

  $scope.words = function(query) {
    var deferred = $q.defer();
    deferred.resolve($filter('filter')(words, query));
    return deferred.promise;
  };

  $scope.submit = function(image) {
          console.log($scope.ev)
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
      if ($scope.ev.place) {
        var venue = $scope.ev.place.split(', ');

        $scope.ev.venue = {
          country: venue[venue.length - 1]
        };

        //ev.venue.city = venue[venue.length - 2];
      }

      if (image) {
        var formData = new FormData();
        formData.append('image', image.dataURL);

        formData.append('model', angular.toJson($scope.ev));

        Restangular.all('events').withHttpConfig({transformRequest: angular.identity}).customPOST(formData, undefined, undefined, {'Content-Type': undefined, enctype:'multipart/form-data'}).then(function(res){
          $modalInstance.close($scope.ev);
        });
      } else {
        Events.post($scope.ev).then(function(res) {
          $modalInstance.close($scope.ev);
        });
      }
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
