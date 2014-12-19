app.controller('infoCtrl', function($scope, $sce) {
  $scope.headerimg = $sce.trustAsResourceUrl('/img/getrewarded/header.png');
  $scope.cadeaumail = $sce.trustAsResourceUrl('/img/getrewarded/cadeaumail.png');
  $scope.midbanner = $sce.trustAsResourceUrl('/img/getrewarded/midbanner.png');
  $scope.inviteyourfriends = $sce.trustAsResourceUrl('/img/getrewarded/inviteyourfriends.png');	
  $scope.bluearrow = $sce.trustAsResourceUrl('/img/getrewarded/bluearrow.png');
  $scope.getboosted = $sce.trustAsResourceUrl('/img/getrewarded/getboosted.png');
  $scope.redarrow = $sce.trustAsResourceUrl('/img/getrewarded/redarrow.png');
  $scope.playbutton = $sce.trustAsResourceUrl('/img/getrewarded/playbutton.png');
  $scope.footer = $sce.trustAsResourceUrl('/img/getrewarded/footer.png');
  $scope.headermail = $sce.trustAsResourceUrl('/img/discoverevents/headermail.png');
  $scope.loupemail = $sce.trustAsResourceUrl('/img/discoverevents/loupemail.png');
  $scope.cadeaumail = $sce.trustAsResourceUrl('/img/discoverevents/cadeaumail.png');
  $scope.megaphonemail = $sce.trustAsResourceUrl('/img/discoverevents/megaphonemail.png');
  $scope.midbanner = $sce.trustAsResourceUrl('/img/discoverevents/midbanner.png');
  $scope.loupemailbot = $sce.trustAsResourceUrl('/img/discoverevents/loupemailbot.png');
});