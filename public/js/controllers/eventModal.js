var EventModalCtrl = function($scope, $modalInstance, $state, $stateParams, ev) {
	$scope.ev = ev;

    // $modalInstance.opened.then(function(){
    //     $state.go('edit');
    // });
    // $modalInstance.result.then(null,function(){
    //     $state.go('new');
    // });
    // $scope.$on('$stateChangeSuccess', function () {
    //     // if($state.current.name != newPath){
    //         $modalInstance.dismiss('cancel')
    //     // }
    // });

	// $scope.$on('$locationChangeSuccess', function() {
	//   $scope.close(); // call your close function
	// });

	$scope.cancel = function() {
	$modalInstance.dismiss('cancel');
	};	
};