angular.module("config", []).constant("colors", [
  [99, 172, 255],
  [35, 205, 225],
  [52, 207, 187],
  [91, 198, 103],
  [255, 180, 0],
  [253, 159, 37],
  [237, 74, 86],
  [252, 100, 150],
  [239, 106, 219],
  [168, 113, 211]
]).constant("colorsHex", ["#63acff", "#23cde1", "#34cfbb", "#5bc667", "#ffb400", "#fd9f25", "#ed4a56", "#fc6496", "#ef6adb", "#a871d3"]).constant("pins", {
  red: {
    def: "//vamos.s3.amazonaws.com/web/assets/map_pin_red@2x.png",
    heart: "//vamos.s3.amazonaws.com/web/assets/map_pin_red-heart@2x.png",
    going: "//vamos.s3.amazonaws.com/web/assets/map_pin_red-going@2x.png",
    friends: "//vamos.s3.amazonaws.com/web/assets/map_pin_red-friends@2x.png"
  },
  pale: {
    def: "//vamos.s3.amazonaws.com/web/assets/map_pin_pale@2x.png",
    heart: "//vamos.s3.amazonaws.com/web/assets/map_pin_pale_heart@2x.png",
    friends: "//vamos.s3.amazonaws.com/web/assets/map_pin_pale-friends@2x.png"
  }
}).constant("categories", [{
  id: "1",
  name: "Arts & Culture",
  slug: "arts_culture",
  icon: "icon-arts-culture"
}, {
  id: "2",
  name: "Food & Drink",
  slug: "food_drink",
  icon: "icon-food-drinks"
}, {
  id: "3",
  name: "Nightlife",
  slug: "nightlife",
  icon: "icon-nightlife"
}, {
  id: "4",
  name: "Sport",
  slug: "sport",
  icon: "icon-sport"
}, {
  id: "5",
  name: "Music",
  slug: "music",
  icon: "icon-music"
}, {
  id: "6",
  name: "Networking",
  slug: "networking",
  icon: "icon-networking"
}, {
  id: "8",
  name: "Family",
  slug: "family",
  icon: "icon-family"
}, {
  id: "9",
  name: "Fashion",
  slug: "fashion",
  icon: "icon-fashion"
}]).constant("ENV", {
  ver: "0.4.1",
  name: "production",
  html5Mode: !0,
  localStorageEnabled: !0,
  rootPath: "http://www.getvamos.com",
  apiEndpoint: "https://api.getvamos.com",
  vamosConsumerKey: "7GKdQCkhAJgIfJRav73guOucWkaAZas3EmIxYdZ7",
  facebookAppId: "333846903320181",
  googleApiKey: "AIzaSyAzXpvaV5ZemjuV3KDUpCEgVk1sFPr2sQk",
  bingMapsApiKey: "ApaZmvi-aGDj5Xs9QqBFTqkoqquvExbnaO1Nr_n0Wk3ntee9eu_y140GYHm4VH2j",
  instagramClientId: "8280f17c863d4d0bb3e45a1eb266dd45"
}),

angular.module("vamosApp", ["config", "ipCookie", "ngSanitize", "ngAnimate", "ui.router", "ui.router.stateHelper", "pascalprecht.translate", "facebook"]).config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "$translateProvider", "$facebookProvider", "ENV",
  function(a, b, c, d, e, f) {
    b.otherwise("/"), a.state("support", {
      url: "/support",
      views: {
        "yield": {
          templateUrl: "/views/support.html"
        }
      },
      onEnter: ["$rootScope",
        function(a) {
          a.activeView = "static", a.title = "Support | "
        }
      ],
      data: {
        headerColor: "red",
        backButton: {
          gaCategory: "view:support"
        }
      }
    }).state("the-team", {
      url: "/the-team",
      views: {
        "yield": {
          templateUrl: "/views/theteam.html"
        }
      },
      onEnter: ["$rootScope",
        function(a) {
          a.activeView = "static", a.title = "The Team | "
        }
      ],
      data: {
        headerColor: "red",
        backButton: {
          gaCategory: "view:the team"
        }
      }
    }).state("terms", {
      url: "/terms",
      views: {
        "yield": {
          templateUrl: "/views/terms.html"
        }
      },
      onEnter: ["$rootScope",
        function(a) {
          a.activeView = "static", a.title = "Terms | "
        }
      ],
      data: {
        headerColor: "red",
        backButton: {
          gaCategory: "view:terms"
        }
      }
    }).state("imprint", {
      url: "/imprint",
      views: {
        "yield": {
          templateUrl: "/views/imprint.html"
        }
      },
      onEnter: ["$rootScope",
        function(a) {
          a.activeView = "static", a.title = "Imprint | "
        }
      ],
      data: {
        headerColor: "red",
        backButton: {
          gaCategory: "view:imprint"
        }
      }
    }).state("unsubscribe", {
      url: "/unsubscribe",
      views: {
        "yield": {
          controller: "UnsubscribectrlCtrl",
          templateUrl: "/views/unsubscribe.html"
        }
      },
      onEnter: ["$rootScope",
        function(a) {
          a.activeView = "static", a.title = "Unsubscribe | "
        }
      ],
      data: {
        headerColor: "red",
        backButton: {
          gaCategory: "view:unsubscribe"
        }
      }
    }).state("unsubscribe.params", {
      url: "/"
    }).state("me", {
      "abstract": !0,
      url: "",
      data: {
        headerColor: "red",
        rule: function(a) {
          return a.isLoggedIn()
        }
      },
      views: {
        "yield": {
          controller: "UserCtrl",
          templateUrl: "/views/user.html"
        }
      },
      onEnter: ["$rootScope", "$state",
        function(a) {
          a.activeView = "userProfile"
        }
      ]
    }).state("me.events", {
      parent: "me",
      url: "/me",
      views: {
        useryield: {
          controller: "UserEventsCtrl",
          templateUrl: "/views/userevents.html"
        }
      },
      onEnter: ["$rootScope",
        function(a) {
          a.navColor = "red", a.activeView = "user"
        }
      ],
      data: {
        headerColor: "red",
        backButton: {
          gaCategory: "view:profile events"
        }
      }
    }).state("me.venues", {
      parent: "me",
      url: "/me/venues",
      views: {
        useryield: {
          controller: "UserVenuesCtrl",
          templateUrl: "/views/uservenues.html"
        }
      },
      onEnter: ["$rootScope",
        function(a) {
          a.navColor = "red", a.activeView = "user"
        }
      ],
      data: {
        headerColor: "red",
        backButton: {
          gaCategory: "view:profile venues"
        }
      }
    }).state("me.logout", {
      parent: "me",
      data: {
        headerColor: "red",
        logout: function(a) {
          a.logout()
        }
      },
      url: "/me/logout"
    }).state("campaign", {
      url: "/featured/:parameterized_name/:id",
      views: {
        "yield": {
          controller: "MainCtrl",
          templateUrl: "/views/main.html"
        }
      },
      onEnter: ["$rootScope",
        function(a) {
          a.navColor = "red", a.activeView = "campaignView"
        }
      ],
      data: {
        headerColor: "red",
        backButton: {
          gaCategory: "view:campaign"
        }
      }
    }).state("campaign.map", {
      url: "/:view",
      data: {
        headerColor: "red",
        backButton: {
          gaCategory: "view:campaign map"
        }
      }
    }).state("events", {
      url: "/events/:parameterized_name/:id",
      views: {
        "yield": {
          controller: "EventCtrl",
          templateUrl: "/views/event.html"
        }
      },
      onEnter: ["$rootScope",
        function(a) {
          a.navColor = "gray", a.activeView = "eventView"
        }
      ],
      onExit: ["$rootScope",
        function(a) {
          a.backButtonText = ""
        }
      ],
      data: {
        headerColor: "gray",
        backButton: {
          gaCategory: "view:event overview",
          gaAction: "back button",
          gaLabel: null,
          text: null
        }
      }
    }).state("venues", {
      "abstract": !0,
      url: "",
      views: {
        "yield": {
          controller: "VenueCtrl",
          templateUrl: "/views/venue.html"
        }
      },
      onEnter: ["$rootScope", "$state",
        function(a) {
          a.navColor = "gray", a.activeView = "venueView"
        }
      ]
    }).state("venues.events", {
      parent: "venues",
      url: "/venues/:parameterized_name/:id",
      views: {
        venueyield: {
          controller: "VenueEventsCtrl",
          templateUrl: "/views/venueevents.html"
        }
      },
      data: {
        headerColor: "gray",
        backButton: {
          gaCategory: "view:venue events"
        }
      }
    }).state("venues.info", {
      parent: "venues",
      url: "/venues/:parameterized_name/:id/info",
      views: {
        venueyield: {
          controller: "VenueInfoCtrl",
          templateUrl: "/views/venueinfo.html"
        }
      },
      data: {
        headerColor: "gray",
        backButton: {
          gaCategory: "view:venue info"
        }
      }
    }).state("main", {
      url: "/",
      views: {
        "yield": {
          controller: "MainCtrl",
          templateUrl: "/views/main.html"
        }
      },
      onEnter: ["$rootScope",
        function(a) {
          a.activeView = "", a.title = "", a.navColor = "red"
        }
      ],
      onExit: ["$rootScope",
        function(a) {
          a.mainScrollTop = document.body.scrollTop || document.documentElement.scrollTop
        }
      ],
      data: {
        headerColor: "red",
        backButton: {
          gaCategory: "view:homepage",
          gaAction: null,
          gaLabel: null,
          text: "Home"
        }
      }
    }).state("main.login", {
      url: "login",
      onEnter: ["$rootScope", "$state", "Modal",
        function(a, b, c) {
          a.modal = new c({
            controller: "LoginCtrl",
            className: "loginModal",
            templateUrl: "/views/loginmodal.html",
            cancel: {
              fn: function() {
                b.go("main")
              }
            }
          })
        }
      ],
      onExit: ["$rootScope",
        function(a) {
          a.modal.closeFn()
        }
      ],
      data: {
        headerColor: "red",
        backButton: {
          gaCategory: "view:login"
        }
      }
    }).state("main.login.mode", {
      url: "/:mode",
      data: {
        headerColor: "red",
        backButton: {
          gaCategory: "view:login"
        }
      }
    }).state("main.login.mode.step", {
      url: "/:step",
      data: {
        headerColor: "red",
        backButton: {
          gaCategory: "view:login"
        }
      }
    }).state("main.map", {
      url: "map",
      data: {
        headerColor: "red",
        backButton: {
          gaCategory: "view:map"
        }
      }
    }).state("main.parameter", {
      url: ":parameter",
      data: {
        headerColor: "red",
        backButton: {
          gaCategory: "view:map"
        }
      }
    }).state("main.parameter.map", {
      url: "/map",
      data: {
        headerColor: "red",
        backButton: {
          gaCategory: "view:map"
        }
      }
    }), e.init({
      appId: f.facebookAppId,
      status: !0,
      xfbml: !0,
      version: "v1.0"
    }), d.useUrlLoader("/locales/en/translation.json"), d.preferredLanguage("en"), f.html5Mode && window.history && window.history.pushState ? c.html5Mode(!0) : c.html5Mode(!1).hashPrefix("!")
  }
]).run(["$rootScope", "$state", "$http", "$window", "$log", "ENV", "User",
  function(a, b, c, d, e, f, g) {
    "production" !== f.name ? ga("create", "UA-XXXXXXXX-X") : ga("create", "UA-30124007-1"), a.user = new g, a.busyPromises = [], a.stateStack = [], a.device = {
      mobile: isMobile(),
      os: isIos() && "ios" || isAndroid() && "android" || isWindows() && "windows" || isMac() && "mac" || isLinux() && "linux" || isWindowsPhone() && "windows phone" || "desktop",
      retina: window.devicePixelRatio > 1,
      standalone: "standalone" in window.navigator && window.navigator.standalone,
      supports: {
        gradients: Modernizr.lineargradient,
        filters: Modernizr.cssfilters,
        animations: Modernizr.cssanimations
      }
    }, a.device.info = a.device.os + " " + (a.device.mobile ? "mobile" : "desktop"), a.$on("$stateChangeStart", function(c, d) {
      if (d.data && d.data.logout) return c.preventDefault(), void d.data.logout(a.user);
      if (d.data && angular.isFunction(d.data.rule)) {
        var e = d.data.rule(a.user);
        e || (c.preventDefault(), b.go("main.login"))
      }
    }), a.$on("$stateChangeSuccess", function(b, c, d, e, g) {
      var h, i = c.url,
        j = e.url;
      for (h in d) i = i.replace(":" + h, d[h]);
      for (h in g) j = j.replace(":" + h, g[h]);
      if (c.name.indexOf("main") > -1) a.stateStack = [];
      else {
        var k = a.stateStack,
          l = k.length,
          m = l > 0 ? k[l - 1].fromState : !1,
          n = l > 0 ? k[l - 1].toState : !1,
          o = l > 1 ? k[l - 2].toState : !1;
        if (n && m && o && i === m.path && i === o.path && j === n.path) a.stateStack.splice(-1, 1);
        else {
          var p = {
            toState: {
              path: i,
              params: d,
              name: c.name
            },
            fromState: {
              path: j,
              params: g,
              name: e.name
            }
          };
          a.stateStack.push(p)
        }
      }
      "development" !== f.name && ga("send", "pageview", i)
    })
  }
]),

