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

app.directive('shareEvent', function($http) 
{
return {
            restrict : 'A',
            link : function (scope, element, req) {
                element.on("click", function () {           
                    $http({
                            method : 'POST',
                            data:{eid:scope.ev.eid},
                            url :'/api/share/' + scope.ev.eid,
                         });
            });
        }
    }

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
            method : 'POST',
            data:{eid:scope.ev.eid,uids:uid},
            url :'/api/invite/' + scope.ev.eid + '/' + uid,
        }).success(function(data) {
            
        });    
                }
            });
        }
    }
});

app.directive('setAttendings', function($http) {
    return {
            restrict: 'A',
            scope: true,
            link: function(scope, elem) {
                $(elem).on("click",function() {
                    if (scope.attending == 'Join')
                    {
                        $http.post('/api/rsvp/' + scope.ev.eid + '/rsvp');//.post({attendingStatus: 'attending'});
                        scope.attending = 'Leave';
                        //$(this).textContent = 'Leave';
                    }
                    else if (scope.attending == 'Leave')
                    {
                        $http.post('/api/rsvpn/' + scope.ev.eid + '/rsvpn');//.post({attendingStatus: 'declined'});
                        scope.attending = 'Join';         
                    //    $(this).textContent = 'Join';
                    }
                    $('#event-rsvp-btns').html(scope.attending);
                   //scope.$apply();
                    //location.reload();
                  });

                }
        }
    }
);

app.directive('scrollToFixed', function() {
    return {
        restrict: 'A',
        link: function(scope, elem) {
            $(elem).scrollToFixed({
                preFixed: function() {
                    //$('#navbar').removeClass('container').hide().fadeIn(300);
                    $(this).css('opacity', '.95');
                },
                postFixed: function() {
                    //$('#navbar').addClass('container').hide().fadeIn(300);
                    $(this).css('opacity', '1');
                }
            });
        }
    }
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