app.controller('blockMail', function($scope, $http, $window) {
	url = $window.location.href;
	var i = 0;
	var mid = "";
	while (url[i])
	{
		if (url[i - 1] == '=' || mid.length >= 1)
		{
			mid += url[i];
		}
		++i;
	}
	$http({method: 'GET',data: {mid: mid},url: '/api/unsubscribe/' + mid,}).success(function(data){
	  	if (data)
	   	{
	  		$scope.blocked = data.from.facebook;
	  		$scope.unsubuser = data.to.facebook;
	   	}
    });
   	$scope.addToSpam = function()
   	{
   		$http({method: 'POST',data: {'fromid' : $scope.blocked.id, 'toid' : $scope.unsubuser.id},url: '/api/addtospam/' + $scope.blocked.id + '/' + $scope.unsubuser.id});
   	};
   	$scope.blockAll = function()
   	{
  		$http({method: 'POST',data: {'toid' : $scope.unsubuser.id},url: '/api/blockall/' + $scope.unsubuser.id});
   	};
});