angular.module("vamosApp").controller("MainCtrl", ["$window", "$rootScope", "$scope", "$state", "$q", "$timeout", "pins", "ENV", "LocalStorage", "Modal", "Main",
  function(a, b, c, d, e, f, g, h, i, j, k) {
    c.dateSelected = function(a) {
      c.errorDisabled = !0, k.setTimespan(a).then(function() {
        k.setFirstCategoryName(null), c.$broadcast("timespan-changed")
      })
    }, c.goOneCategoryBack = function() {
      c.activeCategoryIndex = c.activeCategoryIndex > 0 ? c.activeCategoryIndex - 1 : c.categories.length - 1, c.$broadcast("active-category-changed"), ga("send", "event", "view:homepage", "change category back", b.device.info)
    }, c.goOneCategoryForward = function() {
      c.activeCategoryIndex = c.activeCategoryIndex > c.categories.length - 2 ? 0 : c.activeCategoryIndex + 1, c.$broadcast("active-category-changed"), ga("send", "event", "view:homepage", "change category forward", b.device.info)
    }, c.loadMore = function() {
      c.events && c.events.length > 0 && (c.events.length > c.numberOfEventsToShow ? k.incrementNumberOfEventsToShow().then(function(a) {
        c.numberOfEventsToShow = a
      }) : c.numberOfEventsToShow = c.events.length)
    }, c.onCategoriesRendered = function() {
      window.fitText(document.getElementsByClassName("categoryBig"), 1, {
        maxFontSize: 82
      })
    }, c.onEventsListRendered = function() {
      b.mainScrollTop && f(function() {
        window.scroll(0, b.mainScrollTop), b.mainScrollTop = null
      }, 200)
    }, c.searchCity = function() {
      if (c.noLocationError = !1, c.city_name && "" !== c.city_name) {
        var a = b.user.changeCity(c.city_name).then(function() {
          c.citySearchisFocused = !1, c.$broadcast("city-fetched"), ga("send", "event", "view:homepage", "search:city " + b.user.city.name, b.device.info)
        });
        b.busyPromises.push(a)
      }
    }, c.setActiveCategoryIndex = function(a) {
      c.activeCategoryIndex = k.set("activeCategoryIndex", a), c.$broadcast("active-category-changed"), ga("send", "event", "view:homepage", "category " + (c.categories[c.activeCategoryIndex].name || "All"), b.device.info)
    }, c.setSort = function(a) {
      var d = k.setActiveSort(a).then(function(a) {
        return c.sort = a, c.sort
      });
      return b.busyPromises.push(d), d
    }, c.selectThisWeekend = function() {
      var a = null,
        b = null;
      c.errorDisabled = !0, c.today.is().fri() || c.today.is().sat() ? (a = Date.today(), b = Date.today().sun().add(1).days().add(-1).seconds()) : c.today.is().sun() ? (a = Date.today(), b = Date.today().add(1).days().add(-1).seconds()) : (a = Date.today().fri(), b = Date.today().sun().add(1).days().add(-1).seconds()), k.setTimespan(a, b).then(function() {
        c.$broadcast("timespan-changed")
      })
    }, c.selectNextWeekend = function() {
      var a = null,
        b = null;
      c.errorDisabled = !0, a = Date.fri(), b = a.clone().add(3).days().add(-1).seconds(), k.setTimespan(a, b).then(function() {
        k.setFirstCategoryName("Next weekend"), c.$broadcast("timespan-changed")
      })
    }, c.showFullscreenDatepicker = function() {
      c.fullscreenDatepickerVisible = getWindowWidth() < 768, c.fullscreenDatepickerVisible && (b.hideBodyOverflow = !0, f(function() {
        document.getElementById("fullscreenDatepickerHolder").style.width = document.getElementsByTagName("body")[0].clientWidth + "px"
      }, 50))
    }, c.closeFullscreenDatepicker = function() {
      b.hideBodyOverflow = !1, c.fullscreenDatepickerVisible = !1
    };
    var l = function(a) {
        var b = new google.maps.MarkerImage(g.pale.def, new google.maps.Size(47, 72), new google.maps.Point(0, 0), new google.maps.Point(12, 36), new google.maps.Size(24, 36)),
          d = new google.maps.MarkerImage(g.red.def, new google.maps.Size(47, 72), new google.maps.Point(0, 0), new google.maps.Point(12, 36), new google.maps.Size(24, 36));
        google.maps.event.addListener(a, "click", function() {
          var e = this;
          c.map.panTo(a.getPosition()), c.activeMarker && c.activeMarker.setIcon(b), e.setIcon(d), k.getEvent(e.eventId).then(function(a) {
            c.activeEvent = k.set("activeEvent", a)
          }), c.activeMarker = e
        })
      },
      m = function(a) {
        a.setMap(c.map)
      },
      n = function() {
        var a = e.defer();
        return f(function() {
          if (c.markers) {
            for (var b = c.markers.length - 1; b >= 0; b--) c.markers[b].setMap(null);
            c.markers = null
          }
          a.resolve()
        }), a.promise
      },
      o = function() {
        var a = k.getFilterdEvents(c.events, c.categories[c.activeCategoryIndex]).then(function(a) {
          c.filteredEvents = a
        });
        return b.busyPromises.push(a), a
      },
      p = function() {
        for (var a = new google.maps.MarkerImage(g.pale.def, new google.maps.Size(47, 72), new google.maps.Point(0, 0), new google.maps.Point(12, 36), new google.maps.Size(24, 36)), b = new google.maps.MarkerImage(g.red.def, new google.maps.Size(47, 72), new google.maps.Point(0, 0), new google.maps.Point(12, 36), new google.maps.Size(24, 36)), d = c.markers.length - 1; d >= 0; d--)
          if (c.markers[d].setMap(null), c.activeEvent && c.activeEvent.id === c.markers[d].eventId ? (c.markers[d].setIcon(b), c.activeMarker = c.markers[d]) : c.markers[d].setIcon(a), c.filteredEvents[c.filteredEvents.length - 1 - d] && c.markers[d].eventId === c.filteredEvents[c.filteredEvents.length - 1 - d].id) m(c.markers[d]);
          else
            for (var e = c.filteredEvents.length - 1; e >= 0; e--)
              if (c.markers[d].eventId === c.filteredEvents[e].id) {
                m(c.markers[d]);
                break
              }
      },
      q = function() {
        o().then(function() {
          "map" === k.view && z()
        })
      },
      r = function() {
        C().then(B).then(D)
      },
      s = function() {
        c.filteredEvents = c.events, c.viewMode = c.viewMode || k.setView(d.current.url), c.events.length > 0 ? (w(), x(), "map" === k.view && n().then(y)) : (c.errorDisabled = !1, document.getElementsByClassName("categoryBig").length > 0 && window.fitText(document.getElementsByClassName("categoryBig"), 1, {
          maxFontSize: 82
        }))
      },
      t = function(a, b) {
        c.viewMode = k.setView(d.params.view || b.url), "map" === k.view && n().then(y)
      },
      u = function() {
        window.scroll(0, 0), c.numberOfEventsToShow = k.resetNumberOfEventsToShow(), c.activeCategoryIndex = k.set("activeCategoryIndex", 0), c.startDate = k.startDate, c.startDay = c.startDate.clone().clearTime(), c.endDate = k.endDate, k.campaignId = null, D()
      },
      v = function() {
        var a = e.defer();
        return c.markers = [], f(function() {
          if (c.map) {
            for (var b = c.events, d = b.length - 1; d >= 0; d--) {
              var e = b[d].latitude || b[d].venue && b[d].venue.latitude,
                f = b[d].longitude || b[d].venue && b[d].venue.longitude;
              if (e && f) {
                var g = new google.maps.Marker({
                  position: new google.maps.LatLng(e, f),
                  draggable: !1,
                  title: c.events[d].name,
                  map: null
                });
                g.eventId = b[d].id, l(g), c.markers.push(g)
              }
            }
            return a.resolve(c.markers), c.markers
          }
          return a.resolve(null), null
        }), b.busyPromises.push(a.promise), a.promise
      },
      w = function() {
        f(function() {
          k.setEventsFacebookFriends(k.startDate, k.endDate)
        })
      },
      x = function() {
        f(function() {
          k.setJoinedEvents(k.startDate, k.endDate)
        })
      },
      y = function() {
        if (window.mapsSdkReady) c.map = c.map || new google.maps.Map(document.getElementById("map"), {
          zoom: 11
        }), G(), f(function() {
          google.maps.event.trigger(c.map, "resize"), c.map.setZoom(c.map.getZoom()), C().then(function(a) {
            F(a.latitude, a.longitude)
          }), z()
        });
        else {
          var a = e.defer();
          window.loadMapsSdk();
          var d = window.setInterval(function() {
            window.mapsSdkReady && (clearInterval(d), d = null, a.resolve(), y())
          }, 200);
          b.busyPromises.push(a.promise)
        }
      },
      z = function() {
        c.events && c.events.length > 0 && (c.markers && 0 !== c.markers.length ? p() : v().then(z))
      },
      A = function(a, c) {
        var d = k.getCampaign(a, c).then(function(a) {
          return b.campaign = a, a
        });
        return b.busyPromises.push(d), d
      },
      B = function() {
        var a = k.getCampaigns().then(function(a) {
          return c.campaigns = a, a
        });
        return b.busyPromises.push(a), a
      },
      C = function(a) {
        var d = b.user.getCity(a).then(function(a) {
          return c.city_name = a.name, a
        });
        return b.busyPromises.push(d), d
      },
      D = function() {
        k.campaignId = null, b.campaign = null, k.campaignId = 1 === d.current.url.indexOf("featured") ? Number(d.params.id) : null, k.campaignId && A(k.campaignId, !1);
        var a = k.getEvents().then(function(a) {
          return c.categories[0] = k.firstCategory, c.categories.length > 1 && c.categories.splice(1, c.categories.length), c.categories = c.categories.concat(a.categories), c.events = a.events, a.timeframe && a.timeframe.end && (c.endDate = new Date(a.timeframe.end), k.endDate = c.endDate), c.activeEvent = k.activeEvent || k.set("activeEvent", null), c.$broadcast("events-changed"), c.activeCategoryIndex = k.activeCategoryIndex || k.set("activeCategoryIndex", 0), c.$broadcast("active-category-changed"), a
        });
        return b.busyPromises.push(a), a
      },
      E = function() {
        var a = b.user.getLocation().then(function(a) {
          return a
        });
        return b.busyPromises.push(a), a
      },
      F = function(a, b) {
        c.map.panTo(new google.maps.LatLng(a, b))
      },
      G = function() {
        "map" === k.view && (document.getElementById("map").style.height = getWindowWidth() > 767 ? getWindowHeight() - document.getElementsByClassName("categories")[0].offsetHeight + 8 + "px" : getWindowHeight() - document.getElementsByTagName("header")[0].offsetHeight + "px")
      },
      H = function() {
        f(function() {
          var a = document.createAttribute("autofocus");
          document.getElementById("cityNameSearchField").setAttributeNode(a), document.getElementById("cityNameSearchField").focus(), c.citySearchisFocused = !0
        })
      },
      I = function() {
        b.user.city && b.user.city.name && (c.city_name = b.user.city.name, B().then(function() {
          D().then(function(a) {
            (!a.events || a.events.length < 1) && (c.viewMode = "list", H())
          })
        }))
      },
      J = function() {
        E().then(function(a) {
          a ? C(a).then(I) : new j({
            controller: "LocationNotFoundmodalCtrl",
            className: "locationNotFoundModal",
            templateUrl: "/views/locationnotfoundmodal.html",
            cancel: {
              fn: function() {
                I()
              }
            }
          })
        })
      };
    b.$on("$stateChangeSuccess", t), c.$on("active-category-changed", q), c.$on("events-changed", s), c.$on("city-fetched", r), c.$on("timespan-changed", u), c.$on("user-scrolled-to-bottom", c.loadMore), c.$on("facebook-login", function() {
      w(), x()
    });
    var K;
    window.onresize = function() {
      K && clearTimeout(K), K = setTimeout(function() {
        c.fullscreenDatepickerVisible && (document.getElementById("fullscreenDatepickerHolder").style.width = document.getElementById("fullscreenDatepicker").clientWidth + "px"), "map" === k.view && G()
      }, 250)
    };
    var L = function() {
      if (Modernizr.localstorage) {
        var a = i.load("ver");
        a && a === h.ver || localStorage.clear(), i.save("ver", h.ver, 525600)
      }
      if (c.fullscreenDatepickerVisible = !1, c.showDownloadOnAppStore = !isMobile() || isIos(), c.today = Date.today(), c.numberOfEventsToShow = k.numberOfEventsToShow, c.availableSortMethods = k.availableSortMethods, k.sort ? c.sort = k.sort : c.setSort(), c.startDate = k.startDate, c.startDay = c.startDate.clone().clearTime(), c.endDate = k.endDate, c.datepicker = k.getDatepicker(), c.categories = [], d.params && d.params.parameter) {
        var e = d.params.parameter,
          f = i.load("city") || null;
        f && f.latitude && f.longitude && f.parameterized_name === e.parameterize() ? (b.user.latitude = f.latitude, b.user.longitude = f.longitude, b.user.city = f, I()) : b.user.changeCity(e, {
          supressAlert: !0
        }).then(function(a) {
          a ? I() : (d.go("main"), J())
        })
      } else J()
    };
    L()
  }
]),

