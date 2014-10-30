// app.directive('moDateInput', function($window) {
//     return {
//         require:'^ngModel',
//         restrict:'A',
//         link:function (scope, elm, attrs, ctrl) {
//             var moment = $window.moment;
//             var dateFormat = attrs.moMediumDate;
//             attrs.$observe('moDateInput', function (newValue) {
//                 if (dateFormat == newValue || !ctrl.$modelValue) return;
//                 dateFormat = newValue;
//                 ctrl.$modelValue = new Date(ctrl.$setViewValue);
//             });

//             ctrl.$formatters.unshift(function (modelValue) {
//                 if (!dateFormat || !modelValue) return "";
//                 var retVal = moment(modelValue).format(dateFormat);
//                 return retVal;
//             });

//             ctrl.$parsers.unshift(function (viewValue) {
//                 var date = moment(viewValue, dateFormat);
//                 return (date && date.isValid() && date.year() > 1950 ) ? date.toDate() : "";
//             });
//         }
//     };
// });

// app.directive("linkOverload", function () {
//     return function (scope, element) {
//         element.on("click", function (evt) {           
//             evt.preventDefault();
//         });
//     }
// });

// app.directive('backImg', function() {
//     return function(scope, element, attrs){
//         var url = attrs.backImg;
//         console.log(url);
//         element.css({
//             'background-image': 'url(' + url +')',
//             'background-size' : 'cover'
//         });
//     };
// });

app.directive('isotope', function($rootScope) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      if ($rootScope.isotope === undefined || $rootScope.isotope === null) {
        imagesLoaded(element[0].parentElement, function(instance) {
          var iso = new Isotope(element[0].parentElement, {
            itemSelector: '.event'
          });
          console.timeEnd('render list');
        });
      } else {
        // imagesLoaded(element[0].parentElement, function(instance) {
        //   $rootScope.iso.appended(element[0]);
        // });
      }
    }
  };
});


app.directive('friendSelector', function() {
  return {
    restrict: 'A',
    link: function(scope, elem) {
      $(elem).fSelector({
        onSubmit: function(response) {
          // example response usage
          alert(response);
        }
      });
    }
  };
});

// app.directive("scroll", function() {
//  return function(scope, elm, attr) {
//      var raw = elm[0];
//      console.log(raw);
//      elm.bind('scroll', function() {
//          alert(1);
//          if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
//              scope.$apply(attr.whenScrolled);
//          }
//      });
//  };
// });

app.directive('mydatepicker', function(datepickerDirective) {
  return angular.extend({}, datepickerDirective, {
    templateUrl: 'datepicker' // custom datepicker template
  });
});


app.directive("sticky", function($window) {
  return {
    link: function(scope, element, attrs) {

      var $win = angular.element($window);

      if (scope._stickyElements === undefined) {
        scope._stickyElements = [];

        $win.bind("scroll.sticky", function(e) {
          var pos = $win.scrollTop();
          for (var i = 0; i < scope._stickyElements.length; i++) {

            var item = scope._stickyElements[i];

            if (!item.isStuck && pos > item.start) {
              item.element.addClass("stuck");
              item.isStuck = true;
            } else if (item.isStuck && pos < item.start) {
              item.element.removeClass("stuck");
              item.isStuck = false;
            }
          }
        });

        var recheckPositions = function() {
          for (var i = 0; i < scope._stickyElements.length; i++) {
            var item = scope._stickyElements[i];
            if (!item.isStuck) {
              item.start = item.element.offset().top;
            }
          }
        };
        $win.bind("load", recheckPositions);
        $win.bind("resize", recheckPositions);
      }

      var item = {
        element: element,
        isStuck: false,
        start: element.offset().top
      };

      scope._stickyElements.push(item);

    }
  };
});