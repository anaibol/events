'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        'title': 'Events',
        'link': 'events'
    }, {
        'title': 'Create New Event',
        'link': 'events/create'
    }];
    
    $scope.isCollapsed = false;
}]);