angular.module("vamosApp").controller("EventCtrl", ["$window", "$rootScope", "$scope", "$state", "$q", "$timeout", "$filter", "$sce", "EventsManager", "Instagram", "$facebook", "pins", "ENV", "$http", "$log",
  function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    var p = c.$parent;
    window.scroll(0, 0), c.event = null, c.soundcloudItems = [], c.galleryOpened = !1, c.activeMediaItem = 0;
    var q = function(a) {
        return i.getEvent(a).then(function(a) {
          if (a) {
            var d = a.venue ? a.venue.city : null;
            b.stateStack[0].fromState && "" === b.stateStack[0].fromState.name && (d ? (b.stateStack[0].fromState.name = "main.parameter", b.stateStack[0].fromState.params = {
              parameter: d.toLowerCase()
            }) : b.stateStack[0].fromState.name = "main"), b.backButtonText = d, a.getColors().then(function(d) {
              a.dateString = a.startDate.today() ? "Today, " + g("date")(a.startDate, "h:mm a") : Date.today().add(1).days().getTime() === a.startDate.clone().clearTime().getTime() ? "Tomorrow, " + g("date")(a.startDate, "h:mm a") : a.startDate.isBefore(Date.today()) ? g("date")(a.startDate, "EEEE, d. MMM yyyy h:mm a") : g("date")(a.startDate, "EEEE, h:mm a"), a.endDate && (a.dateString += " - " + g("date")(a.endDate, "h:mm a")), c.color = "CB_" + d[0].slice(1), c.topWrapperClass = c.color, c.event = a, c.eventLoaded = !0, a.description && (c.descriptionOpened = a.description.length < 600, c.event.htmlDescription = h.trustAsHtml(a.description.simpleFormat())), s(a.picture_url), c.showImage = !0, b.title = a.name + " | ", window.fitText(document.getElementById("eventTitle"), 1.4, {
                maxFontSize: 36
              }), t(), x(), (!c.event.mediaItems || c.event.mediaItems.length < 1) && w(), c.event.getEventLocation()
            })
          } else c.event_not_found = !0;
          return a
        })
      },
      r = function(a) {
        return a = a || "/images/placeholder_event_image.jpg", document.getElementById("backgroundImage").style.backgroundImage = "url(" + a + ")", c.showBgImage = !0, a
      },
      s = function(a) {
        var d = e.defer(),
          g = d.promise;
        return f(function() {
          var b = new Image;
          b.onload = function() {
            if ("naturalHeight" in this) {
              if (this.naturalHeight + this.naturalWidth === 0) return void r()
            } else if (this.width + this.height === 0) return void r();
            if (Modernizr.cssfilters) document.getElementById("backgroundImage").style.backgroundImage = "url(" + a + ")", c.filtersSupported = !0;
            else if ("ticketmaster" === c.event.provider_name || isIE()) r(a);
            else {
              var e = createBlurredImageWithSVG(b);
              "ok" === e.status && e.uri ? document.getElementById("backgroundImage").style.backgroundImage = "url(" + e.uri + ")" : (o.error(e.error), r(a))
            }
            c.showBgImage = !0, d.resolve()
          }, b.onerror = function() {
            r(), d.resolve()
          }, Modernizr.cssfilters || (b.crossOrigin = m.rootPath), b.src = a
        }), b.busyPromises.push(g), g
      },
      t = function() {
        f(function() {
          return !c.event.joined && c.event.fid && "facebook" === c.event.provider_name && b.user.eventJoined(c.event).then(function(a) {
            return c.event.joined = a || null, a
          }), event
        })
      },
      u = function(a) {
        f(function() {
          var b = "http://vimeo.com/api/v2/video/" + a + ".json";
          n.get(b).success(function(b) {
            var d = b[0],
              e = {
                mediaType: "video",
                dateCreated: new Date(d.upload_date),
                time: new Date(d.upload_date).getTime(),
                thumb: d.thumbnail_medium,
                iframe: h.trustAsHtml('<iframe src="//player.vimeo.com/video/' + a + '?api=1" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'),
                provider: "vimeo",
                user: {
                  profile_picture: d.user_portrait_small,
                  full_name: d.user_name
                },
                loaded: !1
              };
            c.event.mediaItems.push(e)
          })
        })
      },
      v = function(a) {
        var b = {
          mediaType: "image",
          dateCreated: new Date(a.created_time),
          time: new Date(a.created_time).getTime(),
          thumb: a.images.low_resolution.url,
          large: a.images.standard_resolution.url,
          provider: "instagram",
          user: a.user,
          loaded: !1
        };
        c.event.mediaItems.push(b)
      },
      w = function() {
        c.addedItems = {
          instagram: {},
          youtube: {},
          vimeo: {}
        }, c.event.mediaItems = [];
        var a = c.event.description;
        if (a) {
          var b = a.match(/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/gim);
          if (b)
            for (var d = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/, e = /(?:<iframe [^>]*src=")?(?:https?:\/\/(?:[\w]+\.)*vimeo\.com(?:[\/\w:]*(?:\/videos)?)?\/([0-9]+)[^\s]*)"?(?:[^>]*><\/iframe>)?(?:<p>.*<\/p>)?/, f = "", g = 0; g < b.length; g++) {
              f = b[g];
              var i = f.match(d);
              i && 11 === i[2].length && c.event.mediaItems.push({
                mediaType: "video",
                thumb: "//img.youtube.com/vi/" + i[2] + "/0.jpg",
                iframe: h.trustAsHtml('<iframe width="100%" height="100%" src="//www.youtube.com/embed/' + i[2] + '?rel=0&enablejsapi=1" frameborder="0" allowfullscreen></iframe>'),
                provider: "youtube"
              });
              var k = f.match(e);
              k && !c.addedItems.vimeo[k[1]] && (u(k[1]), c.addedItems.vimeo[k[1]] = !0)
            }
        }
        if (c.event.hashtags && "" !== c.event.hashtags) {
          var l = c.event.hashtags.split(",")[0].trim();
          j.getInstagramHashtagImages(l).then(function(a) {
            a.data && a.data.forEach(function(a) {
              c.addedItems.instagram[a.id] || "image" !== a.type || (v(a), c.addedItems.instagram[a.id] = !0)
            })
          })
        }
        c.event.instagram_id && "" !== c.event.instagram_id && j.getInstagramLocationImages(c.event.instagram_id).then(function(a) {
          a.data && a.data.forEach(function(a) {
            c.addedItems.instagram[a.id] || "image" !== a.type || (v(a), c.addedItems.instagram[a.id] = !0)
          })
        })
      },
      x = function() {
        return !c.event.facebookFriends && "facebook" === c.event.provider_name && c.event.fid && b.user.friendsAttending(c.event.fid).then(function(a) {
          c.event.facebookFriends = a || null
        }), c.event
      },
      y = function() {
        p.popupGoogleMap = p.popupGoogleMap || new google.maps.Map(document.getElementById("popupGoogleMap"), {
          zoom: 14
        }), p.popupGoogleMap.event = c.event;
        var a = new google.maps.LatLng(c.event.latitude, c.event.longitude);
        return p.popupGoogleMap.eventMarker = p.popupGoogleMap.eventMarker || new google.maps.Marker({
          map: p.popupGoogleMap,
          draggable: !1,
          title: c.event.name,
          icon: new google.maps.MarkerImage(l.red.def, new google.maps.Size(47, 72), new google.maps.Point(0, 0), new google.maps.Point(12, 36), new google.maps.Size(24, 36))
        }), p.popupGoogleMap.eventMarker.setPosition(a), c.googleMapInitialized = !0, setTimeout(function() {
          google.maps.event.trigger(p.popupGoogleMap, "resize"), p.popupGoogleMap.setZoom(p.popupGoogleMap.getZoom()), p.popupGoogleMap.panTo(a)
        }, 500), !0
      };
    c.toggleInterested = function() {
      if (b.user.isLoggedIn()) {
        var a = c.event.is_favorite;
        c.event.is_favorite = !c.event.is_favorite, f(function() {
          b.user.interested(c.event, c.event.is_favorite).then(function(d) {
            "fail" === d.status ? (alert(d.error), c.event.is_favorite = a) : ga("send", "event", "view:event overview", (c.event.is_favorite ? "star" : "unstar") + " event " + c.event.provider_name.toUpperCase() + "/" + c.event.fid, b.device.info)
          })
        })
      } else d.go("main.login")
    }, c.toggleFacebookJoin = function() {
      if (b.user.isLoggedIn()) {
        var a = c.event.joined;
        c.event.joined = !c.event.joined, f(function() {
          b.user.joinEventOnFacebook(c.event, c.event.joined).then(function(d) {
            "fail" === d.status ? (alert(d.error.error.message), c.event.joined = a) : ga("send", "event", "view:event overview", (c.event.joined ? "join" : "decline") + " event FACEBOOK/" + c.event.fid, b.device.info)
          })
        })
      } else d.go("main.login")
    }, c.openGoogleMap = function() {
      if (window.mapsSdkReady) p.popupGoogleMapOpened = c.googleMapInitialized || y(), ga("send", "event", "view:event overview", "toggle view:event map", b.device.info);
      else {
        var a = e.defer();
        window.loadMapsSdk();
        var d = window.setInterval(function() {
          window.mapsSdkReady && (clearInterval(d), d = null, a.resolve(), c.openGoogleMap())
        }, 200);
        b.busyPromises.push(a.promise)
      }
    }, c.openGallery = function(a) {
      c.galleryOpened = !0, c.activeMediaItem = a, ga("send", "event", "view:event overview", "toggle view:gallery", b.device.info), ga("send", "event", "view:event overview", "view:gallery item", b.device.info)
    }, c.closeGallery = function() {
      c.galleryOpened = !1;
      for (var a = document.getElementsByClassName("youtube"), b = a.length - 1; b >= 0; b--) a[b].getElementsByTagName("iframe")[0].contentWindow.postMessage('{ "event" : "command", "func" : "pauseVideo", "args" : "" }', "*");
      for (a = document.getElementsByClassName("vimeo"), b = a.length - 1; b >= 0; b--) a[b].getElementsByTagName("iframe")[0].contentWindow.postMessage('{ "method" : "pause", "value" : "" }', "*")
    }, c.galleryBack = function() {
      c.activeMediaItem > 0 ? c.activeMediaItem-- : c.activeMediaItem = c.event.mediaItems.length - 1, ga("send", "event", "view:event overview", "view:gallery item", b.device.info)
    }, c.galleryForward = function() {
      c.activeMediaItem < c.event.mediaItems.length - 1 ? c.activeMediaItem++ : c.activeMediaItem = 0, ga("send", "event", "view:event overview", "view:gallery item", b.device.info)
    }, q(d.params.id)
  }
]),

angular.module("vamosApp").controller("UnsubscribectrlCtrl", ["$timeout", "$scope", "Api",
  function(a, b, c) {
    b.unsubscribe = function(d) {
      c.unsubscribe({
        user_id: getURLParameter("user_id"),
        email_hex: getURLParameter("email_hex"),
        type: d
      }).then(function(c) {
        "success" === c.status ? (b.showUnsubscribeResponse = !0, b.response = "You were successfully unsubscribed.", a(function() {
          b.showUnsubscribeResponse = !1
        }, 2e3)) : b.response = "Whoops something went wrong... Please sent us an email to info@getvamos.com, and we will unsubscribe you."
      })
    }
  }
]),

angular.module("vamosApp").controller("LoginCtrl", ["$rootScope", "$scope", "$window", "$state", "$timeout", "aws",
  function(a, b, c, d, e, f) {
    b.goToSignIn = function() {
      d.go("main.login.mode.step", {
        mode: "sign-in",
        step: "1"
      })
    }, b.goToSignUp = function() {
      d.go("main.login.mode.step", {
        mode: "sign-up",
        step: "1"
      })
    }, b.goBack = function() {
      c.history.back()
    }, b.uploadBlob = function(a, b, c) {
      e(function() {
        f.uploadFile(a, b, c)
      })
    };
    var g = function(b) {
      "ok" === b.status && (ga("send", "event", "view:signup", "upload profile image", a.device.info), a.user.picture_url = b.url, a.user.update("picture_url"))
    };
    b.submitSignIn = function(b) {
      if (b.$valid) a.user.login().then(function(a) {
        "ok" !== a.status ? alert(a.error) : d.go("main")
      });
      else {
        if (!b.user_email.$valid) return alert("Please enter a valid email.");
        if (!b.user_pwd.$valid) return alert("Please enter a valid password (at least 8 characters long).")
      }
    }, b.submitSignUp = function(b) {
      if (b.$valid) {
        var c = a.user.full_name.split(" ");
        a.user.last_name = c.splice(c.length - 1, 1)[0], a.user.first_name = c.join(" "), d.go("main.login.mode.step", {
          mode: "sign-up",
          step: 2
        })
      } else {
        if (!b.user_email.$valid) return alert("Please enter a valid email.");
        if (!b.user_pwd.$valid) return alert("Password must be at least 8 characters long.");
        if (!b.full_name.$valid) return alert("Please enter your full name.")
      }
    }, b.completeSignupFormSubmit = function(b) {
      if (b.$valid) a.user.signup().then(function(b) {
        if ("OK" === b.status) k(), ga("send", "event", "view:signup", "submit signup form", a.device.info), d.go("main");
        else switch (b.error.type) {
          case "email_used":
            alert("Sorry, this email has already been used.");
            break;
          default:
            alert(b.error.type)
        }
      });
      else {
        if (!b.user_email.$valid) return alert("Please enter a valid email.");
        if (!b.first_name.$valid) return alert("Please enter your first name.");
        if (!b.last_name.$valid) return alert("Please enter your last name.")
      }
    }, b.profilePictureSelected = function() {
      e(function() {
        var a = document.getElementById("filePicker").files[0];
        if (a)
          if (a.type.match(/image.*/)) {
            var b = new FileReader;
            b.onload = function(b) {
              o(b.target.result, a.name)
            }, b.readAsDataURL(a)
          } else alert("Sorry, only images are supported.")
      })
    };
    var h = function() {
        var a = b.forms && b.forms.signUpForm || !1;
        return a && a.user_email.$valid && a.user_pwd.$valid && a.full_name.$valid
      },
      i = function() {
        d.params && (b.mode = d.params.mode ? d.params.mode : b.defaults.mode, b.step = d.params.step ? Number(d.params.step) : b.defaults.step), "sign-up" === b.mode && b.step > 1 && (h() || d.go("main.login.mode.step", {
          mode: "sign-up",
          step: 1
        }))
      },
      j = function() {
        d.go("main")
      },
      k = function() {
        for (var c = document.getElementsByClassName("imageCanvas"), d = c.length - 1; d >= 0; d--)
          if (c[d].width && c[d].height) {
            var e = dataURItoBlob(c[d].toDataURL("image/png"), "image/png"),
              f = "true" === c[d].getAttribute("data-retina"),
              h = f ? c[d].width / 2 + "x" + c[d].height / 2 : c[d].width + "x" + c[d].height,
              i = 0 === d ? g : null;
            b.uploadBlob(e, {
              type: "user_profile_image",
              size: h + (f ? "@2x" : ""),
              retina: f,
              user_id: a.user.id,
              s3_object_type: "image/png"
            }, i)
          }
      },
      l = function() {
        b.forms = {}, b.defaults = {
          mode: "sign-in",
          step: 0
        }, b.genders = ["Female", "Male"]
      },
      m = function(a, b, c) {
        var d = 1,
          e = b.w,
          f = b.h,
          g = !0;
        a.height < a.width ? (d = f / a.height, e = a.width * d) : (d = e / a.width, f = a.height * d), c ? (c.className = "canvas imageCanvas", g = !1) : (c = document.createElement("canvas"), c.className = "imageCanvas hidden", c.width = e, c.height = f);
        var h = document.createAttribute("data-retina");
        h.value = !1, c.setAttributeNode(h);
        var i = c.getContext("2d");
        i.clearRect(0, 0, c.width, c.height), c.width = b.w, c.height = b.h, i.drawImage(a, 0, 0, a.width, a.height, (b.w - e) / 2, (b.h - f) / 2, e, f), g && document.getElementById("canvasHolder").appendChild(c);
        var j = null;
        if (b.retina) {
          d = 1;
          var k = 2 * b.w,
            l = 2 * b.h;
          a.height < a.width ? (d = l / a.height, k = a.width * d) : (d = k / a.width, l = a.height * d), j = document.createElement("canvas"), j.className = "imageCanvas hidden", j.width = 2 * e, j.height = 2 * f;
          var m = document.createAttribute("data-retina");
          m.value = !0, j.setAttributeNode(m);
          var n = j.getContext("2d");
          n.clearRect(0, 0, j.width, j.height), j.width = 2 * b.w, j.height = 2 * b.h, n.drawImage(a, 0, 0, a.width, a.height, (2 * b.w - k) / 2, (2 * b.h - l) / 2, k, l), document.getElementById("canvasHolder").appendChild(j)
        }
      },
      n = [{
        w: 180,
        h: 180,
        retina: !0
      }],
      o = function(a) {
        var b = new Image;
        b.onload = function() {
          document.getElementById("canvasHolder").innerHTML = "", m(b, n[0], document.getElementById("profileImage120"));
          for (var a = 1; a < n.length; a++) m(b, n[a])
        }, b.src = a
      };
    a.$on("$stateChangeSuccess", i), b.$on("facebook-login", j), l()
  }
]),

angular.module("vamosApp").controller("UserCtrl", ["$rootScope", "$scope", "$state", "$timeout", "VenuesManager",
  function(a, b, c, d, e) {
    b.state = c, b.venuesSearch = function(a) {
      e.search(a).then(function(a) {
        if ("ok" === a.status) {
          b.suggestedVenues = b.suggestedVenues || [];
          for (var c = a.data || [], d = c.length - 1; d >= 0; d--) b.suggestedVenues.containsObject(c[d], "id") || b.suggestedVenues.push(c[d])
        } else alert("Something went wrong while searching for venues.")
      })
    };
    var f = function() {
      a.user.getVenues().then(function() {
        a.user.getLocation().then(function(c) {
          e.getSuggestedVenues(c, a.user).then(function(a) {
            b.suggestedVenues = a || []
          })
        })
      }), d(function() {
        window.fitText(document.getElementsByClassName("userProfileName"), .6, {
          maxFontSize: 70
        })
      }, 200)
    };
    f()
  }
]),

angular.module("vamosApp").controller("UserEventsCtrl", ["$scope",
  function(a) {
    var b = a.$parent;
    b.view = "events"
  }
]),

angular.module("vamosApp").controller("UserVenuesCtrl", ["$scope",
  function(a) {
    var b = a.$parent;
    b.view = "venues"
  }
]),

angular.module("vamosApp").controller("VenueCtrl", ["$rootScope", "$scope", "$state", "$timeout", "$facebook", "$log", "VenuesManager", "ENV",
  function(a, b, c, d, e, f, g, h) {
    window.scroll(0, 0), b.venue = null, b.toggleFollowVenue = function() {
      a.user.isLoggedIn() ? a.user.toggleFollowVenue(b.venue) : c.go("main.login")
    };
    var i = function(c) {
        var d = g.getVenue(c).then(function(a) {
          return b.venue = a, a
        });
        return a.busyPromises.push(d), d
      },
      j = function(c) {
        var d = c.getEvents().then(function(a) {
          return b.events = a, a
        });
        return a.busyPromises.push(d), d
      },
      k = function(a) {
        var b = a.venue_profile && a.venue_profile.cover_photo || null;
        !b && a.fid ? d(function() {
          e.api("/" + a.fid, function(c) {
            !c.error && c.cover && c.cover.source ? (b = c.cover.source, a.venue_profile = a.venue_profile || {}, a.venue_profile.cover_photo = b, l(b)) : l(null)
          })
        }) : l(b)
      },
      l = function(a) {
        if (a) {
          var c = new Image;
          c.onload = function() {
            if ("naturalHeight" in this) {
              if (this.naturalHeight + this.naturalWidth === 0) return
            } else if (this.width + this.height === 0) return;
            if (Modernizr.cssfilters) document.getElementById("backgroundImage").style.backgroundImage = "url(" + a + ")", b.filtersSupported = !0;
            else if (isIE()) document.getElementById("backgroundImage").style.backgroundImage = "url(" + a + ")";
            else {
              var d = createBlurredImageWithSVG(c);
              "ok" === d.status && d.uri ? document.getElementById("backgroundImage").style.backgroundImage = "url(" + d.uri + ")" : (f.error(d.error), document.getElementById("backgroundImage").style.backgroundImage = "url(" + a + ")")
            }
            b.showBgImage = !0, b.$apply()
          }, c.onerror = function() {}, Modernizr.cssfilters || (c.crossOrigin = h.rootPath), c.src = a
        }
      },
      m = function() {
        a.user.getVenues(), i(c.params.id).then(function(a) {
          return k(a), j(a)
        }).then(function() {
          window.fitText(document.getElementById("venueTitle"), 1.4, {
            maxFontSize: 36
          })
        })
      };
    m()
  }
]),

