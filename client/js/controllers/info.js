app.controller('infoCtrl', function($scope, $sce) {
  $scope.headerimg = $sce.trustAsResourceUrl('/img/getrewarded/header.png');
  $scope.cadeaumail = $sce.trustAsResourceUrl('/img/getrewarded/cadeaumail.png');
  $scope.midbanner = $sce.trustAsResourceUrl('/img/getrewarded/midbanner.png');
  $scope.inviteyourfriends = $sce.trustAsResourceUrl('/img/getrewarded/inviteyourfriends.png');	
  $scope.bluearrow = $sce.trustAsResourceUrl('/img/getrewarded/bluearrow.png');
  $scope.getboosted = $sce.trustAsResourceUrl('/img/getrewarded/getboosted.png');
  $scope.redarrow = $sce.trustAsResourceUrl('/img/getrewarded/redarrow.png');
  $scope.footer = $sce.trustAsResourceUrl('/img/getrewarded/footer.png');
});