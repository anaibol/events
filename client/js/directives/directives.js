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

app.directive('listEventPlayer', function($http){
    return{
        restrict : 'A',
        link: function(scope, element, attrs)
        {
        $http({
            method : 'GET',
            data:{eid:scope.ev.eid},
            url :'/api/list_player/' + scope.ev.eid
          }).success(function(data) {
        scope.ev.list_event_players = data;
            }
        );
}
}
});

app.directive('boostPlayer', function($http){
return {
            restrict: 'A',
            link: function(scope, elem, req) {
                $(elem).on("click",function() {
                    $http.post('/api/boost/' + scope.ev.eid + '/'+ scope.player.uid);
                    $http.post('/api/boost/update/' +scope.ev.eid + '/'+ scope.player.uid);
                  });
                //$(elem).html(retour);
                }
        }
});

app.directive('isotope', function($rootScope) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      imagesLoaded(element[0].parentElement, function(instance) {
        var iso = new Isotope(element[0].parentElement, {
          itemSelector: '.event'
        });
        console.timeEnd('render list');
      });
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

// app.directive('mydatepicker', function(datepickerDirective) {
//   return angular.extend({}, datepickerDirective, {
//     templateUrl: 'datepicker' // custom datepicker template
//   });
// });


// app.directive("sticky", function($window) {
//   return {
//     link: function(scope, elm, attrs) {

//       var $win = angular.element($window);

//       if (scope._stickyElements === undefined) {
//         scope._stickyElements = [];

//         $win.bind("scroll.sticky", function(e) {
//           var pos = $win.scrollTop();
//           for (var i = 0; i < scope._stickyElements.length; i++) {

//             var item = scope._stickyElements[i];

//             if (!item.isStuck && pos > item.start) {
//               item.element.addClass("stuck");
//               item.isStuck = true;
//             } else if (item.isStuck && pos < item.start) {
//               item.element.removeClass("stuck");
//               item.isStuck = false;
//             }
//           }
//         });

//         var recheckPositions = function() {
//           for (var i = 0; i < scope._stickyElements.length; i++) {
//             var item = scope._stickyElements[i];
//             if (!item.isStuck) {
//               item.start = item.element.offset().top;
//             }
//           }
//         };
//         $win.bind("load", recheckPositions);
//         $win.bind("resize", recheckPositions);
//       }

//       var item = {
//         element: elm,
//         isStuck: false,
//         start: elm.offset().top
//       };

//       scope._stickyElements.push(item);

//     }
//   };
// });

// app.directive("datepicker", function() {
//   return {
//     restrict: "A",
//     templateUrl: "datepicker",
//     compile: function(a, b) {
//       if (!b.$attr.sort) {
//         var c = a[0].getElementsByClassName("sort")[0];
//         c.parentNode.removeChild(c);
//       }
//     }
//   };
// });