angular.module("vamosApp").controller("VenueEventsCtrl", ["$scope",
  function(a) {
    a.$parent.view = "events"
  }
]),

angular.module("vamosApp").controller("VenueInfoCtrl", ["$scope",
  function(a) {
    a.$parent.view = "info"
  }
]),

angular.module("vamosApp").controller("CampaignsSliderCtrl", ["$scope",
  function(a) {
    a.activeCampaignIndex = 0;
    var b = 4,
      c = null,
      d = !1;
    a.$watch("$parent.campaigns", function() {
      if (c && e(), a.campaigns = a.$parent.campaigns, a.activeCampaignIndex = 0, a.campaigns && a.campaigns.length > 1) {
        for (var b = a.campaigns.length - 1; b >= 0; b--)(!a.campaigns[b].banners || !a.campaigns[b].banners.mediumRectangleBanner || a.campaigns[b].events.length < 1 && !a.campaigns[b].banners.mediumRectangleBanner.target_url) && a.campaigns.splice(b, 1);
        a.campaigns.length > 1 && f()
      } else c = null
    });
    var e = function() {
        clearTimeout(c), c = null
      },
      f = function() {
        c = setInterval(function() {
          d || (a.activeCampaignIndex === a.campaigns.length - 1 ? a.activeCampaignIndex = 0 : a.activeCampaignIndex++, a.$apply())
        }, 1e3 * b)
      };
    a.mouseOverCampaigns = function() {
      d = !0
    }, a.mouseOutCampaigns = function() {
      d = !1
    }, a.setActiveCampaign = function(b) {
      e(), a.activeCampaignIndex = b, f()
    }
  }
]),

angular.module("vamosApp").controller("HeaderCtrl", ["$rootScope", "$scope", "$state", "ipCookie",
  function(a, b, c, d) {
    if (b.dismissWhereFriendsAreGoing = function() {
      d("hideWhereFriendsAreGoingHeaderText", !0, {
        expires: 31
      }), b.hideWhereFriendsAreGoingHeaderText = !0
    }, b.hideWhereFriendsAreGoingHeaderText = d("hideWhereFriendsAreGoingHeaderText") || !1, !b.hideWhereFriendsAreGoingHeaderText) {
      var e = function(a) {
        b.hideWhereFriendsAreGoingHeaderText = a > 100 ? !0 : !1
      };
      a.onScrollFunctions = a.onScrollFunctions || [], a.onScrollFunctions.push(e)
    }
    b.backButton = null, b.backButtonClicked = function() {
      if (b.backButton) {
        GA(b.backButton);
        var d = a.stateStack,
          e = d[d.length - 1],
          f = e.fromState;
        c.go(f.name || "main", f.params)
      }
    }, a.$watch("stateStack.length", function(c) {
      var d = a.stateStack;
      if (c > 0) {
        var e = d[d.length - 1],
          f = e.fromState,
          g = e.toState,
          h = null,
          i = null,
          j = null,
          k = null;
        g.data && g.data.backButton && (h = g.data.backButton.gaCategory, i = g.data.backButton.gaAction, j = g.data.backButton.gaLabel), k = f && f.data && f.data.backButton && f.data.backButton.text || "", b.backButton = {
          gaCategory: h || "view:" + g.name,
          gaAction: i || "back button",
          gaLabel: j || a.device.info,
          text: k
        }
      } else b.backButton = null
    }), b.gray = !1, a.$on("$stateChangeSuccess", function(a, c) {
      b.gray = c.data && c.data.headerColor && "gray" === c.data.headerColor
    })
  }
]),

angular.module("vamosApp").factory("loading", ["$rootScope", "$timeout", "$q", "$log",
  function(a, b, c, d) {
    return function() {
      var e = {};
      e.promises = [], e.delayPromise = null, e.durationPromise = null, e.clearPromises = function() {
        a.busyPromises = [], this.promises = []
      }, e.reset = function(a) {
        e.minDuration = a.minDuration, e.promises = [], angular.forEach(a.promises, function(a) {
          a && !a.$cgBusyFulfilled && f(a)
        }), 0 !== e.promises.length && (a.delay && (e.delayPromise = b(function() {
          e.delayPromise = null
        }, a.delay)), a.minDuration && (e.durationPromise = b(function() {
          e.durationPromise = null
        }, a.minDuration)))
      }, e.getThen = function(a) {
        var b = a && (a.then || a.$then || a.$promise && a.$promise.then);
        return a.denodeify ? c.when(a).then : b
      };
      var f = function(a) {
        var b = e.getThen(a);
        return b ? void(-1 === e.promises.indexOf(a) && (e.promises.push(a), b(function() {
          a.$cgBusyFulfilled = !0, -1 !== e.promises.indexOf(a) && e.promises.splice(e.promises.indexOf(a), 1)
        }, function() {
          a.$cgBusyFulfilled = !0, -1 !== e.promises.indexOf(a) && e.promises.splice(e.promises.indexOf(a), 1)
        }))) : void d.error("expects a promise (or something that has a .promise or .$promise")
      };
      return e.active = function() {
        return e.delayPromise ? !1 : e.durationPromise ? !0 : e.promises.length > 0
      }, e
    }
  }
]),

angular.module("vamosApp").factory("Main", ["$rootScope", "$q", "$timeout", "$filter", "EventsManager", "Event", "Datepicker", "Category", "CampaignsManager",
  function(a, b, c, d, e, f, g, h, i) {
    return {
      activeCategoryIndex: 0,
      availableSortMethods: {
        score: {
          id: 1,
          name: "Suggested",
          by: "score",
          reversed: !0
        },
        num_attending: {
          id: 2,
          name: "People attending",
          by: "num_attending",
          reversed: !0
        },
        startDate: {
          id: 3,
          name: "Time",
          by: "startDate",
          reversed: !1
        }
      },
      campaignId: null,
      datepicker: null,
      endDate: Date.today().clearTime().add(1).days().add(-1).seconds(),
      firstCategory: new h({
        filter: !1,
        filterName: null,
        name: null,
        timespan: null
      }),
      numberOfEventsToShow: 12,
      startDate: new Date,
      view: "list",
      incrementNumberOfEventsToShow: function() {
        var a = b.defer(),
          d = this;
        return c(function() {
          return d.numberOfEventsToShowIncrement = d.numberOfEventsToShowIncrement || d.numberOfEventsToShow, d.numberOfEventsToShow += d.numberOfEventsToShowIncrement, a.resolve(d.numberOfEventsToShow), d.numberOfEventsToShow
        }, 0), a.promise
      },
      resetNumberOfEventsToShow: function() {
        return this.numberOfEventsToShow = 12, this.numberOfEventsToShow
      },
      get: function(a) {
        return this[a]
      },
      getCampaign: function(a) {
        var d = b.defer();
        return c(function() {
          i.getCampaign(a).then(function(a) {
            return d.resolve(a), a
          })
        }, 0), d.promise
      },
      getCampaigns: function() {
        var d = b.defer(),
          e = this;
        return c(function() {
          i.getCampaigns(a.user.city, e.startDate, e.endDate).then(function(a) {
            return d.resolve(a), a
          })
        }, 0), d.promise
      },
      getPromise: function(a) {
        var d = b.defer(),
          e = this;
        return c(function() {
          return d.resolve(e[a]), e[a]
        }, 0), d.promise
      },
      getDatepicker: function() {
        return this.datepicker = this.datepicker || new g, this.datepicker
      },
      getEvent: function(a) {
        var d = b.defer();
        return c(function() {
          e.getEvent(a).then(function(a) {
            return d.resolve(a), a
          })
        }, 0), d.promise
      },
      getEvents: function() {
        var d = b.defer(),
          g = this;
        return c(function() {
          var b = {
            events: [],
            categories: []
          };
          g.campaignId ? g.getCampaign(g.campaignId).then(function(a) {
            if (a.events)
              for (var c = new Date, e = a.events.length - 1; e >= 0; e--) {
                var g = new f(a.events[e]);
                if (g.endDate && g.endDate.getTime() > c.getTime() || !g.endDate && g.startDate.getTime() > g.startDate.clone().add(12).hours()) {
                  if (g.category && g.category.length > 0) {
                    var i = new h({
                      name: g.category.charAt(0).toUpperCase() + g.category.slice(1),
                      filter: !0
                    });
                    b.categories.containsObject(i, "name") || b.categories.push(i)
                  }
                  b.events.push(g)
                }
              }
            return d.resolve(b), b
          }) : e.getEvents(a.user.city, g.startDate, g.endDate).then(function(a) {
            e.getCategories().then(function(c) {
              b.events = a, b.categories = c;
              var e = 0;
              if (a.length)
                for (var f = a.length - 1; f >= 0; f--) {
                  var h = a[f].startDate.getTime();
                  h > e && (e = h)
                }
              return 0 !== e && e > g.endDate.getTime() && (b.timeframe = {
                start: g.startDate.getTime(),
                end: e
              }), d.resolve(b), b
            })
          })
        }, 0), d.promise
      },
      getFilterdEvents: function(a, e) {
        var f = b.defer();
        return c(function() {
          var b = d("EventsByCategory")(a, e);
          return f.resolve(b), b
        }, 0), f.promise
      },
      set: function(a, b) {
        return this[a] = b, this[a]
      },
      setEventsFacebookFriends: function(d, f) {
        var g = b.defer();
        return c(function() {
          a.user.getFriendsEventsSince(d, f, "attending").then(function(b) {
            b && (angular.forEach(b, function(b, c) {
              e.getEventByFid(c).then(function(c) {
                c && (c.facebookFriends = b.friends, e.calculateScore(c, a.user))
              })
            }), g.resolve())
          })
        }, 0), g.promise
      },
      setJoinedEvents: function(d, f) {
        var g = b.defer();
        return c(function() {
          a.user.getEventsJoinedOnFacebook(d.clone().clearTime(), f).then(function(a) {
            if (a && a.data)
              for (var b = a.data, c = b.length - 1; c >= 0; c--) e.getEventByFid(b[c].id).then(function(a) {
                a && (a.joined = !0)
              });
            g.resolve()
          })
        }, 0), g.promise
      },
      setPromise: function(a, d) {
        var e = this,
          f = b.defer();
        return c(function() {
          return e[a] = d, f.resolve(e[a]), e[a]
        }, 0), f.promise
      },
      setEndDate: function(a) {
        var d = b.defer(),
          e = this;
        return c(function() {
          return e.endDate = a, d.resolve(e.endDate), e.endDate
        }, 0), d.promise
      },
      setFirstCategory: function(a) {
        var d = b.defer(),
          e = this;
        return c(function() {
          return e.firstCategory = a, d.resolve(e.firstCategory), e.firstCategory
        }, 0), d.promise
      },
      setFirstCategoryName: function(a) {
        return this.firstCategory.name = a, this.firstCategory.name
      },
      setActiveSort: function(a) {
        var d = b.defer(),
          e = this;
        return c(function() {
          return e.sort = e.availableSortMethods[a] || e.availableSortMethods.score, d.resolve(e.sort), e.sort
        }, 0), d.promise
      },
      setTimespan: function(a, d) {
        var e = b.defer(),
          f = this;
        return c(function() {
          f.startDate = a, f.endDate = d || f.startDate.clone().clearTime().add(1).days().add(-1).seconds();
          var b = {
            startDate: f.startDate,
            endDate: f.endDate
          };
          return e.resolve(b), b
        }, 0), e.promise
      },
      setView: function(a) {
        var b = this;
        return b.view = 0 === a.indexOf("map") || 1 === a.indexOf("map") ? "map" : "list", b.view
      }
    }
  }
]),

