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
        });
    }
  };
});

app.directive('boostPlayer', function($http) {
  return {
    restrict: 'A',
    link: function(scope, elem, req) {
      $(elem).on("click", function() {
        $http.post('/api/boost/' + scope.ev.eid + '/' + scope.player.uid);
        $http.post('/api/boost/update/' + scope.ev.eid + '/' + scope.player.uid);
      });
      //$(elem).html(retour);
    }
  };
});

app.directive('isotope', function($timeout, $rootScope) {
  return {
    restrict: 'A',
    link: function(scope, element) {
      if ($rootScope.isMobile) {
        return;
      }

      $timeout(function() {
        var elm = angular.element(element);

        elm.imagesLoaded( function() {
          elm.removeClass('loading');
          // $('#wrapper').css('height', $('.events').innerHeight() + 50);
          elm.isotope({
            onLayout: function() {
              elm.imagesLoaded( function() {
                elm.isotope('reLayout');
              });
            }
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
          $("button.btn.btn-primary.share").html("Share again?");
          $("li.list-group-item.players").html("<li class='list-group-item players' ng-repeat='player in ev.list_event_players'></li>");
      });
      });
    });
  }
};
});

app.directive('friendSelector', function($http) {
  return {
    restrict: 'A',
    link: function(scope, elem, req) {
      $(elem).fSelector({
        onSubmit: function(uid) {
          // example response usage
          var event_intives = {
            method: 'events.invite',
            eid: scope.ev.eid,
            uids: uid,
            personal_message: 'custom request message'
          };
          $http({
            method: 'POST',
            data: {
              eid: scope.ev.eid,
              uids: uid
            },
            url: '/api/invite/' + scope.ev.eid + '/' + uid,
          }).success(function(data) {
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
          $("button.btn.btn-primary.invite").html("Invite again?");
          $("li.list-group-item.players").html("<li class='list-group-item players' ng-repeat='player in ev.list_event_players'></li>");
      });
          });
        }
      });
    }
  };
});

app.directive('setAttendings', function($http) {
  return {
    restrict: 'A',
    scope: true,
    link: function(scope, elem) {
      $(elem).on('click', function() {
        if (!scope.user || !scope.user.facebook || !scope.user.facebook.id)
        {
          document.location.href='/auth/facebook';
        }
        else if (scope.attending == 'Join') {
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
          $("button.btn.btn-primary.join").html(scope.attending);
      });
          });
          scope.attending = 'Leave';
        } else if (scope.attending == 'Leave') {
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
          $("li.list-group-item.players").html("<li class='list-group-item players' ng-repeat='player in ev.list_event_players'></li>");
          $("button.btn.btn-primary.join").html(scope.attending);
      });
          });
          scope.attending = 'Join';
        } 
    });
  }
  };
});

app.directive('myTest', function(){
  return {
    restrict: 'A',
    scope: true,
    link: function(scope, elem){
  $(elem).countdown({until: scope.ev.promotion.end_date});
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
          elm.find("section:not(.header)").css('backgroundColor', colors.dominant);
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