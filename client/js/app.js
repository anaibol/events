var app = angular.module('wooepa', ['wooepa-templates', 'ui.router', 'ui.bootstrap', 'ui.router', 'ezfb', 'truncate', 'ngSanitize', 'angular-data.DS', 'angular-data.DSCacheFactory', 'angularMoment', 'infinite-scroll']); //'imageupload', , 'seo' 'leaflet-directive'

angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 1000)

app.factory('Event', function(DS) {
	return DS.defineResource({
		name: 'event',
		endpoint: '/api/events',
		idAttribute: 'eid'
	});
});

app.directive('isotope', function($rootScope) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			if ($rootScope.isotope === undefined || $rootScope.isotope === null) {
				imagesLoaded(element[0].parentElement, function(instance) {
					var iso = new Isotope(element[0].parentElement, {
						itemSelector: '.event'
					});
				});
			}
		}
	};
});


// app.directive("scroll", function() {
// 	return function(scope, elm, attr) {
// 		var raw = elm[0];
// 		console.log(raw);
// 		elm.bind('scroll', function() {
// 			alert(1);
// 			if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
// 				scope.$apply(attr.whenScrolled);
// 			}
// 		});
// 	};
// });