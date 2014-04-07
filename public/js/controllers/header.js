'use strict';

angular.module('mean.system').controller('HeaderCtrl', function ($scope, $rootScope, Global) {    
    $scope.global = Global;
    $scope.isCollapsed = true;
});