angular.module("vamosApp").factory("EventsManager", ["$http", "$cacheFactory", "$q", "$timeout", "$filter", "Api", "LocalStorage", "Event", "Category", "ENV",
  function(a, b, c, d, e, f, g, h, i, j) {
    var k = {
      _cache: b("eventsCache"),
      _pool: [],
      _categories: [],
      _allowed_categories: {
        all: !0,
        arts_culture: !0,
        food_drink: !0,
        nightlife: !0,
        sport: !0,
        music: !0,
        networking: !0,
        family: !0,
        other: !0,
        fashion: !0
      },
      _current: {
        city: null,
        endDate: null,
        dateDiff: null
      },
      _promises: {},
      _localStorage: {
        enabled: j.localStorageEnabled && Modernizr.localstorage,
        key: "events",
        expirationTime: 15
      },
      _retrieveInstance: function(a) {
        var b = this._cache.get(a.id) || this._cache.put(a.id, new h(a));
        return angular.extend(b, a)
      },
      _search: function(a) {
        return this._cache.get(a) || null
      },
      _searchByFid: function(a) {
        for (var b = this, c = b._pool.length - 1; c >= 0; c--)
          if (b._pool[c].fid === a) return b._pool[c];
        return null
      },
      _load: function(b, c) {
        var d = this;
        f.apiUrlFor("event", {
          id: b
        }).then(function(b) {
          a.get(b, {
            cache: !0
          }).success(function(a) {
            var b = d._retrieveInstance(a);
            c.resolve(b)
          }).error(function() {
            c.resolve(null)
          })
        })
      },
      _fetchAll: function(b, c, d, e, h) {
        var j = this;
        if (j._localStorage.enabled) {
          var k = g.load(j._localStorage.key);
          if (k && k.city.name === b.name && new Date(k.startDate).getTime() === c.getTime() && new Date(k.endDate).getTime() === d.getTime()) {
            j._current.city = angular.copy(b), j._current.endDate = angular.copy(d), j._current.dateDiff = Math.round((d - c) / 864e5), j._categories = [];
            for (var l = k.events.length - 1; l >= 0; l--) {
              var m = j._retrieveInstance(k.events[l]);
              if (j._pool.push(m), "undefined" != typeof m.category && m.category.length > 0) {
                var n = new i({
                  name: m.category.charAt(0).toUpperCase() + m.category.slice(1),
                  filter: !0
                });
                j._allowed_categories[n.name.toLowerCase()] && !j._categories.containsObject(n) && j._categories.push(n)
              }
            }
            return j._categories.sort(function(a, b) {
              return a.name.localeCompare(b.name)
            }), h.resolve(j._pool)
          }
        }
        f.apiUrlFor("events", {
          latitude: b.latitude,
          longitude: b.longitude,
          since: c.unixTimestamp(),
          until: d.unixTimestamp()
        }).then(function(f) {
          a.get(f, {
            cache: !0
          }).success(function(a) {
            var f = a;
            a.events && (f = a.events), j._categories = [];
            for (var k = f.length - 1; k >= 0; k--) {
              var l = j._retrieveInstance(f[k]);
              if (j._pool.push(l), "undefined" != typeof l.category && l.category.length > 0) {
                var m = new i({
                  name: l.category.charAt(0).toUpperCase() + l.category.slice(1),
                  filter: !0
                });
                j._allowed_categories[m.name.toLowerCase()] && !j._categories.containsObject(m) && j._categories.push(m)
              }
            }
            return j._categories.sort(function(a, b) {
              return a.name.localeCompare(b.name)
            }), j._localStorage.enabled && g.save(j._localStorage.key, {
              city: b,
              startDate: c,
              endDate: d,
              dateDiff: e,
              events: j._pool
            }, j._localStorage.expirationTime), h.resolve(j._pool)
          }).error(function() {
            return h.resolve(j._pool)
          })
        })
      },
      calculateScore: function(a, b) {
        var e = c.defer();
        return d(function() {
          return b.isLoggedIn() ? void f.getSocialActions().then(function(b) {
            if (a.facebookFriends && b.facebook) {
              for (var c = b.facebook, d = 1, f = c.length - 1; f >= 0; f--)
                if ("friend_attending" === c[f].name) {
                  d = Number(c[f].weight);
                  break
                }
              a.score += a.facebookFriends.length * d
            }
            return e.resolve(a.score), a.score
          }) : (e.resolve(a.score), a.score)
        }), e.promise
      },
      clearPool: function() {
        this._pool = []
      },
      searchForEvent: function(a) {
        return this._search(a)
      },
      getEvent: function(a) {
        var b = c.defer(),
          d = this._search(a);
        return d ? b.resolve(d) : this._load(a, b), b.promise
      },
      getEventByFid: function(a) {
        var b = c.defer(),
          d = this._searchByFid(a);
        return d ? b.resolve(d) : b.reject(), b.promise
      },
      getEvents: function(a, b, d) {
        var e = this,
          f = c.defer();
        b || (b = new Date), d || (d = new Date(b.getFullYear(), b.getMonth(), b.getDate() + 1));
        var g = Math.round((d - b) / 864e5);
        return (null === e._current.city || e._current.city.name !== a.name || e._current.endDate.getTime() !== d.getTime() || e._current.dateDiff !== g) && (e.clearPool(), e._current.city = angular.copy(a), e._current.endDate = angular.copy(d), e._current.dateDiff = angular.copy(g)), 0 === e._pool.length ? e._fetchAll(a, b, d, g, f) : f.resolve(e._pool), f.promise
      },
      getCategories: function() {
        var a = this,
          b = c.defer();
        return b.resolve(a._categories), b.promise
      },
      getInstance: function(a) {
        return this._retrieveInstance(a)
      },
      setEvent: function(a) {
        var b = this,
          c = this._search(a.id);
        return c ? c.setData(a) : c = b._retrieveInstance(a), c
      }
    };
    return k
  }
]),

angular.module("vamosApp").factory("Event", ["$http", "$q", "$timeout", "Api", "colorsHex", "ENV",
  function(a, b, c, d, e, f) {
    function g(a) {
      a && (this.setData(a), a.start_time && (this.startDate = new Date(a.start_time)), a.end_time && (this.endDate = new Date(a.end_time)), a.score && (this.score = Number(a.score)), this.num_attending = a.num_attending ? Number(a.num_attending) : 0)
    }
    return g.prototype = {
      _promises: {},
      setData: function(a) {
        angular.extend(this, a)
      },
      url: function() {
        return "/event/" + this.name.parameterize() + "/" + this.id
      },
      fullUrl: function() {
        return f.rootPath + this.url()
      },
      shortUrl: function() {
        return f.rootPath + "/e/" + this.id
      },
      getMediaItems: function() {
        var c = this,
          e = b.defer();
        return d.apiUrlFor("event_items", {
          event_id: c.id
        }).then(function(b) {
          a.get(b).success(function(a) {
            e.resolve(a)
          }).error(function() {
            e.resolve(null)
          })
        }), e.promise
      },
      getColors: function() {
        var a = this,
          d = b.defer();
        return c(function() {
          if (a.color) d.resolve(a.color);
          else {
            for (var b = Math.round(Math.random() * (e.length - 1)), c = Math.round(Math.random() * (e.length - 1)); c === b;) c = Math.round(Math.random() * (e.length - 1));
            a.color = e[b], a.buttonColor = e[c], d.resolve([a.color, a.buttonColor])
          }
        }, 0), d.promise
      },
      getEventLocation: function() {
        var a = this,
          e = b.defer();
        return c(function() {
          a.venue && a.venue.latitude && a.venue.longitude ? (a.latitude = a.venue.latitude, a.longitude = a.venue.longitude, e.resolve({
            latitude: a.latitude,
            longitude: a.longitude
          })) : d.geocodeAddress(a.location).then(function(b) {
            b.latitude && b.longitude ? (a.latitude = b.latitude, a.longitude = b.longitude, e.resolve({
              latitude: a.latitude,
              longitude: a.longitude
            })) : e.resolve()
          })
        }, 0), e.promise
      }
    }, g
  }
]),

angular.module("vamosApp").factory("CampaignsManager", ["$http", "$q", "ENV", "Api", "LocalStorage", "Campaign",
  function(a, b, c, d, e, f) {
    var g = {
      _pool: [],
      _current: {
        city: null,
        endDate: null,
        dateDiff: null
      },
      _localStorage: {
        enabled: c.localStorageEnabled && Modernizr.localstorage,
        key: "campaigns",
        expirationTime: 15
      },
      _retrieveInstance: function(a, b) {
        var c = null;
        return this._pool.forEach(function(b) {
          return b.id === a ? void(c = b) : void 0
        }), c ? c.setData(b) : (c = new f(b), this._pool.push(c)), c
      },
      _search: function(a) {
        var b = null;
        return this._pool.forEach(function(c) {
          return c.id === a ? void(b = c) : void 0
        }), b
      },
      _load: function(b, c, e) {
        var g = this;
        d.apiUrlFor("campaign", {
          id: b
        }).then(function(b) {
          a.get(b, {
            cache: !0
          }).success(function(a) {
            var b = c ? g._retrieveInstance(a.id, a) : new f(a);
            e.resolve(b)
          }).error(function() {
            e.resolve(null)
          })
        })
      },
      _fetchAll: function(b, c, f, g, h) {
        var i = this;
        if (i._localStorage.enabled) {
          var j = e.load(i._localStorage.key);
          if (j && j.city.name === b.name && new Date(j.startDate).getTime() === c.getTime() && new Date(j.endDate).getTime() === f.getTime()) {
            i._current.city = b, i._current.endDate = f, i._current.dateDiff = Math.round((f - c) / 864e5);
            var k = [];
            return i._categories = [], j.campaigns.forEach(function(a) {
              var b = i._retrieveInstance(a.id, a);
              k.push(b)
            }), h.resolve(i._pool)
          }
        }
        d.apiUrlFor("campaigns", {
          latitude: b.latitude,
          longitude: b.longitude,
          since: c.unixTimestamp(),
          until: f.unixTimestamp()
        }).then(function(d) {
          a.get(d, {
            cache: !0
          }).success(function(a) {
            var d = [],
              j = a;
            return a.campaigns && (j = a.campaigns), i._categories = [], j.forEach(function(a) {
              var b = i._retrieveInstance(a.id, a);
              d.push(b)
            }), i._localStorage.enabled && e.save(i._localStorage.key, {
              city: b,
              startDate: c,
              endDate: f,
              dateDiff: g,
              campaigns: d
            }, i._localStorage.expirationTime), h.resolve(i._pool)
          }).error(function() {
            return h.resolve(i._pool)
          })
        })
      },
      clearPool: function() {
        this._pool = []
      },
      getCampaign: function(a, c) {
        var d = b.defer(),
          e = this._search(a);
        return e ? d.resolve(e) : this._load(a, c, d), d.promise
      },
      getCampaigns: function(a, c, d) {
        var e = this,
          f = b.defer();
        c || (c = new Date), d || (d = new Date(c.getFullYear(), c.getMonth(), c.getDate() + 1));
        var g = Math.round((d - c) / 864e5);
        return (null === e._current.city || e._current.city.name !== a.name || e._current.endDate.getTime() !== d.getTime() || e._current.dateDiff !== g) && (e.clearPool(), e._current.city = a, e._current.endDate = d, e._current.dateDiff = g), 0 === e._pool.length ? e._fetchAll(a, c, d, g, f) : f.resolve(e._pool), f.promise
      }
    };
    return g
  }
]),

angular.module("vamosApp").factory("Campaign", ["ENV",
  function(a) {
    function b(a) {
      var b = this;
      if (a && b.setData(a), a.id && (b.id = Number(a.id)), a.start_time && (b.startDate = new Date(a.start_time)), a.end_time && (b.endDate = new Date(a.end_time)), a.banners)
        for (var c = a.banners, d = c.length - 1; d >= 0; d--)
          if ("300" === c[d].width && "250" === c[d].height) {
            b.banners = b.banners || {}, b.banners.mediumRectangleBanner = c[d], b.banners.mediumRectangleBanner.url_retina = b.banners.mediumRectangleBanner.url.replace(/\.\w+$/, b.suffixReplace);
            break
          }
    }
    return b.prototype = {
      _promises: {},
      setData: function(a) {
        angular.extend(this, a)
      },
      suffixReplace: function(a) {
        return "@2x" + a
      },
      url: function() {
        return "/featured/" + this.name.parameterize() + "/" + this.id
      },
      fullUrl: function() {
        return a.rootPath + this.url()
      }
    }, b
  }
]),

angular.module("vamosApp").factory("Api", ["$q", "$timeout", "$http", "ENV", "LocalStorage",
  function(a, b, c, d, e) {
    var f = {
      _localStorage: {
        enabled: !1,
        expirationTime: 1440,
        name: "endpoints",
        location: "location"
      },
      _timestampExpiration: 14,
      _google_geocode_endpoint: "https://maps.googleapis.com/maps/api/geocode/json{?key,address,latlng,result_type}",
      _bing_query_search: "http://dev.virtualearth.net/REST/v1/Locations?key=" + d.bingMapsApiKey + "{&query,includeEntityTypes}&jsonp=JSON_CALLBACK",
      _bing_location_search: "http://dev.virtualearth.net/REST/v1/Locations/{latitude},{longitude}?key=" + d.bingMapsApiKey + "{&includeEntityTypes}&jsonp=JSON_CALLBACK",
      getApiLinks: function() {
        var c = this,
          f = a.defer();
        if (c._links) return f.resolve(c._links), f.promise;
        if (c._localStorage.enabled && e.load(c._localStorage.name)) {
          var g = e.load(c._localStorage.name);
          if (new Date(g.timestamp) > new Date || !navigator.onLine) return c._links = g.value, f.resolve(c._links), f.promise
        }
        return b(function() {
          var a = {
            create_session: "/mobile/create_session?oauth_consumer_key=" + d.vamosConsumerKey + "{&timestamp}",
            event: "/events/{id}.json?oauth_consumer_key=" + d.vamosConsumerKey + "{&timestamp}",
            events: "/events.json?oauth_consumer_key=" + d.vamosConsumerKey + "{&timestamp}&center={latitude},{longitude}{&since,until}",
            campaign: "/campaigns/{id}.json?oauth_consumer_key=" + d.vamosConsumerKey + "{&timestamp}",
            campaigns: "/campaigns.json?oauth_consumer_key=" + d.vamosConsumerKey + "{&timestamp}&center={latitude},{longitude}{&since,until}",
            unsubscribe: "/newsletters/unsubscribe.json?oauth_consumer_key=" + d.vamosConsumerKey + "{&timestamp}",
            venue: "/venues/{id}.json?oauth_consumer_key=" + d.vamosConsumerKey + "{&timestamp,id}",
            venues: "/venues.json?oauth_consumer_key=" + d.vamosConsumerKey + "{&timestamp,name,event_id}",
            login: "/mobile/email_auth?oauth_consumer_key=" + d.vamosConsumerKey + "{&timestamp}",
            signup: "/mobile/email_signup?oauth_consumer_key=" + d.vamosConsumerKey + "{&timestamp}",
            sign_s3_request: "/utility/sign_s3_request?oauth_consumer_key=" + d.vamosConsumerKey + "{&timestamp,type,size,s3_object_type,s3_object_name,user_id}",
            social_actions: "/utility/social_actions.json?oauth_consumer_key=" + d.vamosConsumerKey + "{&timestamp}",
            search: "/search/{location}?oauth_consumer_key=" + d.vamosConsumerKey + "{&timestamp,center,offset,sort,date,category,kind,limit,page,query,_user_id,_categories,_subscription_ids,_friend_ids}"
          };
          if (c._links = a, c._localStorage.enabled) {
            var b = new Date;
            b.setMinutes(b.getMinutes() + c._localStorage.expirationTime);
            var g = {
              value: a,
              timestamp: b.getTime()
            };
            e.save(c._localStorage.name, g)
          }
          f.resolve(c._links)
        }), f.promise
      },
      handleBingResponse: function(a) {
        var b = null;
        if (200 === a.statusCode) {
          var c, d, e, f, g, h = a.resourceSets[0].resources;
          if (h.length > 0) {
            if (b = {}, c = h[0], d = c.point && c.point.coordinates || c.geocodePoints && c.geocodePoints[0] && c.geocodePoints[0].coordinates || null, e = c.name || c.address && (c.address.locality || c.address.adminDistrict) || null, f = c.address && c.address.countryRegion || null, g = c.address && c.address.formattedAddress || null, e.indexOf(",") > -1) {
              var i = e.split(",");
              e = i[0]
            }
            b.name = e, b.parameterized_name = e.parameterize(), b.latitude = d[0], b.longitude = d[1], b.country = f, b.formatted_address = e && f && e + ", " + f
          }
        }
        return b
      },
      geocodeAddress: function(d) {
        var e = a.defer(),
          f = this;
        return b(function() {
          var a = new URITemplate(f._bing_query_search).expand({
            query: d
          });
          c.jsonp(a, {
            cache: !0
          }).success(function(a) {
            var b = f.handleBingResponse(a);
            e.resolve(b)
          })
        }), e.promise
      },
      reverseGeocode: function(d, e) {
        var f = a.defer(),
          g = this;
        return b(function() {
          var a = new URITemplate(g._bing_location_search).expand({
            latitude: d,
            longitude: e
          });
          c.jsonp(a, {
            cache: !0
          }).success(function(a) {
            var b = g.handleBingResponse(a);
            f.resolve(b)
          })
        }), f.promise
      },
      getSocialActions: function() {
        var d = a.defer(),
          e = this;
        return e._social_actions ? d.resolve(e._social_actions) : b(function() {
          e.apiUrlFor("social_actions").then(function(a) {
            c.get(a, {
              cache: !0
            }).success(function(a) {
              return e._social_actions = a, d.resolve(a), a
            })
          })
        }), d.promise
      },
      unsubscribe: function(d) {
        var e = this,
          f = a.defer();
        return b(function() {
          e.apiUrlFor("unsubscribe").then(function(a) {
            c.post(a, d).success(function(a) {
              f.resolve(a)
            })
          })
        }), f.promise
      },
      apiUrlFor: function(c, e) {
        var f = this,
          g = a.defer();
        return b(function() {
          f.getApiLinks().then(function(a) {
            if (a[c]) {
              f.timestamp = !f.timestamp || f.timestamp < (new Date).add(-f._timestampExpiration).minutes().unixTimestamp() ? (new Date).unixTimestamp() : f.timestamp, e = e || {}, angular.extend(e, {
                timestamp: f.timestamp
              });
              var b = new URITemplate(d.apiEndpoint + f._links[c]).expand(e);
              g.resolve(b)
            } else console.error("Endpoint: " + c + " does not exist!"), g.reject("Endpoint: " + c + " does not exist!")
          })
        }), g.promise
      }
    };
    return f
  }
]),

