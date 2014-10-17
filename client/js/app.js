var app = angular.module('wooepa', ['wooepa-templates', 'ui.router', 'ui.bootstrap', 'ui.router', 'ezfb', 'truncate', 'ngSanitize', 'angular-data.DS', 'angular-data.DSCacheFactory', 'angularMoment', 'infinite-scroll', 'headroom']); //'imageupload', , 'seo' 'leaflet-directive'

angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 1000)

app.factory('Event', function(DS) {
	return DS.defineResource({
		name: 'event',
		endpoint: '/api/events',
		idAttribute: 'eid'
	});
});