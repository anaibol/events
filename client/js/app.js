var app = angular.module('wooepa', ['wooepa-templates', 'ui.router', 'ui.bootstrap', 'ui.router', 'ezfb', 'truncate', 'ngSanitize', 'angular-data.DS', 'angular-data.DSCacheFactory', 'angularMoment', 'infinite-scroll']); //'imageupload', , 'seo' 'leaflet-directive'

angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 1000)

app.factory('Event', function(DS) {
	return DS.defineResource({
		name: 'event',
		endpoint: '/api/events',
		idAttribute: 'eid'
	});
});

app.directive('packery', function($rootScope) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			if ($rootScope.packery === undefined || $rootScope.packery === null) {
				imagesLoaded(element[0].parentElement, function(instance) {
					$rootScope.packery = new Packery(element[0].parentElement);


					$rootScope.packery.bindResize();
					$rootScope.packery.appended(element[0]);
					$rootScope.packery.items.splice(1, 1); // hack to fix a bug where the first element was added twice in two different positions
				});
			}
			// else {
			// 	imagesLoaded(element[0].parentElement, function(instance) {
			// 		$rootScope.packery.appended(element[0]);
			// 	});
			// }
			// imagesLoaded(element[0].parentElement, function(instance) {
			// 	$rootScope.packery.layout();
			// });

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