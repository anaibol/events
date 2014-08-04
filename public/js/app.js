'use strict';

var app = angular.module('wooepa', ['ui.router', 'ui.bootstrap', 'wooepa.system', 'wooepa.events', 'restangular', 'ngAutocomplete', 'ngTagsInput', 'truncate']); //'imageupload', , 'seo' 'leaflet-directive',  'ngCookies', 'ngResource', 'infinite-scroll' 'akoenig.deckgrid' 'ezfb', 

app.provider('modalState', function($stateProvider) {
    var provider = this;
    this.$get = function() {
        return provider;
    }
    this.state = function(stateName, options) {
        var modalInstance;
        console.log(stateName)
        console.log(options)
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