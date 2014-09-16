'use strict';

app.directive('moDateInput', function ($window) {
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

app.directive("linkOverload", function () {
    return function (scope, element) {
        element.on("click", function (evt) {           
            evt.preventDefault();
        });
    }
});

app.directive('backImg', function() {
    return function(scope, element, attrs){
        var url = attrs.backImg;
        console.log(url);
        element.css({
            'background-image': 'url(' + url +')',
            'background-size' : 'cover'
        });
    };
});