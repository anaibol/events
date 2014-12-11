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
//     return function (scope, elm) {
//         elm.on("click", function (evt) {           
//             evt.preventDefault();
//         });
//     }
// });

// app.directive('backImg', function() {
//     return function(scope, elm, attrs){
//         var url = attrs.backImg;
//         console.log(url);
//         elm.css({
//             'background-image': 'url(' + url +')',
//             'background-size' : 'cover'
//         });
//     };
// });

app.directive( 'editInPlace', function() {
  return {
    restrict: 'E',
    scope: { value: '=' },
    template: '<span ng-click="edit()" ng-bind="value"></span><input ng-model="value"></input>',
    link: function ( $scope, element, attrs ) {
      // Let's get a reference to the input element, as we'll want to reference it.
      var inputElement = angular.element( element.children()[1] );
      
      // This directive should have a set class so we can style it.
      element.addClass( 'edit-in-place' );
      
      // Initially, we're not editing.
      $scope.editing = false;
      
      // ng-click handler to activate edit-in-place
      $scope.edit = function () {
        $scope.editing = true;
        
        // We control display through a class on the directive itself. See the CSS.
        element.addClass( 'active' );
        
        // And we must focus the element. 
        // `angular.element()` provides a chainable array, like jQuery so to access a native DOM function, 
        // we have to reference the first element in the array.
        inputElement[0].focus();
      };
      
      // When we leave the input, we're done editing.
      inputElement.prop( 'onblur', function() {
        alert("aaa");
        if (inputElement[0].value != '')
        {
          $scope.ev.price.full = inputElement[0].value;
          $http({method: 'POST',data:{eid:$scope.ev.eid, edited_price: $scope.ev.price.full},url: '/api/event/update/' + $scope.ev.eid})
        }
        $scope.editing = false;
        element.removeClass('active');
      });
    }
  };
});

app.directive('listEventPlayer', function($http, $rootScope) {
  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {
      if ($rootScope.isMobile) {
        return;
      }

      $http({
        method: 'GET',
        data: {
          eid: scope.ev.eid
        },
        url: '/api/list_player/' + scope.ev.eid
      }).success(function(data) {
              scope.ev.list_event_players = data;
              var i = 0;
              while (scope.ev.list_event_players[i])
              {
                  if (scope.ev.list_event_players[i].uid == parseInt(scope.user.facebook.id))
                      scope.user.result = scope.ev.list_event_players[i].result;
                ++i;
              }
        });
    }
  };
});

app.directive('isotope', function($timeout, $rootScope) {
  return {
    restrict: 'A',
    link: function(scope, elm) {
      if ($rootScope.isMobile) {
        return;
      }

      $timeout(function() {
        imagesLoaded(elm, function() {
          elm.removeClass('loading');
          // $('#wrapper').css('height', $('.events').innerHeight() + 50);


          // $('#wrapper').css('height', $('.events').innerHeight() + 50);
          // console.log(elm);
          var iso = new Isotope(elm[0], {
            // onLayout: function() {
            //   imagesLoaded(elm, function() {
            //     var iso = new Isotope(element, {});
            //     elm.isotope('reLayout');
            //   });
            // });
          });
        });
      });
    }
  };
});

// app.directive('background', function($timeout) {
//   return {
//     restrict: 'A',
//     compile: function compile(telm, tAttrs, transclude) {
//       return {
//         post: function postLink(scope, elm, iAttrs, controller) {
//             // console.log('child post')

//           $timeout(function(){
//             var image = $(elm).find('img:first')[0];

//             RGBaster.colors(image, {
//               success: function(payload) {
//                 // You now have the payload.
//                 console.log(payload.dominant);
//                 console.log(payload.secondary);
//                 console.log(payload.palette);

//                 elm.css('backgroundColor', payload.dominant);
//               }
//             });
//           }); 
//         },
//         pre:  function preLink(scope, ielm, iAttrs, controller) {
//           console.log('child pre');
//         }
//       };
//     }
//   };
// });

app.directive('shareEvent', function($http) {
  return {
    restrict: 'A',
    link: function(scope, elm, req) {
      elm.on("click", function() {
        $http({
          method: 'POST',
          data: {
            eid: scope.ev.eid
          },
          url: '/api/share/' + scope.ev.eid,
        }).success(function(){
            $http({
        method: 'GET',
        data: {
          eid: scope.ev.eid
        },
        url: '/api/list_player/' + scope.ev.eid
      }).success(function(data) {
        if (data)
        {
          var i = 0;
          scope.ev.list_event_players = data;
        }
          elm.html("Share again?");
          $("li.list-group-item.players").html("<li class='list-group-item players' ng-repeat='player in ev.list_event_players'></li>");
      });
      });
    });
  }
};
});

