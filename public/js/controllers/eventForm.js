var EventFormCtrl = function($scope, $modalInstance, ev, $q, $filter, Restangular) {
  $scope.previewImage = function(element) {
     $scope.$apply(function(scope) {
        var reader = new FileReader();

        reader.onload = function() {scope
            $scope.imageSrc = this.result;
        };

        if (element.files[0]) {
          $scope.ev.image = element.files[0].name;
          reader.readAsDataURL(element.files[0]);
        }
     });
  };

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
    if ($scope.ev._id) {
      if (image) {
        var formData = new FormData();
        formData.append('image', image.dataURL);

        formData.append('model', angular.toJson($scope.ev));

        Restangular.all('events/' + $scope.ev._id).withHttpConfig({transformRequest: angular.identity}).customPOST(formData, undefined, undefined, {'Content-Type': undefined, enctype:'multipart/form-data'}).then(function(res){
          $modalInstance.close($scope.ev);
        });
      } else {
        Events.put($scope.ev).then(function(res) {
          $modalInstance.close($scope.ev);
        });
      }
    } else {
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
