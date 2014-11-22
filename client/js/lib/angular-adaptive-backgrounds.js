angular.module('mb-adaptive-backgrounds', ['ng']).provider('adaptiveBackgroundsOptions', function() {
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
