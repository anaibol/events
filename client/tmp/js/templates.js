angular.module('wooepa-templates', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('404',
    '<!DOCTYPE html><html><head><base href="/"><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><meta name="viewport" content="width=device-width,initial-scale=1"><title></title><meta http-equiv="Content-type" content="text/html;charset=UTF-8"><meta name="keywords" content="Wooepa"><meta name="description" content="Wooepa"><meta name="fragment" content="!"><link href="/favicon.ico" rel="shortcut icon" type="image/x-icon"><meta property="fb:app_id" content="APP_ID"><meta property="og:description" content="Wooepa"><meta property="og:type" content="website"><meta property="og:url" content="http://wooepa.com"><meta property="og:image" content="APP_LOGO"><meta property="og:site_name" content="Wooepa"><meta property="fb:admins" content="APP_ADMIN"><meta name="msvalidate.01" content="741DD559CC819DECAF2AA49D92578598"><meta name="google-site-verification" content="w79q3QuneD2E21myOjjIUeCobYxg7Rpv_TBQsZ_Yh2M"><link rel="stylesheet" href="/css/app.min.css"><link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Ubuntu:300,400,500,400italic"><script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script><script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/plugins/ScrollToPlugin.min.js"></script></head><body id="{{$state.current.name.replace(\'.\', \'-\')}}"><header headroom tolerance="0" offset="0" scroller=".app-view" classes="{pinned:\'pinned\',unpinned:\'unpinned\',initial:\'headroom\'}"><nav role="navigation" ng-controller="HeaderCtrl" class="navbar navbar-inverse"><div class="container"><div class="navbar-header"><button type="button" ng-init="navCollapsed = true" ng-click="navCollapsed = !navCollapsed" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><i class="fa fa-bars"></i></button><a href="/" ui-sref="list" class="navbar-brand">Wooepa</a></div><div ng-class="{\'in\':!navCollapsed}" ng-click="navCollapsed=true" class="collapse navbar-collapse hidden-xs"><ul class="nav navbar-nav navbar-right"><li ng-if="$root.user" ng-cloak class="dropdown"><a href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="dropdown-toggle clear"><span class="thumb-sm avatar pull-right"><img src="{{ $root.user.facebook.picture }}" alt="{{ $root.user.facebook.name }}" class="img-circle"></span><span class="hidden-sm hidden-md">{{$root.user.facebook.name}}</span><b class="caret"></b></a><ul class="dropdown-menu animated fadeInRight w"><li><a ui-sref="app.page.profile" href="/me/events">My events</a></li><li class="divider"></li><li><a href="/auth/signout" target="_self" translate>Logout<i class="fa fa-sign-out"></i></a></li></ul></li><li ng-if="!$root.user" ng-cloak><a href="/auth/facebook" target="_self" translate class="login">Login</a></li></ul></div></div></nav></header><div class="banner"></div><div id="wrapper"><div ui-view class="container"></div></div><script type="text/javascript" src="/js/app.min.js"></script><script src="//localhost:35729/livereload.js"></script></body></html>');
  $templateCache.put('500',
    '<!DOCTYPE html><html><head><base href="/"><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><meta name="viewport" content="width=device-width,initial-scale=1"><title></title><meta http-equiv="Content-type" content="text/html;charset=UTF-8"><meta name="keywords" content="Wooepa"><meta name="description" content="Wooepa"><meta name="fragment" content="!"><link href="/favicon.ico" rel="shortcut icon" type="image/x-icon"><meta property="fb:app_id" content="APP_ID"><meta property="og:description" content="Wooepa"><meta property="og:type" content="website"><meta property="og:url" content="http://wooepa.com"><meta property="og:image" content="APP_LOGO"><meta property="og:site_name" content="Wooepa"><meta property="fb:admins" content="APP_ADMIN"><meta name="msvalidate.01" content="741DD559CC819DECAF2AA49D92578598"><meta name="google-site-verification" content="w79q3QuneD2E21myOjjIUeCobYxg7Rpv_TBQsZ_Yh2M"><link rel="stylesheet" href="/css/app.min.css"><link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Ubuntu:300,400,500,400italic"><script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script><script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/plugins/ScrollToPlugin.min.js"></script></head><body id="{{$state.current.name.replace(\'.\', \'-\')}}"><header headroom tolerance="0" offset="0" scroller=".app-view" classes="{pinned:\'pinned\',unpinned:\'unpinned\',initial:\'headroom\'}"><nav role="navigation" ng-controller="HeaderCtrl" class="navbar navbar-inverse"><div class="container"><div class="navbar-header"><button type="button" ng-init="navCollapsed = true" ng-click="navCollapsed = !navCollapsed" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><i class="fa fa-bars"></i></button><a href="/" ui-sref="list" class="navbar-brand">Wooepa</a></div><div ng-class="{\'in\':!navCollapsed}" ng-click="navCollapsed=true" class="collapse navbar-collapse hidden-xs"><ul class="nav navbar-nav navbar-right"><li ng-if="$root.user" ng-cloak class="dropdown"><a href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="dropdown-toggle clear"><span class="thumb-sm avatar pull-right"><img src="{{ $root.user.facebook.picture }}" alt="{{ $root.user.facebook.name }}" class="img-circle"></span><span class="hidden-sm hidden-md">{{$root.user.facebook.name}}</span><b class="caret"></b></a><ul class="dropdown-menu animated fadeInRight w"><li><a ui-sref="app.page.profile" href="/me/events">My events</a></li><li class="divider"></li><li><a href="/auth/signout" target="_self" translate>Logout<i class="fa fa-sign-out"></i></a></li></ul></li><li ng-if="!$root.user" ng-cloak><a href="/auth/facebook" target="_self" translate class="login">Login</a></li></ul></div></div></nav></header><div class="banner"></div><div id="wrapper"><div ui-view class="container"></div></div><script type="text/javascript" src="/js/app.min.js"></script><script src="//localhost:35729/livereload.js"></script></body></html>');
  $templateCache.put('head',
    '<head><base href="/"><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><meta name="viewport" content="width=device-width,initial-scale=1"><title></title><meta http-equiv="Content-type" content="text/html;charset=UTF-8"><meta name="keywords" content="Wooepa"><meta name="description" content="Wooepa"><meta name="fragment" content="!"><link href="/favicon.ico" rel="shortcut icon" type="image/x-icon"><meta property="fb:app_id" content="APP_ID"><meta property="og:description" content="Wooepa"><meta property="og:type" content="website"><meta property="og:url" content="http://wooepa.com"><meta property="og:image" content="APP_LOGO"><meta property="og:site_name" content="Wooepa"><meta property="fb:admins" content="APP_ADMIN"><meta name="msvalidate.01" content="741DD559CC819DECAF2AA49D92578598"><meta name="google-site-verification" content="w79q3QuneD2E21myOjjIUeCobYxg7Rpv_TBQsZ_Yh2M"><link rel="stylesheet" href="/css/app.min.css"><link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Ubuntu:300,400,500,400italic"><script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script><script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/plugins/ScrollToPlugin.min.js"></script></head>');
  $templateCache.put('header',
    '<header headroom tolerance="0" offset="0" scroller=".app-view" classes="{pinned:\'pinned\',unpinned:\'unpinned\',initial:\'headroom\'}"><nav role="navigation" ng-controller="HeaderCtrl" class="navbar navbar-inverse"><div class="container"><div class="navbar-header"><button type="button" ng-init="navCollapsed = true" ng-click="navCollapsed = !navCollapsed" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><i class="fa fa-bars"></i></button><a href="/" ui-sref="list" class="navbar-brand">Wooepa</a></div><div ng-class="{\'in\':!navCollapsed}" ng-click="navCollapsed=true" class="collapse navbar-collapse hidden-xs"><ul class="nav navbar-nav navbar-right"><li ng-if="$root.user" ng-cloak class="dropdown"><a href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="dropdown-toggle clear"><span class="thumb-sm avatar pull-right"><img src="{{ $root.user.facebook.picture }}" alt="{{ $root.user.facebook.name }}" class="img-circle"></span><span class="hidden-sm hidden-md">{{$root.user.facebook.name}}</span><b class="caret"></b></a><ul class="dropdown-menu animated fadeInRight w"><li><a ui-sref="app.page.profile" href="/me/events">My events</a></li><li class="divider"></li><li><a href="/auth/signout" target="_self" translate>Logout<i class="fa fa-sign-out"></i></a></li></ul></li><li ng-if="!$root.user" ng-cloak><a href="/auth/facebook" target="_self" translate class="login">Login</a></li></ul></div></div></nav></header>');
  $templateCache.put('index',
    '<!DOCTYPE html><html><head><base href="/"><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><meta name="viewport" content="width=device-width,initial-scale=1"><title></title><meta http-equiv="Content-type" content="text/html;charset=UTF-8"><meta name="keywords" content="Wooepa"><meta name="description" content="Wooepa"><meta name="fragment" content="!"><link href="/favicon.ico" rel="shortcut icon" type="image/x-icon"><meta property="fb:app_id" content="APP_ID"><meta property="og:description" content="Wooepa"><meta property="og:type" content="website"><meta property="og:url" content="http://wooepa.com"><meta property="og:image" content="APP_LOGO"><meta property="og:site_name" content="Wooepa"><meta property="fb:admins" content="APP_ADMIN"><meta name="msvalidate.01" content="741DD559CC819DECAF2AA49D92578598"><meta name="google-site-verification" content="w79q3QuneD2E21myOjjIUeCobYxg7Rpv_TBQsZ_Yh2M"><link rel="stylesheet" href="/css/app.min.css"><link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Ubuntu:300,400,500,400italic"><script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script><script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/plugins/ScrollToPlugin.min.js"></script></head><body id="{{$state.current.name.replace(\'.\', \'-\')}}"><header headroom tolerance="0" offset="0" scroller=".app-view" classes="{pinned:\'pinned\',unpinned:\'unpinned\',initial:\'headroom\'}"><nav role="navigation" ng-controller="HeaderCtrl" class="navbar navbar-inverse"><div class="container"><div class="navbar-header"><button type="button" ng-init="navCollapsed = true" ng-click="navCollapsed = !navCollapsed" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><i class="fa fa-bars"></i></button><a href="/" ui-sref="list" class="navbar-brand">Wooepa</a></div><div ng-class="{\'in\':!navCollapsed}" ng-click="navCollapsed=true" class="collapse navbar-collapse hidden-xs"><ul class="nav navbar-nav navbar-right"><li ng-if="$root.user" ng-cloak class="dropdown"><a href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="dropdown-toggle clear"><span class="thumb-sm avatar pull-right"><img src="{{ $root.user.facebook.picture }}" alt="{{ $root.user.facebook.name }}" class="img-circle"></span><span class="hidden-sm hidden-md">{{$root.user.facebook.name}}</span><b class="caret"></b></a><ul class="dropdown-menu animated fadeInRight w"><li><a ui-sref="app.page.profile" href="/me/events">My events</a></li><li class="divider"></li><li><a href="/auth/signout" target="_self" translate>Logout<i class="fa fa-sign-out"></i></a></li></ul></li><li ng-if="!$root.user" ng-cloak><a href="/auth/facebook" target="_self" translate class="login">Login</a></li></ul></div></div></nav></header><div class="banner"></div><div id="wrapper"><div ui-view class="container"></div></div><script type="text/javascript" src="/js/app.min.js"></script><script>window.user = ;\n' +
    'window.fbAppId = ;\n' +
    '//window.events = ;</script><script src="//localhost:35729/livereload.js"></script></body></html>');
  $templateCache.put('layout',
    '<!DOCTYPE html><html><head><base href="/"><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><meta name="viewport" content="width=device-width,initial-scale=1"><title></title><meta http-equiv="Content-type" content="text/html;charset=UTF-8"><meta name="keywords" content="Wooepa"><meta name="description" content="Wooepa"><meta name="fragment" content="!"><link href="/favicon.ico" rel="shortcut icon" type="image/x-icon"><meta property="fb:app_id" content="APP_ID"><meta property="og:description" content="Wooepa"><meta property="og:type" content="website"><meta property="og:url" content="http://wooepa.com"><meta property="og:image" content="APP_LOGO"><meta property="og:site_name" content="Wooepa"><meta property="fb:admins" content="APP_ADMIN"><meta name="msvalidate.01" content="741DD559CC819DECAF2AA49D92578598"><meta name="google-site-verification" content="w79q3QuneD2E21myOjjIUeCobYxg7Rpv_TBQsZ_Yh2M"><link rel="stylesheet" href="/css/app.min.css"><link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Ubuntu:300,400,500,400italic"><script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script><script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/plugins/ScrollToPlugin.min.js"></script></head><body id="{{$state.current.name.replace(\'.\', \'-\')}}"><header headroom tolerance="0" offset="0" scroller=".app-view" classes="{pinned:\'pinned\',unpinned:\'unpinned\',initial:\'headroom\'}"><nav role="navigation" ng-controller="HeaderCtrl" class="navbar navbar-inverse"><div class="container"><div class="navbar-header"><button type="button" ng-init="navCollapsed = true" ng-click="navCollapsed = !navCollapsed" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><i class="fa fa-bars"></i></button><a href="/" ui-sref="list" class="navbar-brand">Wooepa</a></div><div ng-class="{\'in\':!navCollapsed}" ng-click="navCollapsed=true" class="collapse navbar-collapse hidden-xs"><ul class="nav navbar-nav navbar-right"><li ng-if="$root.user" ng-cloak class="dropdown"><a href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="dropdown-toggle clear"><span class="thumb-sm avatar pull-right"><img src="{{ $root.user.facebook.picture }}" alt="{{ $root.user.facebook.name }}" class="img-circle"></span><span class="hidden-sm hidden-md">{{$root.user.facebook.name}}</span><b class="caret"></b></a><ul class="dropdown-menu animated fadeInRight w"><li><a ui-sref="app.page.profile" href="/me/events">My events</a></li><li class="divider"></li><li><a href="/auth/signout" target="_self" translate>Logout<i class="fa fa-sign-out"></i></a></li></ul></li><li ng-if="!$root.user" ng-cloak><a href="/auth/facebook" target="_self" translate class="login">Login</a></li></ul></div></div></nav></header><div class="banner"></div><div id="wrapper"><div ui-view class="container"></div></div><script type="text/javascript" src="/js/app.min.js"></script><script src="//localhost:35729/livereload.js"></script></body></html>');
  $templateCache.put('event/list',
    '<section id="list" infinite-scroll="getMore()" infinite-scroll-distance="1" infinite-scroll-immediate-check="false" ng-show="$state.current.name === \'list\'" ng-if="$root.renderList"><div id="mobile-bar" class="visible-xs"><a href="#" ng-click="mobileSortList = !mobileSortList">Sorting: Suggested<i class="fa fa-chevron-down"></i></a><ul ng-show="mobileSortList" ng-click="mobileSortList = !mobileSortList"><li><a href="#" ui-sref="list({sortBy: \'popularity\'})">Popularity</a></li><li><a href="#" ui-sref="list({sortBy: \'\'})">Date</a></li></ul></div><section id="sidebar" style="margin-top:66px" ng-controller="SidebarCtrl" class="hidden-xs col-sm-2 col-md-2 col-lg-2"><ul class="nav navbar-nav"><li><form role="search" ng-controller="LocationpickerCtrl" class="navbar-form"><div class="input-group"><input type="text" placeholder="Type a city or location" typeahead="address.formatted_address for address in getLocation($viewValue)" typeahead-on-select="onSelect($item, $model, $label)" ng-model="locationSelected" class="search form-control"><div class="input-group-btn"><button type="submit" class="btn btn-inverse"><i class="fa fa-search"></i></button></div></div></form></li><li><a href="#" ng-click="isCollapsed = !isCollapsed" class="accordion-toggle"><i class="fa fa-bar-chart-o"></i>Sort by<i ng-class="{\'fa-chevron-right\': isCollapsed, \'fa-chevron-down\': !isCollapsed}" class="pull-right fa"></i></a><ul collapse="isCollapsed" class="nav nav-collapse"><li><a href="#" ui-sref="list({sortBy: \'popularity\'})">Popularity</a></li><li><a href="#" ui-sref="list({sortBy: \'\'})">Date</a></li></ul></li><li><a href="#">Today</a></li><li ng-if="today.getTime() === Date.sun().getTime()"><a href="#">This weekend</a></li><li ng-if="today.getTime() !== Date.sun().getTime()"><a href="#">Next weekend</a></li><li class="hidden-xs hidden-sm hidden-md hidden-lg"><a href="#" ng-click="isCollapsed = !isCollapsed" class="accordion-toggle"><i class="fa fa-calendar"></i>Specific date</a><ul collapse="isCollapsed" class="nav nav-collapse"><li><div class="date"><datepicker ng-change="$state.go(\'list\', {since: getStringDate(date)})" ng-model="date" show-weeks="false"></datepicker></div></li></ul></li><li><a href="#">Explore by category</a><div class="tags"><div class="tag-list"><a ng-repeat="tag in tags" ui-sref="list({tags: [tag]})" class="tag {{tag}}">{{tag}}</a></div></div></li></ul></section><div class="events col-xs-12 col-sm-10 col-md-10 col-lg-10"><div ng-repeat="ev in events" id="{{$index}}" isotope ui-sref="list.view({slug: ev.slug, eid: ev.eid})" class="wrapper col-xs-12 col-sm-6 col-md-4 col-lg-3"><div adaptive-background class="event"><div class="top"><!--a(ui-sref="list.view({slug: ev.slug, eid: ev.eid})").title.truncate {{ev.name}}--></div><!-- .tag-list//  span.tag(ng-repeat="tag in ev.tags", ng-if="$index < 3", class="{{tag}}", ng-click="openTag($event, ev)") {{tag}}--><div class="image-container"><img ng-src="{{ev.pic_cover.source}}" class="hidden"><div ng-if="ev.pic_cover.source" ng-style="{\'background-image\': \'url({{ev.pic_cover.source}})\'}" class="image"><div ng-if="ev.price.num === 0" class="ribbon-wrapper-green"><div class="ribbon-green">{{ev.price.full}}</div></div><img ng-src="{{ev.pic_cover.source}}"></div></div><div class="bottom"><span class="datetime"><span class="date"><i class="fa fa-clock-o"></i><span>{{ev.start_time}}</span></span></span><div ng-if="ev.attending_count &gt; 0" ev.attending_count="ev.attending_count" class="attending pull-right"><i class="fa fa-group"></i><span>{{ev.attending_count}}</span></div><div class="place-info"><div ng-if="ev.price" class="user price pull-right">{{ev.price.full}}</div><div ng-click="openMap($event, ev)" ng-if="ev.location" class="span place"><i class="fa fa-map-marker"></i><span class="location">{{\' \' + ev.location | characters:20}}{{ev.location && ev.venue.city ? \', \' + ev.venue.city : \'\'}}</span></div></div></div></div></div></div></section><ui-view></ui-view>');
  $templateCache.put('event/mobile-bar',
    '<div id="mobile-bar" class="visible-xs"><a href="#" ng-click="mobileSortList = !mobileSortList">Sorting: Suggested<i class="fa fa-chevron-down"></i></a><ul ng-show="mobileSortList" ng-click="mobileSortList = !mobileSortList"><li><a href="#" ui-sref="list({sortBy: \'popularity\'})">Popularity</a></li><li><a href="#" ui-sref="list({sortBy: \'\'})">Date</a></li></ul></div>');
  $templateCache.put('event/promote_form',
    '<form class="event-form form-horizontal"><div class="modal-header">Event Promotion<div class="modal-body"><div class="control-group"><label class="control-label">Reward</label><input id="reward" required="required" type="text" ng-model="ev.promotion.reward" placeholder="Reward for the game" class="form-control"></div><div class="control-group date"><label class="control-label">Date of end of the game</label></div><div ng-controller="DatepickerCtrl" class="input-group"><input id="datepick" size="50" type="text"><script type="text/javascript">new datepickr(\'datepick\');</script><label class="control-label">End Time<input type="text"></label></div><div class="control-group"><label class="control-label">Commentary</label><textarea id="description" required="required" ng-model="ev.promotion.commentary" cols="30" rows="5" placeholder="Content" class="form-control"></textarea><input type="hidden" name="in_promotion" ng-model="ev.in_promotion" value="value"></div></div><div class="modal-footer"><button ng-click\'submit() class="btn btn-primary"><i class="fui-check"></i>OK</button><button ng-click="cancel()" class="btn btn-warning"><i class="fui-cross"></i>Cancel</button></div></div></form>');
  $templateCache.put('event/sidebar',
    '<section id="sidebar" style="margin-top:66px" ng-controller="SidebarCtrl" class="hidden-xs col-sm-2 col-md-2 col-lg-2"><ul class="nav navbar-nav"><li><form role="search" ng-controller="LocationpickerCtrl" class="navbar-form"><div class="input-group"><input type="text" placeholder="Type a city or location" typeahead="address.formatted_address for address in getLocation($viewValue)" typeahead-on-select="onSelect($item, $model, $label)" ng-model="locationSelected" class="search form-control"><div class="input-group-btn"><button type="submit" class="btn btn-inverse"><i class="fa fa-search"></i></button></div></div></form></li><li><a href="#" ng-click="isCollapsed = !isCollapsed" class="accordion-toggle"><i class="fa fa-bar-chart-o"></i>Sort by<i ng-class="{\'fa-chevron-right\': isCollapsed, \'fa-chevron-down\': !isCollapsed}" class="pull-right fa"></i></a><ul collapse="isCollapsed" class="nav nav-collapse"><li><a href="#" ui-sref="list({sortBy: \'popularity\'})">Popularity</a></li><li><a href="#" ui-sref="list({sortBy: \'\'})">Date</a></li></ul></li><li><a href="#">Today</a></li><li ng-if="today.getTime() === Date.sun().getTime()"><a href="#">This weekend</a></li><li ng-if="today.getTime() !== Date.sun().getTime()"><a href="#">Next weekend</a></li><li class="hidden-xs hidden-sm hidden-md hidden-lg"><a href="#" ng-click="isCollapsed = !isCollapsed" class="accordion-toggle"><i class="fa fa-calendar"></i>Specific date</a><ul collapse="isCollapsed" class="nav nav-collapse"><li><div class="date"><datepicker ng-change="$state.go(\'list\', {since: getStringDate(date)})" ng-model="date" show-weeks="false"></datepicker></div></li></ul></li><li><a href="#">Explore by category</a><div class="tags"><div class="tag-list"><a ng-repeat="tag in tags" ui-sref="list({tags: [tag]})" class="tag {{tag}}">{{tag}}</a></div></div></li></ul></section>');
  $templateCache.put('event/view',
    '<section class="event-view"><div class="container"><img src="{{ev.pic_cover.source}}" class="hidden"><div class="bg-container"><div style="background-image: url({{ev.pic_cover.source}});" class="bg-image"></div><h3 class="title truncate">{{ev.name}}</h3></div><a ui-sref="promote({eid: ev.eid})" class="event">Promote event</a><a target="_blank" ng-href="https://www.facebook.com/events/{{ev.eid}}/" class="facebook-link">Facebook event</a><div class="tag-list"><span ng-repeat="tag in ev.tags" ng-if="$index &lt; 3" class="tag {{tag}}">{{tag}}</span></div><div class="title"><div class="attending">{{ev.attending_count}}<i class="icon-group"></i></div><div class="price">{{ev.price.full}}</div></div><div class="info"><a href="https://maps.google.com/maps?q={{ev.location + \' \' + ev.venue.street + \' \' + ev.venue.city + \' \' + ev.venue.country}}" target="_blank"><div ng-if="ev.location" class="place"><i class="fa fa-map-marker"></i>{{ev.location}}</div></a>{{ev.venue.street}}{{ev.venue.street && ev.venue.city ? \', \' : \'\'}}{{ev.venue.city}}{{ev.venue.city && ev.venue.country ? \', \' : \'\'}} {{ev.venue.country}}</div><div class="datetime"><span class="date"><i class="fa fa-calendar"></i><span>{{ev.start_time | amDateFormat:\'D MMM\'}} </span></span><span class="time"><i class="fa fa-clock-o"></i><span>{{ev.start_time | amDateFormat:"LT"}}</span><span>{{ev.start_time | amCalendar}}</span></span></div><div class="row"><div class="col-md-8"><p ng-bind-html="ev.description | linky" class="description"></p></div><div class="col-md-4"><div class="event-buttons wdiv padding-10"><div class="event-rsvp-btns"><button set-attendings class="btn">{{attending}}</button></div><div class="event-rsvp-btns"><button friend-selector class="btn">Invite your friends !</button></div><div class="event-rsvp-btns"><button share-event class="btn">Share with your friends?</button></div></div><div ng-hide="isInPromotion()" ng-if="ev.in_promotion" class="event-buttons wdiv padding-10"><div ng-repeat="player in ev.list_event_players | orderBy:\'-result\' | filter:search" ng-if="ng-if" class="alert alert-success"></div></div><div ng-if="ev.in_promotion &amp;&amp; isInPromotion()" class="wdiv padding-10"><div class="panel panel-success"><div class="panel-heading">Game Active</div><div class="panel-body"><ul ng-if="ev.promoter" class="list-group"><li ng-if="!ev.promoter" class="list-group-item"><img ng-src="{{ ev.promoter.facebook.picture }}" ng-alt="{{ev.promoter.name}}" class="img-circle">{{ ev.promoter.name }}</li><li class="list-group-item">{{ev.promotion.reward}}</li><li class="list-group-item">End:<strong>{{ev.promotion.end_time | date:\'mediumDate\'}} at {{ev.promotion.end_time | date:\'shortTime\'}}</strong></li></ul></div></div></div><div class="wdiv padding-10"><div class="panel panel-default"><div class="panel-heading">Players</div><div class="panel-body"><p list-event-player ng-hide="ev.list_event_players">No Players yet !</p><ul class="list-group"><input type="text" ng-model="search.name" class="form-control input-sm"><hr><li ng-repeat="player in ev.list_event_players" class="list-group-item"><img ng-src="{{&quot;http://graph.facebook.com/&quot; + player.uid + &quot;/picture?type=square&quot;}}" ng-alt="{{player.name}}" class="img-circle">{{ player.result }} pts<button boost-player class="btn">Boost<i-fa-fa-flash></i-fa-fa-flash></button></li><li ng-repeat="player in ev.list_event_players | orderBy:\'-result\' | filter:search" ng-if="player.facebook.id != ev.player_id" class="list-group-item"><img ng-src="{{&quot;http://graph.facebook.com/&quot; + player.uid + &quot;/picture?type=square&quot;}}" ng-alt="{{player.name}}" class="img-circle">{{ player.result }} pts<button class="btn">Boost<i-fa-fa-flash>      </i-fa-fa-flash></button></li></ul></div></div></div></div></div><div class="row"><br><div ng-repeat="vidz in videos" style="float:left" class="span"><object type="text/html" data="{{vidz}}" style="width:320px;height:240px;"></object></div><div ng-repeat="pics in fbpics" style="margin-top:5px;margin-left:50px;display:inline;" class="span"><a href="{{pics.source}}"><img ng-src="{{pics.source}}" style="width:13%;"></a></div><div style="width:20%;float:left;display:inline;" ng-repeat="image in instagramPhotos" class="span"><a href="{{image.images.standard_resolution.url}}"><img ng-src="{{image.images.low_resolution.url}}"></a></div></div></div></section>');
}]);