angular.module("vamosApp").factory("Venue", ["$q", "$http", "$timeout", "$log", "Api", "ENV", "EventsManager",
  function(a, b, c, d, e, f, g) {
    function h(a) {
      a && this.setData(a)
    }
    var i = {
      events: f.apiEndpoint + "/venues/{id}/events.json?oauth_consumer_key=" + f.vamosConsumerKey + "{&timestamp,since}"
    };
    return h.prototype = {
      GET: function(e, f) {
        var g = a.defer(),
          h = {
            timestamp: (new Date).unixTimestamp()
          };
        return f = f || {}, c(function() {
          angular.extend(f, h);
          var a = new URITemplate(i[e]).expand(f);
          b.get(a).success(function(a) {
            g.resolve(a)
          }).error(function(a) {
            d.error(a), g.resolve(a)
          })
        }), g.promise
      },
      setData: function(a) {
        angular.extend(this, a)
      },
      getEvents: function() {
        var b = a.defer(),
          d = this;
        return d.events && d.events.length ? b.resolve(d.events) : c(function() {
          var a = (new Date).unixTimestamp();
          d.GET("events", {
            id: d.id,
            since: a
          }).then(function(c) {
            d.events = [];
            for (var e = c.events || [], f = e.length - 1; f >= 0; f--) {
              var h = new Date(e[f].start_time).getTime() - a;
              if (h > 0 && !d.events.containsObject(e[f], "id")) {
                var i = g.getInstance(e[f]);
                d.events.push(i)
              }
            }
            b.resolve(d.events)
          })
        }), b.promise
      }
    }, h
  }
]),

angular.module("vamosApp").factory("VenuesManager", ["$http", "$q", "$filter", "$timeout", "$cacheFactory", "$log", "$facebook", "Api", "ENV", "Venue",
  function(a, b, c, d, e, f, g, h, i, j) {
    var k = {
      _cache: e("venuesCache"),
      _localStorage: {
        enabled: i.localStorageEnabled && Modernizr.localstorage,
        key: "venues",
        expirationTime: 15
      },
      _retrieveInstance: function(a) {
        var b = this._cache.get(a.fid) || this._cache.put(a.fid, new j(a));
        return angular.extend(b, a)
      },
      _search: function(a) {
        return this._cache.get(a) || null
      },
      _load: function(b, c) {
        var d = this;
        h.apiUrlFor("venue", {
          id: b
        }).then(function(b) {
          a.get(b, {
            cache: !0
          }).success(function(a) {
            var b = d._retrieveInstance(a);
            c.resolve(b)
          }).error(function() {
            c.resolve(null)
          })
        })
      },
      getInstance: function(a) {
        return this._retrieveInstance(a)
      },
      getVenue: function(a) {
        var c = b.defer(),
          d = this._search(a);
        return d ? c.resolve(d) : this._load(a, c), c.promise
      },
      getSuggestedVenues: function(c, e) {
        var f = b.defer(),
          i = this;
        return d(function() {
          if (e && e.fid && e.facebookAccessToken) {
            var b = new Date;
            g.api("/", "POST", {
              access_token: e.facebookAccessToken,
              batch: [{
                method: "GET",
                name: "get-events",
                relative_url: "me?fields=events.until(" + b.unixTimestamp() + ").limit(50).fields(venue.fields(id)).center(" + c + ")"
              }, {
                method: "GET",
                relative_url: "?ids={result=get-events:$.events.data.*.venue.id}&fields=name,location,events.limit(1).fields(id)"
              }]
            }, function(a) {
              var b = e.venues,
                c = [];
              a[1] && a[1].body && angular.forEach(angular.fromJson(a[1].body), function(a) {
                if (a.fid = a.id, !b.containsObject(a, "fid")) {
                  var d = i._retrieveInstance(a);
                  c.push(d)
                }
              }), f.resolve(c)
            })
          } else h.apiUrlFor("search", {
            location: "venues",
            center: c.latitude + "," + c.longitude
          }).then(function(b) {
            a.get(b).success(function(a) {
              f.resolve(a)
            }, function() {
              f.resolve([])
            })
          })
        }), f.promise
      },
      search: function(c) {
        var d = b.defer();
        return h.apiUrlFor("venues", {
          name: c
        }).then(function(b) {
          a.get(b).success(function(a) {
            d.resolve({
              status: "ok",
              data: "null" === a ? null : a
            })
          }, function() {
            d.resolve({
              status: "fail",
              data: null
            })
          })
        }), d.promise
      }
    };
    return k
  }
]),

