app.controller('HeaderCtrl', function($scope, $rootScope) {
	$rootScope.loc.city = $rootScope.loc.citySlug;
	function getStringDate(aDate) {
		var dd = aDate;
		var yy = dd.getYear();
		var mm = dd.getMonth() + 1;
		dd = dd.getDate();
		if (yy < 2000) {
			yy += 1900;
		}
		if (mm < 10) {
			mm = "0" + mm;
		}
		if (dd < 10) {
			dd = "0" + dd;
		}
		var rs = yy + "-" + mm + "-" + dd;
		return rs;
	}
});