app.directive('setAttendings', function($http) {
  return {
    restrict: 'A',
    scope: true,
    link: function(scope, elm) {
      elm.on('click', function() {
        if (!scope.user || !scope.user.facebook || !scope.user.facebook.id)
        {
          document.location.href='/auth/facebook';
        }
        else if (scope.attending == 'Join') {
          scope.attending = 'Leave';
          elm.html('Leave');
          $http.post('/api/rsvp/' + scope.ev.eid + '/rsvp').success(function(){
            $http({
        method: 'GET',
        data: {
          eid: scope.ev.eid
        },
        url: '/api/list_player/' + scope.ev.eid
      }).success(function(data) {
        if (data)
        {
          var i = 0;
          scope.ev.list_event_players = data;
        }
          $("li.list-group-item.players").html("<li class='list-group-item players' ng-repeat='player in ev.list_event_players'></li>");
          elm.html(scope.attending);
      });
          });
        } else if (scope.attending == 'Leave') {
          scope.attending = 'Join';
          elm.html('Join');
          $http.post('/api/rsvpn/' + scope.ev.eid + '/rsvpn').success(function(){
            $http({
        method: 'GET',
        data: {
          eid: scope.ev.eid
        },
        url: '/api/list_player/' + scope.ev.eid
      }).success(function(data) {
        if (data)
        {
          var i = 0;
          scope.ev.list_event_players = data;
        }
          $("li.list-group-item.players").html("<li class='list-group-item players' ng-repeat='player in ev.list_event_players'></li>");      });
          });
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

app.directive('adaptiveBackground', function($window) {
  var digitsRegexp, getCSSBackground, getYIQ, options;

  options = {
    imageClass: null,
    exclude: ['rgb(0,0,0)', 'rgba(255,255,255)'],
    lightClass: 'ab-light-background',
    darkClass: 'ab-dark-background'
  };

  getCSSBackground = function(raw) {
    return $window.getComputedStyle(raw, null).getPropertyValue('background-image').replace('url(', '').replace(')', '');
  };
  digitsRegexp = /\d+/g;
  getYIQ = function(color) {
    var rgb;
    rgb = color.match(digitsRegexp);
    return ((rgb[0] * 299) + (rgb[1] * 587) + (rgb[2] * 114)) / 1000;
  };
  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {
      var adaptBackground, childelm, findImage, handleImg, rawChildelm, rawElm, setColors, useCSSBackground;
      rawElm = elm[0];
      useCSSBackground = function(el) {
        return el.tagName !== 'IMG';
      };
      findImage = function() {
        var elmWithClass, imageClass;
        imageClass = attrs.abImageClass || options.imageClass;
        if (imageClass != null) {
          elmWithClass = rawElm.querySelector('.' + imageClass);
          if (elmWithClass != null) {
            return angular.element(elmWithClass);
          }
        }
        return angular.element(elm.find('img')[0]);
      };
      setColors = function(colors) {
        var yiq;

        // if (attrs.abAddTransparency) {
          colors.dominant = colors.dominant.replace('rgb', 'rgba').replace(')', ', 0.5)');
        // }

        if (attrs.abBgToClass) {
          angular.element(elm[0].querySelector("section:not(.header)")).css('backgroundColor', colors.dominant);
        } else {
          elm.css('backgroundColor', colors.dominant);
        }

        yiq = getYIQ(colors.dominant);
        if (yiq <= 128) {
          elm.addClass(options.darkClass);
          elm.removeClass(options.lightClass);
        } else {
          elm.addClass(options.lightClass);
          elm.removeClass(options.darkClass);
        }
        colors.backgroundYIQ = yiq;
        return scope.adaptiveBackgroundColors = colors;
      };
      adaptBackground = function(image) {
        return RGBaster.colors(image, {
          paletteSize: 20,
          exclude: options.exclude,
          success: setColors
        });
      };
      childelm = findImage();
      rawChildelm = childelm[0];
      if (useCSSBackground(rawChildelm)) {
        return adaptBackground(getCSSBackground(rawChildelm));
      } else {
        handleImg = function() {
          if (rawChildelm.src) {
            return adaptBackground(rawChildelm);
          }
        };
        childelm.on('load', handleImg);
        scope.$on('$destroy', function() {
          return childelm.off('load', handleImg);
        });
        return handleImg();
      }
    }
  };
});


// app.directive('infiniteScroll', [
//   '$rootScope', '$window', '$timeout', function($rootScope, $window, $timeout) {
//     return {
//       link: function(scope, elem, attrs) {
//         var checkWhenEnabled, handler, scrollDistance, scrollEnabled;
//         $window = angular.element($window);
//         // elem.css('overflow-y', 'scroll');
//         // elem.css('overflow-x', 'hidden');
//         // elem.css('height', 'inherit');
//         scrollDistance = 0;
//         if (attrs.infiniteScrollDistance != null) {
//           scope.$watch(attrs.infiniteScrollDistance, function(value) {
//             return scrollDistance = parseInt(value, 10);
//           });
//         }
//         scrollEnabled = true;
//         checkWhenEnabled = false;
//         if (attrs.infiniteScrollDisabled != null) {
//           scope.$watch(attrs.infiniteScrollDisabled, function(value) {
//             scrollEnabled = !value;
//             if (scrollEnabled && checkWhenEnabled) {
//               checkWhenEnabled = false;
//               return handler();
//             }
//           });
//         }
//         $rootScope.$on('refreshStart', function(event, parameters){
//             elem.animate({ scrollTop: "0" });
//         });
//         handler = function() {
//           var container, elmBottom, remaining, shouldScroll, containerBottom;
//           container = $(elem.children()[0]);
//           elmBottom = elem.offset().top + elem.height();
//           containerBottom = container.offset().top + container.height();
//           remaining = containerBottom - elmBottom ;
//           shouldScroll = remaining <= elem.height() * scrollDistance;
//           if (shouldScroll && scrollEnabled) {
//             if ($rootScope.$$phase) {
//               return scope.$eval(attrs.infiniteScroll);
//             } else {
//               return scope.$apply(attrs.infiniteScroll);
//             }
//           } else if (shouldScroll) {
//             return checkWhenEnabled = true;
//           }
//         };
//         elem.on('scroll', handler);
//         scope.$on('$destroy', function() {
//           return $window.off('scroll', handler);
//         });
//         return $timeout((function() {
//           if (attrs.infiniteScrollImmediateCheck) {
//             if (scope.$eval(attrs.infiniteScrollImmediateCheck)) {
//               return handler();
//             }
//           } else {
//             return handler();
//           }
//         }), 0);
//       }
//     };
//   }
// ]);