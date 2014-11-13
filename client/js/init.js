angular.element(document).ready(function() {
  //Fixing facebook bug with redirect
  if (window.location.hash === '#_=_') window.location.hash = '#!';



angular.module('mb-adaptive-backgrounds', ['ng']).provider('adaptiveBackgroundsOptions', function() {
  !function(n){"use strict";var t=function(){return document.createElement("canvas").getContext("2d")},e=function(n,e){var a=new Image,o=n.src||n;"data:"!==o.substring(0,5)&&(a.crossOrigin="Anonymous"),a.onload=function(){var n=t("2d");n.drawImage(a,0,0);var o=n.getImageData(0,0,a.width,a.height);e&&e(o.data)},a.src=o},a=function(n){return["rgb(",n,")"].join("")},o=function(n){return n.map(function(n){return a(n.name)})},r=5,i=10,c={};c.colors=function(n,t){t=t||{};var c=t.exclude||[],u=t.paletteSize||i;e(n,function(e){for(var i=n.width*n.height||e.length,m={},s="",d=[],f={dominant:{name:"",count:0},palette:Array.apply(null,new Array(u)).map(Boolean).map(function(){return{name:"0,0,0",count:0}})},l=0;i>l;){if(d[0]=e[l],d[1]=e[l+1],d[2]=e[l+2],s=d.join(","),m[s]=s in m?m[s]+1:1,-1===c.indexOf(a(s))){var g=m[s];g>f.dominant.count?(f.dominant.name=s,f.dominant.count=g):f.palette.some(function(n){return g>n.count?(n.name=s,n.count=g,!0):void 0})}l+=4*r}if(t.success){var p=o(f.palette);t.success({dominant:a(f.dominant.name),secondary:p[0],palette:p})}})},n.RGBaster=n.RGBaster||c}(window);;
  var options;
  options = {
    imageClass: null,
    exclude: ['rgb(0,0,0)', 'rgba(255,255,255)'],
    lightClass: 'ab-light-background',
    darkClass: 'ab-dark-background'
  };
  return {
    set: function(userOptions) {
      return angular.extend(options, userOptions);
    },
    $get: function() {
      return options;
    }
  };
}).directive('adaptiveBackground', function($window, adaptiveBackgroundsOptions) {
  var digitsRegexp, getCSSBackground, getYIQ, options;
  options = adaptiveBackgroundsOptions;
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
    link: function(scope, element, attrs) {
      var adaptBackground, childElement, findImage, handleImg, rawChildElement, rawElement, setColors, useCSSBackground;
      rawElement = element[0];
      useCSSBackground = function(el) {
        return el.tagName !== 'IMG';
      };
      findImage = function() {
        var elementWithClass, imageClass;
        imageClass = attrs.abImageClass || options.imageClass;
        if (imageClass != null) {
          elementWithClass = rawElement.querySelector('.' + imageClass);
          if (elementWithClass != null) {
            return angular.element(elementWithClass);
          }
        }
        return angular.element(element.find('img')[0]);
      };
      setColors = function(colors) {
        var yiq;
        element.css('backgroundColor', colors.dominant);
        yiq = getYIQ(colors.dominant);
        if (yiq <= 128) {
          element.addClass(options.darkClass);
          element.removeClass(options.lightClass);
        } else {
          element.addClass(options.lightClass);
          element.removeClass(options.darkClass);
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
      childElement = findImage();
      rawChildElement = childElement[0];
      if (useCSSBackground(rawChildElement)) {
        return adaptBackground(getCSSBackground(rawChildElement));
      } else {
        handleImg = function() {
          if (rawChildElement.src) {
            return adaptBackground(rawChildElement);
          }
        };
        childElement.on('load', handleImg);
        scope.$on('$destroy', function() {
          return childElement.off('load', handleImg);
        });
        return handleImg();
      }
    }
  };
});




  //Then init the app
  angular.bootstrap(document, ['wooepa']);

  (function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
      (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
      m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
  })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

  ga('create', 'UA-48693864-1', 'wooepa.com');
  ga('send', 'pageview');

  // $('.dropdown-menu input, .dropdown-menu label').click(function(e) {
  //     e.stopPropagation();
  // });

  var $window = $(window);
  var scrollTime = 1.2;
  var scrollDistance = 300;

  $window.on("mousewheel DOMMouseScroll", function(event) {

    event.preventDefault();

    var delta = event.originalEvent.wheelDelta / 120 || -event.originalEvent.detail / 3;
    var scrollTop = $window.scrollTop();
    var finalScroll = scrollTop - parseInt(delta * scrollDistance);

    TweenMax.to($window, scrollTime, {
      scrollTo: {
        y: finalScroll,
        autoKill: true
      },
      ease: Power1.easeOut,
      overwrite: 5
    });

  });
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