angular.module("vamosApp").factory("User", ["$rootScope", "$q", "$timeout", "$http", "Api", "$facebook", "ipCookie", "$log", "ENV", "LocalStorage", "City", "EventsManager", "VenuesManager",
  function(a, b, c, d, e, f, g, h, i, j, k, l, m) {
    function n() {
      var a = this;
      a.id = g("user_id") || null, a.auth_token = g("auth_token") || null, a.fid = g("fid") || null, a.facebookAccessToken = g("facebookAccessToken") || null, a.setUserData(), a.fid && a.checkFacebookLoginStatus()
    }
    var o = {
      add_categories: i.apiEndpoint + "/users/{id}/categories.json?user_id={id}&auth_token={auth_token}&oauth_consumer_key=" + i.vamosConsumerKey + "{&timestamp}",
      add_event: i.apiEndpoint + "/users/{id}/events/{event_id}.json?user_id={id}&auth_token={auth_token}&oauth_consumer_key=" + i.vamosConsumerKey + "{&timestamp}",
      add_subscriptions: i.apiEndpoint + "/users/{id}/subscriptions.json?user_id={id}&auth_token={auth_token}&oauth_consumer_key=" + i.vamosConsumerKey + "{&timestamp}",
      add_venues: i.apiEndpoint + "/users/{id}/venues.json?user_id={id}&auth_token={auth_token}&oauth_consumer_key=" + i.vamosConsumerKey + "{&timestamp}",
      create_events: i.apiEndpoint + "/events/create_events.json?user_id={id}&auth_token={auth_token}&oauth_consumer_key=" + i.vamosConsumerKey + "{&timestamp,access_token,center}",
      events: i.apiEndpoint + "/users/{id}/events.json?user_id={id}&auth_token={auth_token}&oauth_consumer_key=" + i.vamosConsumerKey + "{&timestamp}",
      remove_category: i.apiEndpoint + "/users/{id}/categories/{category_id}.json?user_id={id}&auth_token={auth_token}&oauth_consumer_key=" + i.vamosConsumerKey + "{&timestamp,action_type}",
      remove_event: i.apiEndpoint + "/users/{id}/events/{event_id}.json?user_id={id}&auth_token={auth_token}&oauth_consumer_key=" + i.vamosConsumerKey + "{&timestamp,action_type}",
      remove_venue: i.apiEndpoint + "/users/{id}/venues/{venue_id}.json?user_id={id}&auth_token={auth_token}&oauth_consumer_key=" + i.vamosConsumerKey + "{&timestamp,action_type}",
      show: i.apiEndpoint + "/users/{id}.json?user_id={id}&auth_token={auth_token}&oauth_consumer_key=" + i.vamosConsumerKey + "{&timestamp}",
      update: i.apiEndpoint + "/users/{id}.json?user_id={id}&auth_token={auth_token}&oauth_consumer_key=" + i.vamosConsumerKey + "{&timestamp}",
      venues: i.apiEndpoint + "/users/{id}/venues.json?user_id={id}&auth_token={auth_token}&oauth_consumer_key=" + i.vamosConsumerKey + "{&timestamp}"
    };
    return n.prototype = {
      _localStorage: {
        enabled: i.localStorageEnabled && Modernizr.localstorage,
        location: {
          key: "location",
          expirationTime: 43200
        },
        city: {
          key: "city",
          expirationTime: 43200
        }
      },
      GET: function(a, e) {
        var f = b.defer(),
          g = this,
          i = {
            id: g.id,
            auth_token: g.auth_token,
            timestamp: (new Date).unixTimestamp()
          };
        return e = e || {}, c(function() {
          angular.extend(e, i);
          var b = new URITemplate(o[a]).expand(e);
          d.get(b).success(function(a) {
            f.resolve(a)
          }).error(function(a) {
            h.error(a), f.resolve(a)
          })
        }), f.promise
      },
      POST: function(a, e) {
        var f = b.defer(),
          g = this;
        return c(function() {
          var b = new URITemplate(o[a]).expand({
            id: g.id,
            event_id: e.event_id || null,
            venue_id: e.venue_id || null,
            auth_token: g.auth_token,
            timestamp: (new Date).unixTimestamp()
          });
          d.post(b, e).success(function() {
            f.resolve({
              status: "ok"
            })
          }).error(function() {
            h.error("POST failed"), f.resolve({
              status: "fail"
            })
          })
        }), f.promise
      },
      PUT: function(a, e) {
        var f = b.defer(),
          g = this;
        return c(function() {
          var b = new URITemplate(o[a]).expand({
            id: g.id,
            event_id: e.event_id || null,
            auth_token: g.auth_token,
            timestamp: (new Date).unixTimestamp()
          });
          d.put(b, e).success(function() {
            f.resolve({
              status: "ok"
            })
          }).error(function() {
            h.error("PUT failed"), f.resolve({
              status: "fail"
            })
          })
        }), f.promise
      },
      DELETE: function(a, e) {
        var f = b.defer(),
          g = this,
          i = {
            id: g.id,
            auth_token: g.auth_token,
            timestamp: (new Date).unixTimestamp()
          };
        return e = e || {}, c(function() {
          angular.extend(e, i);
          var b = new URITemplate(o[a]).expand(e);
          d({
            method: "DELETE",
            url: b
          }).success(function(a) {
            f.resolve(a)
          }).error(function(a) {
            h.error(a), f.resolve(a)
          })
        }), f.promise
      },
      anonymous: !0,
      fid: null,
      id: null,
      addEvent: function(a, d) {
        var e = b.defer(),
          f = this;
        return f.pushToEvents(a), c(function() {
          f.POST("add_event", {
            event_id: a.id,
            action_type: d
          }).then(function() {
            e.resolve({
              status: "ok"
            })
          }, function() {
            e.resolve({
              status: "fail"
            }), f.removeFromEvents(a)
          })
        }), e.promise
      },
      changeCity: function(a, d) {
        var f = b.defer(),
          g = this;
        if (g.city && g.city.name === a) return f.resolve(g.city), f.promise;
        d = d || {};
        var h = {
          saveToLocalStorage: !0,
          supressAlert: !1
        };
        return angular.extend(h, d), c(function() {
          e.geocodeAddress(a).then(function(a) {
            if (a) {
              var b = new k(a);
              g.latitude = a.latitude, g.longitude = a.longitude;
              var c = {
                latitude: a.latitude,
                longitude: a.longitude
              };
              h.saveToLocalStorage && j.save(g._localStorage.location.key, c, g._localStorage.location.expirationTime), g.city = null, j.save(g._localStorage.city.key, b, g._localStorage.city.expirationTime), g.getCity(c, f)
            } else h.supressAlert || alert("We could not match your search with any location."), f.resolve(null)
          })
        }), f.promise
      },
      checkFacebookLoginStatus: function() {
        var a = b.defer(),
          d = this;
        return c(function() {
          f.getLoginStatus(function(b) {
            if (d.facebookLoginReady = !0, "connected" === b.status) {
              if (d.fid = b.authResponse.userID, d.facebookAccessToken = b.authResponse.accessToken, g("fid", d.fid, {
                expires: 21
              }), g("facebookAccessToken", d.facebookAccessToken, {
                expires: 21
              }), d.facebookQueue && d.facebookQueue.length)
                for (var c = d.facebookQueue, e = c.length - 1; e >= 0; e--) c[e]()
            } else d.fid = null, d.facebookAccessToken = null, g.remove("fid"), g.remove("facebookAccessToken");
            a.resolve()
          })
        }), a.promise
      },
      eventInterested: function(a) {
        for (var b = this, c = b.events || [], d = c.length - 1; d >= 0; d--)
          if (a.id === c[d].id) return c[d].is_favorite;
        return !1
      },
      eventJoined: function(a) {
        var d = b.defer(),
          e = this;
        return c(function() {
          return e.fid ? e.facebookHandler(function() {
            f.api(a.fid + "/attending?user=" + e.fid, "GET", function(a) {
              return d.resolve(a.data && a.data.length > 0), a.data && a.data.length > 0
            })
          }) : void d.resolve(!1)
        }), d.promise
      },
      facebookHandler: function(a) {
        var b = this;
        return b.facebookLoginReady ? a() : (b.facebookQueue = b.facebookQueue || [], void b.facebookQueue.push(a))
      },
      toggleFollowVenue: function(a) {
        return a.followed === !0 ? this.unfollowVenue(a) : this.followVenue(a)
      },
      followVenue: function(a) {
        var d = b.defer(),
          e = this;
        return c(function() {
          e.venues = e.venues || [], e.venues.containsObject(a, "id") ? (a.followed = !0, d.resolve({
            status: "ok"
          })) : e.POST("add_venues", {
            venue_fids: a.fid
          }).then(function() {
            a.followed = !0, e.venues.push(a), d.resolve({
              status: "ok"
            })
          }, function() {
            d.resolve({
              status: "fail"
            })
          })
        }), d.promise
      },
      unfollowVenue: function(a) {
        var d = b.defer(),
          e = this;
        return c(function() {
          e.venues = e.venues || [];
          for (var b = e.venues, c = -1, f = b.length - 1; f >= 0; f--)
            if (a.id === b[f].id) {
              c = f;
              break
            }
          c >= 0 ? e.DELETE("remove_venue", {
            venue_id: a.id,
            venue_fids: a.fid
          }).then(function() {
            a.followed = !1, e.venues.splice(c, 1), d.resolve({
              status: "ok"
            })
          }, function() {
            d.resolve({
              status: "fail"
            })
          }) : (a.followed = !1, d.resolve({
            status: "ok"
          }))
        }), d.promise
      },
      friendsAttending: function(a) {
        var d = b.defer(),
          e = this;
        return c(function() {
          return e.fid ? e.facebookHandler(function() {
            f.api({
              method: "fql.query",
              query: 'SELECT uid, first_name, name, pic_square FROM user WHERE uid IN (SELECT uid FROM event_member WHERE eid = "' + a + '" AND uid IN (SELECT uid2 FROM friend WHERE uid1 = me()) AND rsvp_status = "attending" LIMIT 1000);'
            }, function(a) {
              return d.resolve(a), a
            })
          }) : (d.resolve(null), null)
        }), d.promise
      },
      getCity: function(d, e) {
        var f = e || b.defer(),
          g = this;
        return c(function() {
          if (g.city) return f.resolve(g.city), g.city;
          var b = j.load(g._localStorage.city.key);
          return b ? (g.city = b, c(function() {
            g.getCityCoverPhoto(g.city).then(function(a) {
              g.city.image = a
            })
          }), f.resolve(g.city), g.city) : d ? void g.getCityByLocation(d.latitude, d.longitude).then(function(b) {
            return g.city = b, j.save(g._localStorage.city.key, b, g._localStorage.city.expirationTime), c(function() {
              g.getCityCoverPhoto(g.city).then(function(a) {
                g.city.image = a
              })
            }), a.$broadcast("user-city-changed"), f.resolve(b), b
          }) : (f.resolve(null), null)
        }), e ? void 0 : f.promise
      },
      getCityByLocation: function(a, d) {
        var f = b.defer();
        return c(function() {
          e.reverseGeocode(a, d).then(function(a) {
            var b = new k(a);
            f.resolve(b)
          })
        }), f.promise
      },
      getCityCoverPhoto: function(a) {
        var e = b.defer();
        return c(function() {
          var b = new URITemplate("https://api.flickr.com/services/rest/{?api_key,method,format,nojsoncallback,accuracy,sort,media,content_type,has_geo,per_page,extras,tags,tag_mode,in_gallery,lat,lon}").expand({
            api_key: "02fc2dff1d73a08a575b9532210a28eb",
            method: "flickr.photos.search",
            format: "json",
            nojsoncallback: "1",
            accuracy: "11",
            sort: "interestingness-desc",
            media: "photos",
            content_type: "1",
            has_geo: "1",
            per_page: "10",
            extras: "url_z,tags,machine_tags,o_dims,view",
            tags: "landmark",
            tag_mode: "all",
            in_gallery: "true",
            lat: a.latitude,
            lon: a.longitude
          });
          d.get(b).success(function(a) {
            var b = [];
            a.photos.photo.forEach(function(a) {
              Number(a.width_z) >= 640 && a.url_z && b.push(a.url_z)
            }), e.resolve(b[Math.round(Math.random() * (b.length - 1))])
          }).error(function() {
            e.resolve(null)
          })
        }), e.promise
      },
      getEvents: function() {
        var a = b.defer(),
          d = this;
        return d.events ? a.resolve(d.events) : c(function() {
          d.GET("events", null).then(function(b) {
            for (var c = b.events || [], e = c.length - 1; e >= 0; e--) d.pushToEvents(c[e]);
            a.resolve(d.events)
          }, function() {
            a.resolve(null)
          })
        }), a.promise
      },
      getEventsJoinedOnFacebook: function(a, d) {
        var e = b.defer(),
          g = this;
        return c(function() {
          return g.fid ? g.facebookHandler(function() {
            f.api("me/events?fields=id&limit=100&since=" + a.unixTimestamp() + "&until=" + d.unixTimestamp(), function(a) {
              return e.resolve(a), a
            })
          }) : (e.resolve(null), null)
        }), e.promise
      },
      getFriendsEventsSince: function(a, d, e) {
        var g = b.defer(),
          h = this;
        return c(function() {
          return h.fid ? h.facebookHandler(function() {
            f.api({
              method: "fql.multiquery",
              queries: {
                sqlFriendsInfo: 'SELECT uid, first_name, name, pic_square FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1 = me()) AND uid IN (SELECT uid FROM event_member WHERE uid IN (SELECT uid2 FROM friend WHERE uid1 = me()) AND rsvp_status = "' + e + '" AND start_time > ' + a.unixTimestamp() + " AND start_time < " + d.unixTimestamp() + ")",
                sqlEventIds: 'SELECT eid FROM event WHERE eid IN (SELECT eid FROM event_member WHERE uid IN (SELECT uid FROM #sqlFriendsInfo) AND rsvp_status = "' + e + '" AND start_time > ' + a.unixTimestamp() + " AND start_time < " + d.unixTimestamp() + ");",
                sqlEidUid: 'SELECT eid, uid, rsvp_status FROM event_member WHERE eid IN (SELECT eid FROM #sqlEventIds) AND uid IN (SELECT uid FROM #sqlFriendsInfo) AND rsvp_status = "' + e + '";'
              }
            }, function(a) {
              var b = {};
              if (a && a[0] && a[2]) {
                var c = 0,
                  d = {},
                  e = a[0].fql_result_set;
                for (c = e.length - 1; c >= 0; c--) d[e[c].uid] = e[c];
                var f = a[2].fql_result_set;
                for (c = f.length - 1; c >= 0; c--) b[f[c].eid] = b[f[c].eid] || {}, b[f[c].eid].friends = b[f[c].eid].friends || [], b[f[c].eid].friends.push(d[f[c].uid])
              }
              return g.resolve(b), b
            })
          }) : (g.resolve({}), {})
        }), g.promise
      },
      getLocation: function() {
        var a = b.defer(),
          d = this;
        return c(function() {
          if (d.latitude && d.longitude) a.resolve({
            latitude: d.latitude,
            longitude: d.longitude
          });
          else {
            var b = j.load(d._localStorage.location.key) || null;
            b ? a.resolve(b) : !b && isMobile() && Modernizr.geolocation ? navigator.geolocation.getCurrentPosition(function(c) {
              b = {
                latitude: c.coords.latitude,
                longitude: c.coords.longitude
              }, j.save(d._localStorage.location.key, b, d._localStorage.location.expirationTime), ga("send", "event", "success:location", "User allowed request for Geolocation."), a.resolve(b)
            }, function(b) {
              switch (b.code) {
                case b.PERMISSION_DENIED:
                  ga("send", "event", "error:location", "User denied the request for Geolocation.");
                  break;
                case b.POSITION_UNAVAILABLE:
                  ga("send", "event", "error:location", "Location information is unavailable");
                  break;
                case b.TIMEOUT:
                  ga("send", "event", "error:location", "The request to get user location timed out.");
                  break;
                case b.UNKNOWN_ERROR:
                  ga("send", "event", "error:location", "An unknown error occurred.")
              }
              a.resolve(null)
            }, {
              enableHighAccuracy: !1,
              timeout: 1e4,
              maximumAge: 1e4
            }) : d.getLocationIpGeocoding().then(function(b) {
              b ? (j.save(d._localStorage.location.key, b, d._localStorage.location.expirationTime), a.resolve(b)) : (ga("send", "event", "error:location", "IP geocoding unsuccessfull"), a.resolve(null))
            })
          }
        }), a.promise
      },
      getCityFromIp: function(a, e) {
        var f = this,
          g = null;
        if (!(a && a.length > 0)) return g && (c.cancel(g), g = null), e.resolve(null), null;
        var i = a.splice(0, 1)[0],
          j = b.defer();
        d.get(i.url, {
          timeout: j.promise
        }).success(function(b) {
          g && (c.cancel(g), g = null);
          var d = new k;
          if (i.location_field && b[i.location_field]) {
            var h = b[i.location_field].split(",");
            d.latitude = h[0], d.longitude = h[1]
          } else i.latitude_field && i.longitude_field && (d.latitude = b[i.latitude_field], d.longitude = b[i.longitude_field]);
          return d.latitude && d.longitude ? (i.city_name_field && b[i.city_name_field] && (d.name = b[i.city_name_field], d.country = i.country_name_field && b[i.country_name_field], f.city = d), f.latitude = d.latitude, f.longitude = d.longitude, e.resolve(d), d) : f.getCityFromIp(a, e)
        }).error(function() {
          return f.getCityFromIp(a, e)
        }), g = c(function() {
          return h.log("Service " + i.url + " timed out..."), j.resolve(), f.getCityFromIp(a, e)
        }, 2e3)
      },
      getLocationIpGeocoding: function() {
        var a = this,
          d = b.defer();
        return c(function() {
          var b = [{
            url: "http://freegeoip.net/json/",
            city_name_field: "city",
            country_name_field: "country",
            location_field: null,
            latitude_field: "latitude",
            longitude_field: "longitude"
          }, {
            url: "http://ipinfo.io/json",
            city_name_field: "city",
            country_name_field: "country",
            location_field: "loc",
            latitude_field: null,
            longitude_field: null
          }, {
            url: "http://ip-api.com/json",
            city_name_field: "city",
            country_name_field: "country",
            location_field: null,
            latitude_field: "lat",
            longitude_field: "lon"
          }];
          a.getCityFromIp(b, d)
        }), d.promise
      },
      getVenues: function() {
        var a = b.defer(),
          d = this;
        return c(function() {
          d.venues ? a.resolve(d.venues) : c(function() {
            d.GET("venues").then(function(b) {
              d.venues = [], b = b || [];
              for (var c = b.length - 1; c >= 0; c--) b[c].followed = !0, d.venues.push(m.getInstance(b[c]));
              a.resolve(d.venues)
            }, function() {
              a.resolve(null)
            })
          })
        }), a.promise
      },
      interested: function(a, d) {
        var e = b.defer(),
          f = this;
        return c(function() {
          d ? f.addEvent(a, "like").then(function(a) {
            e.resolve(a)
          }) : f.removeEvent(a, "like").then(function(a) {
            e.resolve(a)
          })
        }), e.promise
      },
      isLoggedIn: function() {
        return !!this.id
      },
      isLoggedInToFacebook: function() {
        return !!this.fid
      },
      joinEventOnFacebook: function(a, d) {
        var e = b.defer(),
          g = this,
          h = null;
        return c(function() {
          return g.facebookHandler(d ? function() {
            f.api(a.fid + "/attending", "POST", function(b) {
              return b.error ? (h = {
                status: "fail",
                error: b
              }, e.resolve(h), h) : (g.addEvent(a, "join"), h = {
                status: "ok"
              }, e.resolve(h), h)
            })
          } : function() {
            f.api(a.fid + "/declined", "POST", function(b) {
              return b.error ? (h = {
                status: "fail",
                error: b
              }, e.resolve(h), h) : (g.addEvent(a, "join"), h = {
                status: "ok"
              }, e.resolve(h), h)
            })
          })
        }), e.promise
      },
      login: function() {
        var a = b.defer(),
          f = this;
        return c(function() {
          e.apiUrlFor("login").then(function(b) {
            d.post(b, {
              user_email: f.user_email,
              user_pwd: Base64.encode(f.user_pwd || "")
            }).success(function(b) {
              b.status && "ok" === b.status && b.user ? (f.setData(b.user), g("user_id", b.user.id, {
                expires: 21
              }), g("auth_token", b.user.auth_token, {
                expires: 21
              }), f.setUserData(), a.resolve({
                status: "ok"
              })) : a.resolve({
                status: "fail",
                error: "Your email or password was not correct. Please try again or reset your password."
              })
            })
          })
        }), a.promise
      },
      logout: function() {
        var a = this;
        a.id = null, a.auth_token = null, a.fid = null, a.facebookAccessToken = null, g.remove("user_id"), g.remove("auth_token"), g.remove("fid"), g.remove("facebookAccessToken"), window.location = "/"
      },
      facebookLoginResponse: function(h) {
        var i = this,
          j = b.defer();
        return c(function() {
          i.facebookLoginReady = !0, "connected" === h.status ? (i.fid = h.authResponse.userID, i.facebookAccessToken = h.authResponse.accessToken, g("fid", i.fid, {
            expires: 21
          }), g("facebookAccessToken", i.facebookAccessToken, {
            expires: 21
          }), f.api("/me", function(a) {
            a.error ? j.resolve({
              status: "ERROR",
              error: a.error || "Whoops something went wrong..."
            }) : (i.first_name = a.first_name, i.gender = a.gender, i.language = a.locale, i.last_name = a.last_name, i.provider = "facebook", i.timezone = a.timezone, i.user_email = a.email, c(function() {
              i.getLocation().then(function(a) {
                i.getCity(a).then(function(b) {
                  e.apiUrlFor("create_session").then(function(e) {
                    d.post(e, {
                      center: a.latitude + "," + a.longitude,
                      first_name: i.first_name,
                      gender: i.gender ? i.gender.toLowerCase() : null,
                      language: i.language || window.navigator.userLanguage || window.navigator.language,
                      last_name: i.last_name,
                      location: b.name,
                      provider: i.provider || "vamos",
                      timezone: i.timezone || (new Date).getTimezoneOffset() / -60,
                      uid: i.uid,
                      fid: i.fid,
                      access_token: i.facebookAccessToken,
                      user_email: i.user_email,
                      picture_url: i.picture_url,
                      user_pwd: i.user_pwd ? Base64.encode(i.user_pwd) : null
                    }).success(function(a) {
                      a.status && "ok" === a.status && a.user ? (i.setData(a.user), g("user_id", a.user.id, {
                        expires: 21
                      }), g("auth_token", a.user.auth_token, {
                        expires: 21
                      }), c(function() {
                        i.setUserData(), i.GET("create_events", {
                          access_token: i.facebookAccessToken,
                          center: i.latitude ? i.latitude + "," + i.longitude : null
                        })
                      }), j.resolve({
                        status: "OK"
                      })) : j.resolve({
                        status: "ERROR",
                        error: a.error || "Whoops something went wrong..."
                      })
                    })
                  })
                })
              })
            }))
          })) : (a.facebookLoginModalError = "Login error", j.resolve({
            status: "ERROR",
            error: h.error || "Whoops something went wrong..."
          }))
        }), j.promise
      },
      signup: function() {
        var a = b.defer(),
          f = this;
        return c(function() {
          f.getLocation().then(function(b) {
            f.getCity(b).then(function(h) {
              e.apiUrlFor("signup").then(function(e) {
                d.post(e, {
                  center: b.latitude + "," + b.longitude,
                  first_name: f.first_name,
                  gender: f.gender ? f.gender.toLowerCase() : null,
                  language: f.language || window.navigator.userLanguage || window.navigator.language,
                  last_name: f.last_name,
                  location: h.name,
                  provider: f.provider || "vamos",
                  timezone: (new Date).getTimezoneOffset() / -60,
                  uid: f.uid,
                  fid: f.fid,
                  user_email: f.user_email,
                  picture_url: f.picture_url,
                  user_pwd: Base64.encode(f.user_pwd)
                }).success(function(b) {
                  b.status && "ok" === b.status && b.user ? (f.setData(b.user), g("user_id", b.user.id, {
                    expires: 21
                  }), g("auth_token", b.user.auth_token, {
                    expires: 21
                  }), c(function() {
                    f.setUserData()
                  }), a.resolve({
                    status: "OK"
                  })) : a.resolve({
                    status: "ERROR",
                    error: b.error || "Whoops something went wrong..."
                  })
                })
              })
            })
          })
        }), a.promise
      },
      pushToEvents: function(a) {
        var b = this;
        if (b.events = b.events || [], !b.events.containsObject(a, "id")) {
          var c = l.getInstance(a);
          b.events.push(c)
        }
      },
      setData: function(a) {
        angular.extend(this, a)
      },
      setUserData: function() {
        var a = this;
        if (a.id && a.auth_token) {
          var b = new URITemplate(o.show).expand({
            id: a.id,
            auth_token: a.auth_token,
            timestamp: (new Date).unixTimestamp()
          });
          d.get(b).success(function(b) {
            "fail" === b.status ? a.logout() : (a.setData(b), a.getEvents())
          }).error(function(b) {
            h.error(b), a.logout()
          })
        }
      },
      removeEvent: function(a, d) {
        var e = b.defer(),
          f = this;
        return c(function() {
          f.DELETE("remove_event", {
            event_id: a.id,
            action_type: d
          }).then(function() {
            c(function() {
              f.removeEventFromEvents(a)
            }), e.resolve({
              status: "ok"
            })
          }, function() {
            e.resolve({
              status: "fail"
            })
          })
        }), e.promise
      },
      removeEventFromEvents: function(a) {
        for (var b = this.events || [], c = b.length - 1; c >= 0; c--)
          if (b[c].id === a.id) {
            b.splice(c, 1);
            break
          }
      },
      update: function(a) {
        var d = b.defer(),
          e = this;
        return c(function() {
          var b = ["picture_url"],
            c = null;
          if (a) e[a] && b.indexOf(a) > -1 && (c = c || {}, c[a] = e[a]);
          else {
            c = {};
            for (var f = b.length - 1; f >= 0; f--) c[b[f]] = e[b[f]]
          }
          c && e.PUT("update", c).then(function(a) {
            d.resolve(a)
          })
        }), d.promise
      }
    }, n
  }
]),

