'use strict';

angular.module('mean').directive('moDateInput', function ($window) {
    return {
        require:'^ngModel',
        restrict:'A',
        link:function (scope, elm, attrs, ctrl) {
            var moment = $window.moment;
            var dateFormat = attrs.moMediumDate;
            attrs.$observe('moDateInput', function (newValue) {
                if (dateFormat == newValue || !ctrl.$modelValue) return;
                dateFormat = newValue;
                ctrl.$modelValue = new Date(ctrl.$setViewValue);
            });

            ctrl.$formatters.unshift(function (modelValue) {
                if (!dateFormat || !modelValue) return "";
                var retVal = moment(modelValue).format(dateFormat);
                return retVal;
            });

            ctrl.$parsers.unshift(function (viewValue) {
                var date = moment(viewValue, dateFormat);
                return (date && date.isValid() && date.year() > 1950 ) ? date.toDate() : "";
            });
        }
    };
});


angular.module('mean').directive('sortBy', function () {
  return {
    templateUrl: 'sort-by.html',
    restrict: 'E',
    transclude: true,
    replace: true,
    scope: {
      sortOrder: '=',
      sortBy: '=',
      sortValue: '@',
      onSort: '='
    },
    link: function (scope, element, attrs) {
      scope.sort = function () {
        if (scope.sortBy == scope.sortValue)
          scope.sortOrder = scope.sortOrder == '1' ? '-1' : '1';
        else {
          scope.sortBy = scope.sortValue;
          scope.sortOrder = '1';
        }
        console.log(scope);
        scope.onSort(scope.sortBy, scope.sortOrder);
      }
    }
  };
});

angular.module('mean').directive('onBlurChange', function ($parse) {
  return function (scope, element, attr) {
    var fn = $parse(attr['onBlurChange']);
    var hasChanged = false;
    element.on('change', function (event) {
      hasChanged = true;
    });

    element.on('blur', function (event) {
      if (hasChanged) {
        scope.$apply(function () {
          fn(scope, {$event: event});
        });
        hasChanged = false;
      }
    });
  };
});

angular.module('mean').directive('onEnterBlur', function() {
  return function(scope, element, attrs) {
    element.bind("keydown keypress", function(event) {
      if(event.which === 13) {
        element.blur();
        event.preventDefault();
      }
    });
  };
});