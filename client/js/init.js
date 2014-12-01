angular.element(document).ready(function() {
  //Fixing facebook bug with redirect
  if (window.location.hash === '#_=_') window.location.hash = '#!';

  //Then init the app
  angular.bootstrap(document, ['wooepa']);

  // (function(i, s, o, g, r, a, m) {
  //   i['GoogleAnalyticsObject'] = r;
  //   i[r] = i[r] || function() {
  //     (i[r].q = i[r].q || []).push(arguments)
  //   }, i[r].l = 1 * new Date();
  //   a = s.createElement(o),
  //     m = s.getElementsByTagName(o)[0];
  //   a.async = 1;
  //   a.src = g;
  //   m.parentNode.insertBefore(a, m)
  // })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

  // ga('create', 'UA-48693864-1', 'wooepa.com');
  // ga('send', 'pageview');

  // $('.dropdown-menu input, .dropdown-menu label').click(function(e) {
  //     e.stopPropagation();
  // });

  // var $window = $(window);
  // var scrollTime = 1.2;
  // var scrollDistance = 300;

  // $window.on("mousewheel DOMMouseScroll", function(event) {
  //   event.preventDefault();

  //   var delta = event.originalEvent.wheelDelta / 120 || -event.originalEvent.detail / 3;
  //   var scrollTop = $window.scrollTop();
  //   var finalScroll = scrollTop - parseInt(delta * scrollDistance);

  //   TweenMax.to($window, scrollTime, {
  //     scrollTo: {
  //       y: finalScroll,
  //       autoKill: true
  //     },
  //     ease: Power1.easeOut,
  //     overwrite: 5
  //   });

  // });
});

_.mixin({
  compactObject: function(o) {
    _.each(o, function(v, k) {
      if (!v) {
        delete o[k];
      }
    });
    return o;
  }
});