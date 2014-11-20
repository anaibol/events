angular.module('wooepa-templates', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('404',
    '<!DOCTYPE html><html><head><base href="/"><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><meta name="viewport" content="width=device-width,initial-scale=1"><title></title><meta http-equiv="Content-type" content="text/html;charset=UTF-8"><meta name="keywords" content="Wooepa"><meta name="description" content="Wooepa"><meta name="fragment" content="!"><link href="/favicon.ico" rel="shortcut icon" type="image/x-icon"><meta property="fb:app_id" content="APP_ID"><meta property="og:description" content="Wooepa"><meta property="og:type" content="website"><meta property="og:url" content="http://wooepa.com"><meta property="og:image" content="APP_LOGO"><meta property="og:site_name" content="Wooepa"><meta property="fb:admins" content="APP_ADMIN"><meta name="msvalidate.01" content="741DD559CC819DECAF2AA49D92578598"><meta name="google-site-verification" content="w79q3QuneD2E21myOjjIUeCobYxg7Rpv_TBQsZ_Yh2M"><link rel="stylesheet" href="/css/app.min.css"><link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Ubuntu:300,400,500,400italic"><script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script><script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/plugins/ScrollToPlugin.min.js"></script></head><body id="{{$state.current.name.replace(\'.\', \'-\')}}"><div class="container-fluid"><header headroom tolerance="0" offset="0" scroller=".app-view" classes="{pinned:\'pinned\',unpinned:\'unpinned\',initial:\'headroom\'}"><nav role="navigation" ng-controller="HeaderCtrl" class="navbar navbar-inverse"><div class="container"><div class="navbar-header"><a href="/" ui-sref="list" class="navbar-brand">Wooepa</a><button type="button" ng-init="navCollapsed = true" ng-click="navCollapsed = !navCollapsed" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><i class="fa fa-bars"></i></button><ul class="nav navbar-nav navbar-right"><li ng-if="$root.user" ng-cloak class="dropdown"><a href="#" class="dropdown-toggle"><span class="avatar pull-right"><img src="{{ $root.user.facebook.picture }}" alt="{{ $root.user.facebook.name }}" class="img-circle"></span><span class="hidden-xs hidden-sm hidden-md">{{$root.user.facebook.name}}</span><i class="fa fa-chevron-down"></i></a><ul class="dropdown-menu"><li><a ui-sref="app.page.profile" href="/me/events">My events</a></li><li class="divider"></li><li><a href="/auth/signout" target="_self" translate>Logout<i class="fa fa-sign-out"></i></a></li></ul></li><li ng-if="!$root.user" ng-cloak><a href="/auth/facebook" target="_self" translate class="login">Login</a></li></ul></div></div></nav></header><div id="menu" ng-class="{\'in\':!navCollapsed}" class="navbar-collapse collapse"><ul class="nav navbar-nav visible-xs"><li class="search"><form class="navbar-form"><div class="form-control-wrapper"><i class="fa fa-search"></i><input type="text" placeholder="Type a city or location" typeahead="address.formatted_address for address in getLocation($viewValue)" typeahead-on-select="onSelect($item, $model, $label)" ng-model="locationSelected" ng-controller="LocationpickerCtrl" class="form-control col-lg-8"></div></form></li><li class="sort"><a href="#" ng-click="isCollapsed = !isCollapsed"><i class="fa fa-bar-chart-o"></i>Sort by<i ng-class="{\'fa-chevron-right\': isCollapsed, \'fa-chevron-down\': !isCollapsed}" class="pull-right fa"></i></a><ul collapse="isCollapsed" class="nav nav-collapse"><li><a href="#" ui-sref="list({sortBy: \'proximity\'})"><i class="fa fa-map-marker"> </i>Proximity</a></li><li><a href="#" ui-sref="list({sortBy: \'popularity\'})"><i class="fa fa-group"> </i>Popularity</a></li><li><a href="#" ui-sref="list({sortBy: \'\'})"><i class="fa fa-calendar"></i>Date</a></li></ul></li><li class="today"><a href="#"><i class="fa fa-calendar"></i>Today</a></li><li ng-if="today.getTime() === Date.sun().getTime()"><a href="#"><i class="fa fa-calendar"></i>This weekend</a></li><li ng-if="today.getTime() !== Date.sun().getTime()"><a href="#"><i class="fa fa-calendar"></i>Next weekend</a></li><li class="datepicker"><input type="date" ng-change="$state.go(\'list\', {since: getStringDate(date)})" ng-model="date"></li><li class="tags">Explore by category<div class="tag-list"><a ng-repeat="tag in tags" ui-sref="list({tags: [tag]})" class="tag {{tag}}">{{tag}}</a></div></li></ul></div><div class="banner"></div><div id="wrapper"><div ui-view class="container-fluid"></div></div><script type="text/javascript" src="/js/app.min.js"></script><script src="//localhost:35729/livereload.js"></script></div></body></html>');
  $templateCache.put('500',
    '<!DOCTYPE html><html><head><base href="/"><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><meta name="viewport" content="width=device-width,initial-scale=1"><title></title><meta http-equiv="Content-type" content="text/html;charset=UTF-8"><meta name="keywords" content="Wooepa"><meta name="description" content="Wooepa"><meta name="fragment" content="!"><link href="/favicon.ico" rel="shortcut icon" type="image/x-icon"><meta property="fb:app_id" content="APP_ID"><meta property="og:description" content="Wooepa"><meta property="og:type" content="website"><meta property="og:url" content="http://wooepa.com"><meta property="og:image" content="APP_LOGO"><meta property="og:site_name" content="Wooepa"><meta property="fb:admins" content="APP_ADMIN"><meta name="msvalidate.01" content="741DD559CC819DECAF2AA49D92578598"><meta name="google-site-verification" content="w79q3QuneD2E21myOjjIUeCobYxg7Rpv_TBQsZ_Yh2M"><link rel="stylesheet" href="/css/app.min.css"><link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Ubuntu:300,400,500,400italic"><script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script><script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/plugins/ScrollToPlugin.min.js"></script></head><body id="{{$state.current.name.replace(\'.\', \'-\')}}"><div class="container-fluid"><header headroom tolerance="0" offset="0" scroller=".app-view" classes="{pinned:\'pinned\',unpinned:\'unpinned\',initial:\'headroom\'}"><nav role="navigation" ng-controller="HeaderCtrl" class="navbar navbar-inverse"><div class="container"><div class="navbar-header"><a href="/" ui-sref="list" class="navbar-brand">Wooepa</a><button type="button" ng-init="navCollapsed = true" ng-click="navCollapsed = !navCollapsed" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><i class="fa fa-bars"></i></button><ul class="nav navbar-nav navbar-right"><li ng-if="$root.user" ng-cloak class="dropdown"><a href="#" class="dropdown-toggle"><span class="avatar pull-right"><img src="{{ $root.user.facebook.picture }}" alt="{{ $root.user.facebook.name }}" class="img-circle"></span><span class="hidden-xs hidden-sm hidden-md">{{$root.user.facebook.name}}</span><i class="fa fa-chevron-down"></i></a><ul class="dropdown-menu"><li><a ui-sref="app.page.profile" href="/me/events">My events</a></li><li class="divider"></li><li><a href="/auth/signout" target="_self" translate>Logout<i class="fa fa-sign-out"></i></a></li></ul></li><li ng-if="!$root.user" ng-cloak><a href="/auth/facebook" target="_self" translate class="login">Login</a></li></ul></div></div></nav></header><div id="menu" ng-class="{\'in\':!navCollapsed}" class="navbar-collapse collapse"><ul class="nav navbar-nav visible-xs"><li class="search"><form class="navbar-form"><div class="form-control-wrapper"><i class="fa fa-search"></i><input type="text" placeholder="Type a city or location" typeahead="address.formatted_address for address in getLocation($viewValue)" typeahead-on-select="onSelect($item, $model, $label)" ng-model="locationSelected" ng-controller="LocationpickerCtrl" class="form-control col-lg-8"></div></form></li><li class="sort"><a href="#" ng-click="isCollapsed = !isCollapsed"><i class="fa fa-bar-chart-o"></i>Sort by<i ng-class="{\'fa-chevron-right\': isCollapsed, \'fa-chevron-down\': !isCollapsed}" class="pull-right fa"></i></a><ul collapse="isCollapsed" class="nav nav-collapse"><li><a href="#" ui-sref="list({sortBy: \'proximity\'})"><i class="fa fa-map-marker"> </i>Proximity</a></li><li><a href="#" ui-sref="list({sortBy: \'popularity\'})"><i class="fa fa-group"> </i>Popularity</a></li><li><a href="#" ui-sref="list({sortBy: \'\'})"><i class="fa fa-calendar"></i>Date</a></li></ul></li><li class="today"><a href="#"><i class="fa fa-calendar"></i>Today</a></li><li ng-if="today.getTime() === Date.sun().getTime()"><a href="#"><i class="fa fa-calendar"></i>This weekend</a></li><li ng-if="today.getTime() !== Date.sun().getTime()"><a href="#"><i class="fa fa-calendar"></i>Next weekend</a></li><li class="datepicker"><input type="date" ng-change="$state.go(\'list\', {since: getStringDate(date)})" ng-model="date"></li><li class="tags">Explore by category<div class="tag-list"><a ng-repeat="tag in tags" ui-sref="list({tags: [tag]})" class="tag {{tag}}">{{tag}}</a></div></li></ul></div><div class="banner"></div><div id="wrapper"><div ui-view class="container-fluid"></div></div><script type="text/javascript" src="/js/app.min.js"></script><script src="//localhost:35729/livereload.js"></script></div></body></html>');
  $templateCache.put('head',
    '<head><base href="/"><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><meta name="viewport" content="width=device-width,initial-scale=1"><title></title><meta http-equiv="Content-type" content="text/html;charset=UTF-8"><meta name="keywords" content="Wooepa"><meta name="description" content="Wooepa"><meta name="fragment" content="!"><link href="/favicon.ico" rel="shortcut icon" type="image/x-icon"><meta property="fb:app_id" content="APP_ID"><meta property="og:description" content="Wooepa"><meta property="og:type" content="website"><meta property="og:url" content="http://wooepa.com"><meta property="og:image" content="APP_LOGO"><meta property="og:site_name" content="Wooepa"><meta property="fb:admins" content="APP_ADMIN"><meta name="msvalidate.01" content="741DD559CC819DECAF2AA49D92578598"><meta name="google-site-verification" content="w79q3QuneD2E21myOjjIUeCobYxg7Rpv_TBQsZ_Yh2M"><link rel="stylesheet" href="/css/app.min.css"><link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Ubuntu:300,400,500,400italic"><script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script><script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/plugins/ScrollToPlugin.min.js"></script></head>');
  $templateCache.put('header',
    '<header headroom tolerance="0" offset="0" scroller=".app-view" classes="{pinned:\'pinned\',unpinned:\'unpinned\',initial:\'headroom\'}"><nav role="navigation" ng-controller="HeaderCtrl" class="navbar navbar-inverse"><div class="container"><div class="navbar-header"><a href="/" ui-sref="list" class="navbar-brand">Wooepa</a><button type="button" ng-init="navCollapsed = true" ng-click="navCollapsed = !navCollapsed" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><i class="fa fa-bars"></i></button><ul class="nav navbar-nav navbar-right"><li ng-if="$root.user" ng-cloak class="dropdown"><a href="#" class="dropdown-toggle"><span class="avatar pull-right"><img src="{{ $root.user.facebook.picture }}" alt="{{ $root.user.facebook.name }}" class="img-circle"></span><span class="hidden-xs hidden-sm hidden-md">{{$root.user.facebook.name}}</span><i class="fa fa-chevron-down"></i></a><ul class="dropdown-menu"><li><a ui-sref="app.page.profile" href="/me/events">My events</a></li><li class="divider"></li><li><a href="/auth/signout" target="_self" translate>Logout<i class="fa fa-sign-out"></i></a></li></ul></li><li ng-if="!$root.user" ng-cloak><a href="/auth/facebook" target="_self" translate class="login">Login</a></li></ul></div></div></nav></header>');
  $templateCache.put('index',
    '<!DOCTYPE html><html><head><base href="/"><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><meta name="viewport" content="width=device-width,initial-scale=1"><title></title><meta http-equiv="Content-type" content="text/html;charset=UTF-8"><meta name="keywords" content="Wooepa"><meta name="description" content="Wooepa"><meta name="fragment" content="!"><link href="/favicon.ico" rel="shortcut icon" type="image/x-icon"><meta property="fb:app_id" content="APP_ID"><meta property="og:description" content="Wooepa"><meta property="og:type" content="website"><meta property="og:url" content="http://wooepa.com"><meta property="og:image" content="APP_LOGO"><meta property="og:site_name" content="Wooepa"><meta property="fb:admins" content="APP_ADMIN"><meta name="msvalidate.01" content="741DD559CC819DECAF2AA49D92578598"><meta name="google-site-verification" content="w79q3QuneD2E21myOjjIUeCobYxg7Rpv_TBQsZ_Yh2M"><link rel="stylesheet" href="/css/app.min.css"><link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Ubuntu:300,400,500,400italic"><script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script><script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/plugins/ScrollToPlugin.min.js"></script></head><body id="{{$state.current.name.replace(\'.\', \'-\')}}"><div class="container-fluid"><header headroom tolerance="0" offset="0" scroller=".app-view" classes="{pinned:\'pinned\',unpinned:\'unpinned\',initial:\'headroom\'}"><nav role="navigation" ng-controller="HeaderCtrl" class="navbar navbar-inverse"><div class="container"><div class="navbar-header"><a href="/" ui-sref="list" class="navbar-brand">Wooepa</a><button type="button" ng-init="navCollapsed = true" ng-click="navCollapsed = !navCollapsed" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><i class="fa fa-bars"></i></button><ul class="nav navbar-nav navbar-right"><li ng-if="$root.user" ng-cloak class="dropdown"><a href="#" class="dropdown-toggle"><span class="avatar pull-right"><img src="{{ $root.user.facebook.picture }}" alt="{{ $root.user.facebook.name }}" class="img-circle"></span><span class="hidden-xs hidden-sm hidden-md">{{$root.user.facebook.name}}</span><i class="fa fa-chevron-down"></i></a><ul class="dropdown-menu"><li><a ui-sref="app.page.profile" href="/me/events">My events</a></li><li class="divider"></li><li><a href="/auth/signout" target="_self" translate>Logout<i class="fa fa-sign-out"></i></a></li></ul></li><li ng-if="!$root.user" ng-cloak><a href="/auth/facebook" target="_self" translate class="login">Login</a></li></ul></div></div></nav></header><div id="menu" ng-class="{\'in\':!navCollapsed}" class="navbar-collapse collapse"><ul class="nav navbar-nav visible-xs"><li class="search"><form class="navbar-form"><div class="form-control-wrapper"><i class="fa fa-search"></i><input type="text" placeholder="Type a city or location" typeahead="address.formatted_address for address in getLocation($viewValue)" typeahead-on-select="onSelect($item, $model, $label)" ng-model="locationSelected" ng-controller="LocationpickerCtrl" class="form-control col-lg-8"></div></form></li><li class="sort"><a href="#" ng-click="isCollapsed = !isCollapsed"><i class="fa fa-bar-chart-o"></i>Sort by<i ng-class="{\'fa-chevron-right\': isCollapsed, \'fa-chevron-down\': !isCollapsed}" class="pull-right fa"></i></a><ul collapse="isCollapsed" class="nav nav-collapse"><li><a href="#" ui-sref="list({sortBy: \'proximity\'})"><i class="fa fa-map-marker"> </i>Proximity</a></li><li><a href="#" ui-sref="list({sortBy: \'popularity\'})"><i class="fa fa-group"> </i>Popularity</a></li><li><a href="#" ui-sref="list({sortBy: \'\'})"><i class="fa fa-calendar"></i>Date</a></li></ul></li><li class="today"><a href="#"><i class="fa fa-calendar"></i>Today</a></li><li ng-if="today.getTime() === Date.sun().getTime()"><a href="#"><i class="fa fa-calendar"></i>This weekend</a></li><li ng-if="today.getTime() !== Date.sun().getTime()"><a href="#"><i class="fa fa-calendar"></i>Next weekend</a></li><li class="datepicker"><input type="date" ng-change="$state.go(\'list\', {since: getStringDate(date)})" ng-model="date"></li><li class="tags">Explore by category<div class="tag-list"><a ng-repeat="tag in tags" ui-sref="list({tags: [tag]})" class="tag {{tag}}">{{tag}}</a></div></li></ul></div><div class="banner"></div><div id="wrapper"><div ui-view class="container-fluid"></div></div><script type="text/javascript" src="/js/app.min.js"></script><script>window.user = ;\n' +
    'window.fbAppId = ;\n' +
    '//window.events = ;</script><script src="//localhost:35729/livereload.js"></script></div></body></html>');
  $templateCache.put('layout',
    '<!DOCTYPE html><html><head><base href="/"><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><meta name="viewport" content="width=device-width,initial-scale=1"><title></title><meta http-equiv="Content-type" content="text/html;charset=UTF-8"><meta name="keywords" content="Wooepa"><meta name="description" content="Wooepa"><meta name="fragment" content="!"><link href="/favicon.ico" rel="shortcut icon" type="image/x-icon"><meta property="fb:app_id" content="APP_ID"><meta property="og:description" content="Wooepa"><meta property="og:type" content="website"><meta property="og:url" content="http://wooepa.com"><meta property="og:image" content="APP_LOGO"><meta property="og:site_name" content="Wooepa"><meta property="fb:admins" content="APP_ADMIN"><meta name="msvalidate.01" content="741DD559CC819DECAF2AA49D92578598"><meta name="google-site-verification" content="w79q3QuneD2E21myOjjIUeCobYxg7Rpv_TBQsZ_Yh2M"><link rel="stylesheet" href="/css/app.min.css"><link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Ubuntu:300,400,500,400italic"><script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script><script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/plugins/ScrollToPlugin.min.js"></script></head><body id="{{$state.current.name.replace(\'.\', \'-\')}}"><div class="container-fluid"><header headroom tolerance="0" offset="0" scroller=".app-view" classes="{pinned:\'pinned\',unpinned:\'unpinned\',initial:\'headroom\'}"><nav role="navigation" ng-controller="HeaderCtrl" class="navbar navbar-inverse"><div class="container"><div class="navbar-header"><a href="/" ui-sref="list" class="navbar-brand">Wooepa</a><button type="button" ng-init="navCollapsed = true" ng-click="navCollapsed = !navCollapsed" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><i class="fa fa-bars"></i></button><ul class="nav navbar-nav navbar-right"><li ng-if="$root.user" ng-cloak class="dropdown"><a href="#" class="dropdown-toggle"><span class="avatar pull-right"><img src="{{ $root.user.facebook.picture }}" alt="{{ $root.user.facebook.name }}" class="img-circle"></span><span class="hidden-xs hidden-sm hidden-md">{{$root.user.facebook.name}}</span><i class="fa fa-chevron-down"></i></a><ul class="dropdown-menu"><li><a ui-sref="app.page.profile" href="/me/events">My events</a></li><li class="divider"></li><li><a href="/auth/signout" target="_self" translate>Logout<i class="fa fa-sign-out"></i></a></li></ul></li><li ng-if="!$root.user" ng-cloak><a href="/auth/facebook" target="_self" translate class="login">Login</a></li></ul></div></div></nav></header><div id="menu" ng-class="{\'in\':!navCollapsed}" class="navbar-collapse collapse"><ul class="nav navbar-nav visible-xs"><li class="search"><form class="navbar-form"><div class="form-control-wrapper"><i class="fa fa-search"></i><input type="text" placeholder="Type a city or location" typeahead="address.formatted_address for address in getLocation($viewValue)" typeahead-on-select="onSelect($item, $model, $label)" ng-model="locationSelected" ng-controller="LocationpickerCtrl" class="form-control col-lg-8"></div></form></li><li class="sort"><a href="#" ng-click="isCollapsed = !isCollapsed"><i class="fa fa-bar-chart-o"></i>Sort by<i ng-class="{\'fa-chevron-right\': isCollapsed, \'fa-chevron-down\': !isCollapsed}" class="pull-right fa"></i></a><ul collapse="isCollapsed" class="nav nav-collapse"><li><a href="#" ui-sref="list({sortBy: \'proximity\'})"><i class="fa fa-map-marker"> </i>Proximity</a></li><li><a href="#" ui-sref="list({sortBy: \'popularity\'})"><i class="fa fa-group"> </i>Popularity</a></li><li><a href="#" ui-sref="list({sortBy: \'\'})"><i class="fa fa-calendar"></i>Date</a></li></ul></li><li class="today"><a href="#"><i class="fa fa-calendar"></i>Today</a></li><li ng-if="today.getTime() === Date.sun().getTime()"><a href="#"><i class="fa fa-calendar"></i>This weekend</a></li><li ng-if="today.getTime() !== Date.sun().getTime()"><a href="#"><i class="fa fa-calendar"></i>Next weekend</a></li><li class="datepicker"><input type="date" ng-change="$state.go(\'list\', {since: getStringDate(date)})" ng-model="date"></li><li class="tags">Explore by category<div class="tag-list"><a ng-repeat="tag in tags" ui-sref="list({tags: [tag]})" class="tag {{tag}}">{{tag}}</a></div></li></ul></div><div class="banner"></div><div id="wrapper"><div ui-view class="container-fluid"></div></div><script type="text/javascript" src="/js/app.min.js"></script><script src="//localhost:35729/livereload.js"></script></div></body></html>');
  $templateCache.put('menu',
    '<div id="menu" ng-class="{\'in\':!navCollapsed}" class="navbar-collapse collapse"><ul class="nav navbar-nav visible-xs"><li class="search"><form class="navbar-form"><div class="form-control-wrapper"><i class="fa fa-search"></i><input type="text" placeholder="Type a city or location" typeahead="address.formatted_address for address in getLocation($viewValue)" typeahead-on-select="onSelect($item, $model, $label)" ng-model="locationSelected" ng-controller="LocationpickerCtrl" class="form-control col-lg-8"></div></form></li><li class="sort"><a href="#" ng-click="isCollapsed = !isCollapsed"><i class="fa fa-bar-chart-o"></i>Sort by<i ng-class="{\'fa-chevron-right\': isCollapsed, \'fa-chevron-down\': !isCollapsed}" class="pull-right fa"></i></a><ul collapse="isCollapsed" class="nav nav-collapse"><li><a href="#" ui-sref="list({sortBy: \'proximity\'})"><i class="fa fa-map-marker"> </i>Proximity</a></li><li><a href="#" ui-sref="list({sortBy: \'popularity\'})"><i class="fa fa-group"> </i>Popularity</a></li><li><a href="#" ui-sref="list({sortBy: \'\'})"><i class="fa fa-calendar"></i>Date</a></li></ul></li><li class="today"><a href="#"><i class="fa fa-calendar"></i>Today</a></li><li ng-if="today.getTime() === Date.sun().getTime()"><a href="#"><i class="fa fa-calendar"></i>This weekend</a></li><li ng-if="today.getTime() !== Date.sun().getTime()"><a href="#"><i class="fa fa-calendar"></i>Next weekend</a></li><li class="datepicker"><input type="date" ng-change="$state.go(\'list\', {since: getStringDate(date)})" ng-model="date"></li><li class="tags">Explore by category<div class="tag-list"><a ng-repeat="tag in tags" ui-sref="list({tags: [tag]})" class="tag {{tag}}">{{tag}}</a></div></li></ul></div>');
  $templateCache.put('event/list',
    '<section id="list" infinite-scroll="getMore()" infinite-scroll-distance="1" infinite-scroll-immediate-check="false" ng-show="$state.current.name === \'list\'">\n' +
    '<section id="sidebar" ng-controller="SidebarCtrl" class="hidden-xs col-sm-3 col-md-3 col-lg-2"><ul class="nav navbar-nav row"><li class="search"><form class="navbar-form"><div class="form-control-wrapper"><i class="fa fa-search"></i><input type="text" placeholder="Type a city or location" typeahead="address.formatted_address for address in getLocation($viewValue)" typeahead-on-select="onSelect($item, $model, $label)" ng-model="locationSelected" ng-controller="LocationpickerCtrl" class="form-control col-lg-8"><span class="material-input"></span></div></form></li><li class="sort"><a href="#" ng-click="isCollapsed = !isCollapsed"><i class="fa fa-bar-chart-o"></i>Sort by<i ng-class="{\'fa-chevron-right\': isCollapsed, \'fa-chevron-down\': !isCollapsed}" class="pull-right fa"></i></a><ul collapse="isCollapsed" class="nav nav-collapse"><li><a href="#" ui-sref="list({sortBy: \'proximity\'})"><i class="fa fa-map-marker"> </i>Proximity</a></li><li><a href="#" ui-sref="list({sortBy: \'popularity\'})"><i class="fa fa-group"> </i>Popularity</a></li><li><a href="#" ui-sref="list({sortBy: \'\'})"><i class="fa fa-calendar"></i>Date</a></li></ul></li><li class="today"><a href="#"><i class="fa fa-calendar"></i>Today</a></li><li ng-if="today.getTime() === Date.sun().getTime()"><a href="#"><i class="fa fa-calendar"></i>This weekend</a></li><li ng-if="today.getTime() !== Date.sun().getTime()"><a href="#"><i class="fa fa-calendar"></i>Next weekend</a></li><li class="datepicker"><datepicker ng-change="$state.go(\'list\', {since: getStringDate(date)})" ng-model="date" show-weeks="false"></datepicker></li><li class="tags">Explore by category<div class="tag-list"><a ng-repeat="tag in tags" ui-sref="list({tags: [tag]})" class="tag {{tag}}">{{tag}}</a></div></li></ul></section><div class="events col-xs-12 col-sm-9 col-md-9 col-lg-10"><div ng-repeat="ev in events track by ev.eid" id="{{$index}}" isotope ui-sref="list.view({slug: ev.slug, eid: ev.eid})" class="events-wrapper col-xs-12 col-sm-6 col-md-4 col-lg-3"><div class="event"><div class="top"><div class="background"></div><a ui-sref="list.view({slug: ev.slug, eid: ev.eid})" class="title truncate">{{ev.name}}</a><div class="tag-list"><span ng-repeat="tag in ev.tags" ng-if="$index &lt; 3" ng-click="openTag($event, ev)" class="tag {{tag}}">{{tag}}</span></div></div><div class="image-container"><div class="image"><div ng-if="ev.price.num === 0" class="ribbon-wrapper-green"><div class="ribbon-green">{{ev.price.full}}</div></div><img ng-src="{{ev.pic_cover.source}}"></div></div><div class="bottom"><span class="datetime"><span class="date"><i class="fa fa-calendar-o"></i><span>{{ev.start_time2 | amDateFormat:\'D MMM\'}} </span><i class="fa fa-clock-o"></i><span>{{ev.start_time2 | amDateFormat:"LT"}}</span></span></span><div ng-if="ev.attending_count &gt; 0" ev.attending_count="ev.attending_count" class="attending pull-right"><i class="fa fa-group"></i><span>{{ev.attending_count}}</span></div><div class="place-info"><div ng-if="ev.price" class="user price pull-right">{{ev.price.full}}</div><div ng-click="openMap($event, ev)" ng-if="ev.location" class="span place"><i class="fa fa-map-marker"></i><span class="location">{{\' \' + ev.location | characters:20}}{{ev.location && ev.venue.city ? \', \' + ev.venue.city : \'\'}}</span></div></div></div><div class="box-shadow"></div></div></div></div></section><ui-view></ui-view>');
  $templateCache.put('event/mobile-bar',
    '');
  $templateCache.put('event/promote',
    '<form class="event-form form-horizontal"><div class="modal-header">Event Promotion<div class="modal-body"><div class="control-group"><label class="control-label">Reward</label><span><input required="required" type="text" ng-model="ev.promotion.reward" placeholder="" class="medium-input"><label class="promote-label">Quantity</label><input required="required" type="text" ng-model="ev.promotion.quantity" placeholder="" class="small-input"><label class="promote-label">Value</label><input required="required" type="text" ng-model="ev.promotion.value" placeholder="" class="small-input"></span></div><div class="control-group date"><br><div ng-controller="DatepickerCtrl" class="form-group"><br><label for="title" class="col-md-2">Deadline</label><div class="col-md-10"><p class="input-group"><input ng-click="open($event)" datepicker-popup="{{format}}" style="width:50%" ng-model="ev.promotion.end_date" is-open="opened" datepicker-options="dateOptions" date-disabled="disabled(date, mode)" ng-required="true" close-text="Close" class="small-input"><button ng-click="open($event)" class="btn btn-default"><i class="fa fa-calendar"></i></button></p></div></div><div ng-controller="TimepickerCtrl" class="form-group"><label style="margin-top:6%;" for="title" class="col-md-2 control-label">End Time</label><timepicker ng-model="ev.promotion.end_time" ng-change="changed()" hour-step="hstep" minute-step="mstep" show-meridian="ismeridian"></timepicker></div></div><div class="control-group"><label class="control-label">Commentary</label><textarea id="description" required="required" ng-model="ev.promotion.commentary" cols="30" rows="5" placeholder="Content" class="form-control"></textarea><input type="hidden" name="in_promotion" ng-model="ev.in_promotion" value="value"></div></div><div class="modal-footer"><button ng-click="submit()" class="btn btn-primary"><i class="fui-check"></i>OK</button><button ng-click="cancel()" class="btn btn-warning"><i class="fui-cross"></i>Cancel</button></div></div></form>');
  $templateCache.put('event/sidebar',
    '<section id="sidebar" ng-controller="SidebarCtrl" class="hidden-xs col-sm-3 col-md-3 col-lg-2"><ul class="nav navbar-nav row"><li class="search"><form class="navbar-form"><div class="form-control-wrapper"><i class="fa fa-search"></i><input type="text" placeholder="Type a city or location" typeahead="address.formatted_address for address in getLocation($viewValue)" typeahead-on-select="onSelect($item, $model, $label)" ng-model="locationSelected" ng-controller="LocationpickerCtrl" class="form-control col-lg-8"><span class="material-input"></span></div></form></li><li class="sort"><a href="#" ng-click="isCollapsed = !isCollapsed"><i class="fa fa-bar-chart-o"></i>Sort by<i ng-class="{\'fa-chevron-right\': isCollapsed, \'fa-chevron-down\': !isCollapsed}" class="pull-right fa"></i></a><ul collapse="isCollapsed" class="nav nav-collapse"><li><a href="#" ui-sref="list({sortBy: \'proximity\'})"><i class="fa fa-map-marker"> </i>Proximity</a></li><li><a href="#" ui-sref="list({sortBy: \'popularity\'})"><i class="fa fa-group"> </i>Popularity</a></li><li><a href="#" ui-sref="list({sortBy: \'\'})"><i class="fa fa-calendar"></i>Date</a></li></ul></li><li class="today"><a href="#"><i class="fa fa-calendar"></i>Today</a></li><li ng-if="today.getTime() === Date.sun().getTime()"><a href="#"><i class="fa fa-calendar"></i>This weekend</a></li><li ng-if="today.getTime() !== Date.sun().getTime()"><a href="#"><i class="fa fa-calendar"></i>Next weekend</a></li><li class="datepicker"><datepicker ng-change="$state.go(\'list\', {since: getStringDate(date)})" ng-model="date" show-weeks="false"></datepicker></li><li class="tags">Explore by category<div class="tag-list"><a ng-repeat="tag in tags" ui-sref="list({tags: [tag]})" class="tag {{tag}}">{{tag}}</a></div></li></ul></section>');
  $templateCache.put('event/view',
    '<div id="view"><div class="container"><section class="header row"><div class="col-xs-12 col-sm-4 col-md-4 col-lg-4"><img src="{{ev.pic_cover.source}}"></div><div class="col-xs-12 col-sm-8 col-md-8 col-lg-8"><h3 class="title truncate">{{ev.name}}</h3><button ng-click="promote(ev)" ng-if="!ev.promotion || ev.promoter.facebook.id === user.facebook.id" class="btn btn-primary promote">Promote event</button><div class="tag-list"><span ng-repeat="tag in ev.tags" ng-if="$index &lt; 3" class="tag {{tag}}">{{tag}}</span></div><div class="title"><div class="attending">{{ev.attending_count}}<i class="icon-group"></i></div><div class="price">{{ev.price.full}}</div></div><div class="datetime"><span class="date"><i class="fa fa-calendar"></i><span>{{ev.start_time2 | amDateFormat:\'D MMM\'}} </span></span><span class="time"><i class="fa fa-clock-o"></i><span>{{ev.start_time2 | amDateFormat:"LT"}}</span><span>{{ev.start_time2 | amCalendar}}</span></span></div></div></section><section class="row"><div class="col-md-4"><div class="event-buttons wdiv padding-10"><div class="event-rsvp-btns"><button set-attendings class="btn btn-primary join">{{attending}}</button></div><div class="event-rsvp-btns"><button friend-selector class="btn btn-primary">Invite your friends !</button></div><div class="event-rsvp-btns"><button share-event class="btn btn-primary share">Share with your friends?</button></div></div><div ng-hide="isInPromotion()" ng-if="ev.in_promotion" class="event-buttons wdiv padding-10"><div ng-repeat="player in ev.list_event_players | orderBy:\'-result\' | filter:search" ng-if="ng-if" class="alert alert-success"></div></div><div ng-if="ev.promotion" class="padding-10"><div class="panel panel-success"><div class="panel-heading">Game Active</div><div class="panel-body"><ul ng-if="ev.promoter" class="list-group"><li ng-if="ev.promoter" class="list-group-item"><img ng-src="{{ev.promoter.facebook.picture}}" ng-alt="{{ev.promoter.name}}" class="img-circle">{{ ev.promoter.name }}</li><li class="list-group-item">{{ev.promotion.reward}}</li><li class="list-group-item">End: &nbsp<strong>{{ev.promotion.end_date | amCalendar}}</strong></li></ul></div></div></div><div class="padding-10"><div class="panel panel-default"><div class="panel-heading">Players</div><div class="panel-body"><p list-event-player ng-hide="ev.list_event_players[0].uid">No Players yet !</p><ul class="list-group"><p ng-hide="!ev.list_event_players[0].uid">{{ev.list_event_players.length}} &nbsp Players !</p><input placeholder="Search player" type="text" ng-model="search.name" class="form-control input-sm"><hr><li ng-repeat="player in ev.list_event_players" class="list-group-item"><table><tr><td> <img ng-src="{{&quot;http://graph.facebook.com/&quot; + player.uid + &quot;/picture?type=square&quot;}}" ng-alt="{{player.name}}" class="img-circle"></td><td><table><tr><td>{{player.name}}</td></tr><tr><td>{{ player.result }} pts</td><td> <button boost-player class="btn">Boost<i-fa-fa-flash></i-fa-fa-flash></button></td></tr></table></td></tr></table></li><li ng-repeat="player in ev.list_event_players | orderBy:\'-result\' | filter:search" ng-if="player.facebook.id != ev.player_id" class="list-group-item"><img ng-src="{{&quot;http://graph.facebook.com/&quot; + player.uid + &quot;/picture?type=square&quot;}}" ng-alt="{{player.name}}" class="img-circle">{{ player.result }} pts<button class="btn btn-primary">Boost</button><i-fa-fa-flash></i-fa-fa-flash></li></ul></div></div></div></div></section><section class="description row"><p ng-bind-html="ev.description | linky" class="description"></p></section><section class="location row"><a href="https://maps.google.com/maps?q={{ev.location + \' \' + ev.venue.street + \' \' + ev.venue.city + \' \' + ev.venue.country}}" target="_blank"><div ng-if="ev.location" class="place"><i class="fa fa-map-marker"></i>{{ev.location}} - {{ev.venue.street}}{{ev.venue.street && ev.venue.city ? \', \' : \'\'}}{{ev.venue.city}}{{ev.venue.city && ev.venue.country ? \', \' : \'\'}} {{ev.venue.country}}</div></a><div style="background-image: url(https://maps.googleapis.com/maps/api/staticmap?center={{ev.venue.coord.lat + \',\' + ev.venue.coord.lng}}&amp;zoom=14&amp;size=640x200&amp;markers=color:blue|{{ev.venue.coord.lat + \',\' + ev.venue.coord.lng}})" class="map"></div></section><section class="media row"><ul ng-if="videos.length" class="youtube-videos"><li ng-repeat="video in videos" ng-if="$index &lt; 3" class="col-xs-6 col-sm-4 col-md-3 col-lg-4"><object type="text/html" data="{{video}}" class="img-thumbnail"></object></li></ul><ul ng-if="fbpics.length" class="facebook-pictures"><li ng-repeat="pic in fbpics" class="col-xs-12 col-sm-4 col-md-3 col-lg-4"><a ng-click="openLightboxModal(fbpics, $index)"><img ng-src="{{pic.thumbUrl}}" alt="" class="img-thumbnail"></a></li></ul><ul ng-if="instagramPhotos.length" class="instagram-photos"><li ng-repeat="photo in instagramPhotos" class="col-xs-12 col-sm-4 col-md-3 col-lg-4"><a ng-click="openLightboxModal(instagramPhotos, $index)"><img ng-src="{{photo.thumbUrl}}" alt="" class="img-thumbnail"></a></li></ul></section></div></div>');
}]);