angular.module("vamosApp").factory("City", function() {
  function a(a) {
    a && this.setData(a)
  }
  return a.prototype = {
    setData: function(a) {
      angular.extend(this, a)
    },
    setName: function(a) {
      this.name = a
    },
    getName: function() {
      return this.name
    }
  }, a
}),

angular.module("vamosApp").factory("Instagram", ["$http", "$q", "ENV",
  function(a, b, c) {
    var d = {
      _apiEndpoint: "https://api.instagram.com/v1",
      _client_id: c.instagramClientId,
      _links: {
        instagramLocation: "/locations/{location_id}/media/recent?client_id={client_id}&callback=JSON_CALLBACK",
        hastag: "/tags/{hashtag}/media/recent?client_id={client_id}&callback=JSON_CALLBACK",
        search: "/media/search?client_id={client_id}{&lat,lng,max_timestamp,min_timestamp,distance}&callback=JSON_CALLBACK"
      },
      getInstagramHashtagImages: function(c) {
        var d = b.defer(),
          e = this,
          f = new URITemplate(e._apiEndpoint + e._links.hastag).expand({
            client_id: e._client_id,
            hashtag: c
          });
        return a.jsonp(f).success(function(a) {
          d.resolve(a)
        }).error(function() {
          d.resolve([])
        }), d.promise
      },
      getInstagramLocationImages: function(c) {
        var d = b.defer(),
          e = this,
          f = new URITemplate(e._apiEndpoint + e._links.instagramLocation).expand({
            client_id: e._client_id,
            location_id: c
          });
        return a.jsonp(f).success(function(a) {
          d.resolve(a)
        }).error(function() {
          d.resolve([])
        }), d.promise
      },
      apiUrlFor: function(a, b) {
        var c = this,
          d = new URITemplate(c._apiEndpoint + c._links[a]).expand(b);
        return d
      }
    };
    return d
  }
]),

angular.module("vamosApp").factory("Category", function() {
  function a(a) {
    a && this.setData(a)
  }
  return a.prototype = {
    setData: function(a) {
      angular.extend(this, a)
    },
    filter: !1,
    name: null
  }, a
}),

angular.module("vamosApp").factory("LocalStorage", ["ENV",
  function(a) {
    return {
      save: function(b, c, d) {
        if (!Modernizr.localstorage) return !1;
        var e = 60 * d * 1e3,
          f = {
            value: JSON.stringify(c),
            timestamp: (new Date).getTime() + e,
            version: a.ver
          };
        try {
          localStorage.setItem(b, JSON.stringify(f))
        } catch (g) {
          return Modernizr.localstorage || localStorage.clear(), !1
        }
        return c
      },
      load: function(b) {
        if (!Modernizr.localstorage) return !1;
        var c = JSON.parse(localStorage.getItem(b));
        if (!c) return !1;
        try {
          return (new Date).getTime() < c.timestamp && c.version === a.ver && JSON.parse(c.value)
        } catch (d) {
          return Modernizr.localstorage || localStorage.clear(), !1
        }
      },
      remove: function(a) {
        return Modernizr.localstorage ? localStorage.removeItem(a) : !1
      }
    }
  }
]),

angular.module("vamosApp").factory("Datepicker", function() {
  function a() {
    for (var a = this, b = Date.today(), c = {}, d = b.getTime() === Date.sun().getTime() ? Date.mon().add(-7).days() : Date.mon(), e = b.clone().add(a.daysEnabled).days(), f = d.clone().add(a.daysEnabled * a.weeksToShow).days(), g = 0; f > d;) {
      var h = new Date(d);
      h.enabled = h.between(b, e), c[g++] = h, d = d.add(1).days(), g % 7 === 0 && (a.weeks.push(c), c = {}, g = 0)
    }
  }
  return a.prototype = {
    daysEnabled: 7,
    weeksToShow: 3,
    weeks: [],
    setData: function(a) {
      angular.extend(this, a)
    }
  }, a
}),

angular.module("vamosApp").factory("aws", ["$window", "$q", "$timeout", "$http", "Api", "$log",
  function(a, b, c, d, e, f) {
    return {
      onFinishS3Put: function(a, b) {
        f.log("base.onFinishS3Put(), url", a), f.log("base.onFinishS3Put(), id", b)
      },
      onProgress: function(a, b) {
        f.log(a), f.log(b)
      },
      onError: function(a) {
        f.log("base.onError()", a)
      },
      createCORSRequest: function(a, b) {
        var c;
        return c = new XMLHttpRequest, null !== c.withCredentials ? c.open(a, b, !0) : "undefined" != typeof XDomainRequest ? (c = new XDomainRequest, c.open(a, b)) : c = null, c
      },
      executeOnSignedUrl: function(a, b) {
        var c = this;
        e.apiUrlFor("sign_s3_request", b).then(function(b) {
          d.get(b).success(function(b) {
            c.uploadToS3(a, decodeURIComponent(b.signed_request), b.url)
          }).error(function(a) {
            c.callback && c.callback({
              status: "fail",
              error: a
            })
          })
        })
      },
      uploadToS3: function(a, b, c) {
        var d = this,
          e = d.createCORSRequest("PUT", b);
        return e ? (e.onload = function() {
          return 200 === e.status ? (d.onProgress(100, "Upload completed."), d.callback && d.callback({
            status: "ok",
            url: c
          }), d.onFinishS3Put(c, d.s3_object_name)) : (d.callback && d.callback({
            status: "fail",
            error: e.status
          }), d.onError("Upload error: " + e.status))
        }, e.onerror = function() {
          return d.callback && d.callback({
            status: "fail",
            error: "XHR error."
          }), d.onError("XHR error.")
        }, e.upload.onprogress = function(a) {
          var b;
          return a.lengthComputable ? (b = Math.round(a.loaded / a.total * 100), d.onProgress(b, 100 === b ? "Finalizing." : "Uploading.")) : void 0
        }) : d.callback && d.callback({
          status: "fail",
          error: "CORS not supported"
        }), e.setRequestHeader("Content-Type", a.type), e.setRequestHeader("x-amz-acl", "public-read"), e.send(a)
      },
      uploadFile: function(a, b, c) {
        var d = this,
          e = {
            retina: !1
          };
        d.callback = c || null, d.executeOnSignedUrl(a, angular.extend(e, b))
      }
    }
  }
]),

angular.module("vamosApp").factory("Modal", ["$document", "$compile", "$rootScope", "$controller", "$timeout",
  function(a, b, c, d, e) {
    function f(f) {
      var g = this,
        h = {
          className: "",
          css: {},
          templateUrl: "/views/modal.html",
          overlay: !0,
          cancel: {
            fn: null
          }
        },
        i = a.find("body");
      if (f = angular.extend({}, h, f), f.templateUrl) {
        var j = '<div class="overlay" ng-click="$modalCancel();"></div>',
          k = '<div id="modal" class="modal" ng-class="\'' + f.className + "'\" ng-include=\"'" + f.templateUrl + "'\"></div>",
          l = angular.element(k),
          m = null;
        f.overlay && (m = angular.element(j));
        for (var n in f.css) l.css(n, f.css[n]);
        var o = function(a) {
          27 === a.keyCode && q.$modalCancel()
        };
        g.closeFn = function() {
          i.unbind("keydown", o), angular.element(document.querySelector("#modal")).remove(), m && m.remove()
        }, i.bind("keydown", o);
        var p, q = f.scope || c.$new();
        q.$modalClose = g.closeFn, q.$modalCancel = function() {
          var a = f.cancel.fn || g.closeFn;
          a.call(this), q.$modalClose()
        }, q.$modalSuccess = function() {
          var a = f.success.fn || g.closeFn;
          a.call(this), q.$modalClose()
        }, f.controller && (p = d(f.controller, {
          $scope: q
        }), l.contents().data("$ngControllerController", p)), b(l)(q), i.append(l), m && (b(m)(q), i.append(m)), e(function() {
          l.addClass("in")
        }, 200)
      }
    }
    return f.prototype = {}, f
  }
]),

angular.module("vamosApp").directive("loading", ["loading", "$compile",
  function(a, b) {
    return {
      restrict: "A",
      scope: {
        promises: "="
      },
      link: function(c, d) {
        var e, f, g = a();
        c.$watchCollection("promises", function(a) {
          if (e || (e = c.$new(), e.tracker = g), angular.equals(g.promises, a) || g.reset({
            promises: a,
            delay: 0,
            minDuration: 0
          }), c.$sthIsLoading = function() {
            return g.active()
          }, !f) {
            var h = '<div id="loading" class="animateOpacity asfasd ng-hide" ng-show="$sthIsLoading()" ng-animate><div class="overlay"></div><div class="close" ng-click="tracker.clearPromises();"><i class="icon icon-close"></i></div><div class="spinner ' + (Modernizr.cssanimations ? "" : "animationsNotSupported") + '"><div class="loadingLogo"><i class="icon icon-logo-filled"></i></div></div><div class="text">Loading</div></div>';
            f = b(h)(e), d.append(f)
          }
        })
      }
    }
  }
]),

angular.module("vamosApp").directive("vamos", function() {
  return {
    restrict: "A",
    templateUrl: "/views/vamos.html"
  }
}),

angular.module("vamosApp").directive("main", function() {
  return {
    restrict: "A",
    templateUrl: "/views/main.html"
  }
}),

angular.module("vamosApp").directive("header", function() {
  return {
    restrict: "A",
    templateUrl: "/views/header.html"
  }
}),

angular.module("vamosApp").directive("eventsList", function() {
  return {
    restrict: "A",
    templateUrl: "/views/eventslist.html"
  }
}),

angular.module("vamosApp").directive("Event", function() {
  return {
    restrict: "E",
    templateUrl: "/views/event.html"
  }
}),

angular.module("vamosApp").directive("listEvent", function() {
  return {
    restrict: "A",
    templateUrl: "/views/listevent.html",
    scope: {
      eventInstance: "=event",
      sort: "=",
      city: "=",
      responsive: "@",
      noDescription: "@"
    }
  }
}),

angular.module("vamosApp").directive("googlePopupMap", function() {
  return {
    restrict: "A",
    templateUrl: "/views/googlepopupmap.html"
  }
}),

angular.module("vamosApp").directive("infiniteScroll", function() {
  return {
    restrict: "A",
    link: function(a) {
      function b() {
        document.body.offsetHeight <= (document.body.scrollTop || document.documentElement.scrollTop) + document.documentElement.clientHeight + 300 && a.loadMore()
      }
      window.onscroll = b
    }
  }
}),

angular.module("vamosApp").directive("onFinishRender", function() {
  return {
    restrict: "A",
    link: function(a, b, c) {
      var d;
      a.$last && (d && clearTimeout(d), d = setTimeout(function() {
        a.$evalAsync(c.onFinishRender)
      }))
    }
  }
}),

angular.module("vamosApp").directive("datepicker", function() {
  return {
    restrict: "A",
    templateUrl: "/views/datepicker.html",
    compile: function(a, b) {
      if (!b.$attr.sort) {
        var c = a[0].getElementsByClassName("sort")[0];
        c.parentNode.removeChild(c)
      }
    }
  }
}),

angular.module("vamosApp").directive("facebookLoginModal", function() {
  return {
    restrict: "A",
    templateUrl: "/views/facebookloginmodal.html"
  }
}),

angular.module("vamosApp").directive("loginModal", function() {
  return {
    restrict: "A",
    templateUrl: "/views/loginmodal.html"
  }
}),

angular.module("vamosApp").directive("soundcloudPlayer", function() {
  return {
    restrict: "A",
    scope: {
      items: "="
    },
    link: function(a) {
      a.$watch("items", function(a) {
        a && a.length
      })
    }
  }
}),

angular.module("vamosApp").directive("scroll", ["$window", "$rootScope",
  function(a, b) {
    return {
      restrict: "A",
      link: function() {
        b.scrollTop = b.scrollTop || 0;
        var c, d = {
            red: "237, 74, 86",
            gray: "54, 54, 54"
          },
          e = d.red,
          f = angular.element(document.getElementById("header")),
          g = getWindowWidth(),
          h = function() {
            e = d[b.navColor] || d.red, f.css(b.scrollTop < 200 ? {
              backgroundColor: Modernizr.rgba ? "rgba(" + e + ", " + b.scrollTop / 200 + ")" : "rgb(" + e + ")"
            } : {
              backgroundColor: "rgb(" + e + ")"
            })
          },
          i = 0,
          j = 0,
          k = null,
          l = null,
          m = function() {
            l = document.getElementById("listRight"), l && (k = document.getElementsByClassName("coverImage")[0] || null, k && (i = document.getElementsByClassName("coverImage")[0].clientHeight, g > 767 && (j = i - b.scrollTop - 44, l.className = 0 >= j && document.body.offsetHeight > 1040 ? "fixed" : "")))
          },
          n = null,
          o = function() {
            if (n && n.length > 0)
              for (var a = n.length - 1; a >= 0; a--) n[a](b.scrollTop)
          };
        b.$watch("onScrollFunctions", function(a) {
          n = a
        }), angular.element(a).bind("scroll", function() {
          b.scrollTop = document.body.scrollTop || document.documentElement.scrollTop, document.body.offsetHeight < b.scrollTop + document.documentElement.clientHeight + 300 && b.$broadcast("user-scrolled-to-bottom"), h(), m(), c && clearTimeout(c), c = setTimeout(o, 200)
        })
      }
    }
  }
]),

angular.module("vamosApp").directive("infoMenu", function() {
  return {
    restrict: "A",
    templateUrl: "/views/infomenu.html"
  }
}),

angular.module("vamosApp").directive("venuesSearch", function() {
  return {
    restrict: "A",
    templateUrl: "/views/venuessearch.html"
  }
}),

angular.module("vamosApp").directive("listVenue", function() {
  return {
    restrict: "A",
    templateUrl: "/views/listvenue.html",
    scope: {
      venue: "=",
      user: "=",
      state: "=",
      action: "@"
    }
  }
}),

angular.module("vamosApp").directive("campaignsSlider", function() {
  return {
    restrict: "A",
    templateUrl: "/views/campaignsslider.html"
  }
}),

angular.module("vamosApp").controller("LocationNotFoundmodalCtrl", ["$rootScope", "$scope",
  function(a, b) {
    b.form = {}, b.submitSearch = function() {
      b.form.cityName ? (b.searchingForCity = !0, a.user.changeCity(b.form.cityName).then(function() {
        b.searchingForCity = !1, b.$modalCancel()
      })) : alert("You need to enter a city.")
    }
  }
]),

angular.module("vamosApp").filter("truncate", function() {
  return function(a, b, c) {
    return isNaN(b) && (b = 10), void 0 === c && (c = "..."), a.length <= b || a.length - c.length <= b ? a : String(a).substring(0, b - c.length) + c
  }
}),

angular.module("vamosApp").filter("EventsByCategory", function() {
  return function(a, b) {
    if (b.filter) {
      var c = [];
      return a && a.forEach(function(a) {
        a.category && "" !== a.category && a.category.toLowerCase() === b.name.toLowerCase() && c.push(a)
      }), c
    }
    return a
  }
});