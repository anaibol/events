app.controller('infoCtrl', function($scope, $sce) {
  $scope.headerimg = $sce.trustAsResourceUrl('/img/getrewarded/header.jpg');
  $scope.cadeaumail = $sce.trustAsResourceUrl('/img/getrewarded/cadeaumail.png');
  $scope.midbannerreward = $sce.trustAsResourceUrl('/img/getrewarded/midbanner.png');
  $scope.inviteyourfriends = $sce.trustAsResourceUrl('/img/getrewarded/inviteyourfriends.jpg');	
  $scope.bluearrow = $sce.trustAsResourceUrl('/img/getrewarded/bluearrow.png');
  $scope.getboosted = $sce.trustAsResourceUrl('/img/getrewarded/getboosted.jpg');
  $scope.redarrow = $sce.trustAsResourceUrl('/img/getrewarded/redarrow.png');
  $scope.footerreward = $sce.trustAsResourceUrl('/img/getrewarded/footer.jpg');
  $scope.playbutton = $sce.trustAsResourceUrl('/img/getrewarded/playbutton.png');
  
  $scope.headermail = $sce.trustAsResourceUrl('/img/discoverevents/headermail.jpg');
  $scope.loupemail = $sce.trustAsResourceUrl('/img/discoverevents/loupemail.png');
  $scope.cadeaumail = $sce.trustAsResourceUrl('/img/discoverevents/cadeaumail.png');
  $scope.megaphonemail = $sce.trustAsResourceUrl('/img/discoverevents/megaphonemail.png');
  $scope.midbanner = $sce.trustAsResourceUrl('/img/discoverevents/midbanner.jpg');
  $scope.loupemailbot = $sce.trustAsResourceUrl('/img/discoverevents/loupemailbot.png');
  $scope.footer = $sce.trustAsResourceUrl('/img/discoverevents/footer.jpg');
  $scope.headerboost = $sce.trustAsResourceUrl('/img/boostyourevent/header.png');
  $scope.boostmidbanner = $sce.trustAsResourceUrl('/img/boostyourevent/midbanner.png');
});