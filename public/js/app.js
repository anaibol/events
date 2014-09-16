'use strict';

var app = angular.module('wooepa', ['ui.router', 'ui.bootstrap', 'wooepa.system', 'ui.router', 'ezfb', 'restangular', 'ngAutocomplete', 'ngTagsInput', 'truncate', 'ngSanitize', 'ngSanitize', 'angularMoment']); //'imageupload', , 'seo' 'leaflet-directive',  'ngCookies', 'ngResource', 'infinite-scroll' 'akoenig.deckgrid' 'ezfb',

app.provider('modalState', function($stateProvider) {
    var provider = this;
    this.$get = function() {
        return provider;
    }
    this.state = function(stateName, options) {
        var modalInstance;
        $stateProvider.state(stateName, {
            url: options.url,
            onEnter: function($modal, $state) {
                modalInstance = $modal.open(options);
                modalInstance.result['finally'](function() {
                    modalInstance = null;
                    if ($state.$current.name === stateName) {
                        $state.go('^');
                    }
                });
            },
            onExit: function() {
                if (modalInstance) {
                    modalInstance.close();
                }
            }
        });
    };
});

angular.module('wooepa.system', []);
angular.module('wooepa.events', []);