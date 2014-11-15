angular.module('wooepa-templates', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('404',
    '<!DOCTYPE html><html><head><base href="/"><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><meta name="viewport" content="width=device-width,initial-scale=1"><title></title><meta http-equiv="Content-type" content="text/html;charset=UTF-8"><meta name="keywords" content="Wooepa"><meta name="description" content="Wooepa"><meta name="fragment" content="!"><link href="/favicon.ico" rel="shortcut icon" type="image/x-icon"><meta property="fb:app_id" content="APP_ID"><meta property="og:description" content="Wooepa"><meta property="og:type" content="website"><meta property="og:url" content="http://wooepa.com"><meta property="og:image" content="APP_LOGO"><meta property="og:site_name" content="Wooepa"><meta property="fb:admins" content="APP_ADMIN"><meta name="msvalidate.01" content="741DD559CC819DECAF2AA49D92578598"><meta name="google-site-verification" content="w79q3QuneD2E21myOjjIUeCobYxg7Rpv_TBQsZ_Yh2M"><link rel="stylesheet" href="/css/app.min.css"><link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Ubuntu:300,400,500,400italic"><script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script><script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/plugins/ScrollToPlugin.min.js"></script></head><body id="{{$state.current.name.replace(\'.\', \'-\')}}"><header headroom tolerance="0" offset="0" scroller=".app-view" classes="{pinned:\'pinned\',unpinned:\'unpinned\',initial:\'headroom\'}"><nav role="navigation" ng-controller="HeaderCtrl" class="navbar navbar-inverse"><div class="container"><div class="navbar-header"><button type="button" ng-init="navCollapsed = true" ng-click="navCollapsed = !navCollapsed" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><i class="fa fa-bars"></i></button><a href="/" ui-sref="list" class="navbar-brand">Wooepa</a></div><div ng-class="{\'in\':!navCollapsed}" ng-click="navCollapsed=true" class="collapse navbar-collapse hidden-xs"><ul class="nav navbar-nav navbar-right"><li ng-if="$root.user" ng-cloak class="dropdown"><a href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="dropdown-toggle clear"><span class="thumb-sm avatar pull-right"><img src="{{ $root.user.facebook.picture }}" alt="{{ $root.user.facebook.name }}" class="img-circle"></span><span class="hidden-sm hidden-md">{{$root.user.facebook.name}}</span><i class="fa fa-chevron-down"></i></a><ul class="dropdown-menu animated fadeInRight w"><li><a ui-sref="app.page.profile" href="/me/events">My events</a></li><li class="divider"></li><li><a href="/auth/signout" target="_self" translate>Logout<i class="fa fa-sign-out"></i></a></li></ul></li><li ng-if="!$root.user" ng-cloak><a href="/auth/facebook" target="_self" translate class="login">Login</a></li></ul></div></div></nav></header><div class="banner"></div><div id="wrapper"><div ui-view class="container-fluid"></div></div><script type="text/javascript" src="/js/app.min.js"></script><script src="//localhost:35729/livereload.js"></script></body></html>');
  $templateCache.put('500',
    '<!DOCTYPE html><html><head><base href="/"><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><meta name="viewport" content="width=device-width,initial-scale=1"><title></title><meta http-equiv="Content-type" content="text/html;charset=UTF-8"><meta name="keywords" content="Wooepa"><meta name="description" content="Wooepa"><meta name="fragment" content="!"><link href="/favicon.ico" rel="shortcut icon" type="image/x-icon"><meta property="fb:app_id" content="APP_ID"><meta property="og:description" content="Wooepa"><meta property="og:type" content="website"><meta property="og:url" content="http://wooepa.com"><meta property="og:image" content="APP_LOGO"><meta property="og:site_name" content="Wooepa"><meta property="fb:admins" content="APP_ADMIN"><meta name="msvalidate.01" content="741DD559CC819DECAF2AA49D92578598"><meta name="google-site-verification" content="w79q3QuneD2E21myOjjIUeCobYxg7Rpv_TBQsZ_Yh2M"><link rel="stylesheet" href="/css/app.min.css"><link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Ubuntu:300,400,500,400italic"><script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script><script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/plugins/ScrollToPlugin.min.js"></script></head><body id="{{$state.current.name.replace(\'.\', \'-\')}}"><header headroom tolerance="0" offset="0" scroller=".app-view" classes="{pinned:\'pinned\',unpinned:\'unpinned\',initial:\'headroom\'}"><nav role="navigation" ng-controller="HeaderCtrl" class="navbar navbar-inverse"><div class="container"><div class="navbar-header"><button type="button" ng-init="navCollapsed = true" ng-click="navCollapsed = !navCollapsed" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><i class="fa fa-bars"></i></button><a href="/" ui-sref="list" class="navbar-brand">Wooepa</a></div><div ng-class="{\'in\':!navCollapsed}" ng-click="navCollapsed=true" class="collapse navbar-collapse hidden-xs"><ul class="nav navbar-nav navbar-right"><li ng-if="$root.user" ng-cloak class="dropdown"><a href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="dropdown-toggle clear"><span class="thumb-sm avatar pull-right"><img src="{{ $root.user.facebook.picture }}" alt="{{ $root.user.facebook.name }}" class="img-circle"></span><span class="hidden-sm hidden-md">{{$root.user.facebook.name}}</span><i class="fa fa-chevron-down"></i></a><ul class="dropdown-menu animated fadeInRight w"><li><a ui-sref="app.page.profile" href="/me/events">My events</a></li><li class="divider"></li><li><a href="/auth/signout" target="_self" translate>Logout<i class="fa fa-sign-out"></i></a></li></ul></li><li ng-if="!$root.user" ng-cloak><a href="/auth/facebook" target="_self" translate class="login">Login</a></li></ul></div></div></nav></header><div class="banner"></div><div id="wrapper"><div ui-view class="container-fluid"></div></div><script type="text/javascript" src="/js/app.min.js"></script><script src="//localhost:35729/livereload.js"></script></body></html>');
  $templateCache.put('head',
    '<head><base href="/"><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><meta name="viewport" content="width=device-width,initial-scale=1"><title></title><meta http-equiv="Content-type" content="text/html;charset=UTF-8"><meta name="keywords" content="Wooepa"><meta name="description" content="Wooepa"><meta name="fragment" content="!"><link href="/favicon.ico" rel="shortcut icon" type="image/x-icon"><meta property="fb:app_id" content="APP_ID"><meta property="og:description" content="Wooepa"><meta property="og:type" content="website"><meta property="og:url" content="http://wooepa.com"><meta property="og:image" content="APP_LOGO"><meta property="og:site_name" content="Wooepa"><meta property="fb:admins" content="APP_ADMIN"><meta name="msvalidate.01" content="741DD559CC819DECAF2AA49D92578598"><meta name="google-site-verification" content="w79q3QuneD2E21myOjjIUeCobYxg7Rpv_TBQsZ_Yh2M"><link rel="stylesheet" href="/css/app.min.css"><link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Ubuntu:300,400,500,400italic"><script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script><script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/plugins/ScrollToPlugin.min.js"></script></head>');
  $templateCache.put('header',
    '<header headroom tolerance="0" offset="0" scroller=".app-view" classes="{pinned:\'pinned\',unpinned:\'unpinned\',initial:\'headroom\'}"><nav role="navigation" ng-controller="HeaderCtrl" class="navbar navbar-inverse"><div class="container"><div class="navbar-header"><button type="button" ng-init="navCollapsed = true" ng-click="navCollapsed = !navCollapsed" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><i class="fa fa-bars"></i></button><a href="/" ui-sref="list" class="navbar-brand">Wooepa</a></div><div ng-class="{\'in\':!navCollapsed}" ng-click="navCollapsed=true" class="collapse navbar-collapse hidden-xs"><ul class="nav navbar-nav navbar-right"><li ng-if="$root.user" ng-cloak class="dropdown"><a href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="dropdown-toggle clear"><span class="thumb-sm avatar pull-right"><img src="{{ $root.user.facebook.picture }}" alt="{{ $root.user.facebook.name }}" class="img-circle"></span><span class="hidden-sm hidden-md">{{$root.user.facebook.name}}</span><i class="fa fa-chevron-down"></i></a><ul class="dropdown-menu animated fadeInRight w"><li><a ui-sref="app.page.profile" href="/me/events">My events</a></li><li class="divider"></li><li><a href="/auth/signout" target="_self" translate>Logout<i class="fa fa-sign-out"></i></a></li></ul></li><li ng-if="!$root.user" ng-cloak><a href="/auth/facebook" target="_self" translate class="login">Login</a></li></ul></div></div></nav></header>');
  $templateCache.put('index',
    '<!DOCTYPE html><html><head><base href="/"><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><meta name="viewport" content="width=device-width,initial-scale=1"><title></title><meta http-equiv="Content-type" content="text/html;charset=UTF-8"><meta name="keywords" content="Wooepa"><meta name="description" content="Wooepa"><meta name="fragment" content="!"><link href="/favicon.ico" rel="shortcut icon" type="image/x-icon"><meta property="fb:app_id" content="APP_ID"><meta property="og:description" content="Wooepa"><meta property="og:type" content="website"><meta property="og:url" content="http://wooepa.com"><meta property="og:image" content="APP_LOGO"><meta property="og:site_name" content="Wooepa"><meta property="fb:admins" content="APP_ADMIN"><meta name="msvalidate.01" content="741DD559CC819DECAF2AA49D92578598"><meta name="google-site-verification" content="w79q3QuneD2E21myOjjIUeCobYxg7Rpv_TBQsZ_Yh2M"><link rel="stylesheet" href="/css/app.min.css"><link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Ubuntu:300,400,500,400italic"><script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script><script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/plugins/ScrollToPlugin.min.js"></script></head><body id="{{$state.current.name.replace(\'.\', \'-\')}}"><header headroom tolerance="0" offset="0" scroller=".app-view" classes="{pinned:\'pinned\',unpinned:\'unpinned\',initial:\'headroom\'}"><nav role="navigation" ng-controller="HeaderCtrl" class="navbar navbar-inverse"><div class="container"><div class="navbar-header"><button type="button" ng-init="navCollapsed = true" ng-click="navCollapsed = !navCollapsed" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><i class="fa fa-bars"></i></button><a href="/" ui-sref="list" class="navbar-brand">Wooepa</a></div><div ng-class="{\'in\':!navCollapsed}" ng-click="navCollapsed=true" class="collapse navbar-collapse hidden-xs"><ul class="nav navbar-nav navbar-right"><li ng-if="$root.user" ng-cloak class="dropdown"><a href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="dropdown-toggle clear"><span class="thumb-sm avatar pull-right"><img src="{{ $root.user.facebook.picture }}" alt="{{ $root.user.facebook.name }}" class="img-circle"></span><span class="hidden-sm hidden-md">{{$root.user.facebook.name}}</span><i class="fa fa-chevron-down"></i></a><ul class="dropdown-menu animated fadeInRight w"><li><a ui-sref="app.page.profile" href="/me/events">My events</a></li><li class="divider"></li><li><a href="/auth/signout" target="_self" translate>Logout<i class="fa fa-sign-out"></i></a></li></ul></li><li ng-if="!$root.user" ng-cloak><a href="/auth/facebook" target="_self" translate class="login">Login</a></li></ul></div></div></nav></header><div class="banner"></div><div id="wrapper"><div ui-view class="container-fluid"></div></div><script type="text/javascript" src="/js/app.min.js"></script><script>window.user = ;\n' +
    'window.fbAppId = ;\n' +
    '//window.events = ;</script><script src="//localhost:35729/livereload.js"></script></body></html>');
  $templateCache.put('layout',
    '<!DOCTYPE html><html><head><base href="/"><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><meta name="viewport" content="width=device-width,initial-scale=1"><title></title><meta http-equiv="Content-type" content="text/html;charset=UTF-8"><meta name="keywords" content="Wooepa"><meta name="description" content="Wooepa"><meta name="fragment" content="!"><link href="/favicon.ico" rel="shortcut icon" type="image/x-icon"><meta property="fb:app_id" content="APP_ID"><meta property="og:description" content="Wooepa"><meta property="og:type" content="website"><meta property="og:url" content="http://wooepa.com"><meta property="og:image" content="APP_LOGO"><meta property="og:site_name" content="Wooepa"><meta property="fb:admins" content="APP_ADMIN"><meta name="msvalidate.01" content="741DD559CC819DECAF2AA49D92578598"><meta name="google-site-verification" content="w79q3QuneD2E21myOjjIUeCobYxg7Rpv_TBQsZ_Yh2M"><link rel="stylesheet" href="/css/app.min.css"><link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Ubuntu:300,400,500,400italic"><script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script><script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/plugins/ScrollToPlugin.min.js"></script></head><body id="{{$state.current.name.replace(\'.\', \'-\')}}"><header headroom tolerance="0" offset="0" scroller=".app-view" classes="{pinned:\'pinned\',unpinned:\'unpinned\',initial:\'headroom\'}"><nav role="navigation" ng-controller="HeaderCtrl" class="navbar navbar-inverse"><div class="container"><div class="navbar-header"><button type="button" ng-init="navCollapsed = true" ng-click="navCollapsed = !navCollapsed" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><i class="fa fa-bars"></i></button><a href="/" ui-sref="list" class="navbar-brand">Wooepa</a></div><div ng-class="{\'in\':!navCollapsed}" ng-click="navCollapsed=true" class="collapse navbar-collapse hidden-xs"><ul class="nav navbar-nav navbar-right"><li ng-if="$root.user" ng-cloak class="dropdown"><a href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="dropdown-toggle clear"><span class="thumb-sm avatar pull-right"><img src="{{ $root.user.facebook.picture }}" alt="{{ $root.user.facebook.name }}" class="img-circle"></span><span class="hidden-sm hidden-md">{{$root.user.facebook.name}}</span><i class="fa fa-chevron-down"></i></a><ul class="dropdown-menu animated fadeInRight w"><li><a ui-sref="app.page.profile" href="/me/events">My events</a></li><li class="divider"></li><li><a href="/auth/signout" target="_self" translate>Logout<i class="fa fa-sign-out"></i></a></li></ul></li><li ng-if="!$root.user" ng-cloak><a href="/auth/facebook" target="_self" translate class="login">Login</a></li></ul></div></div></nav></header><div class="banner"></div><div id="wrapper"><div ui-view class="container-fluid"></div></div><script type="text/javascript" src="/js/app.min.js"></script><script src="//localhost:35729/livereload.js"></script></body></html>');
  $templateCache.put('event/list',
    '<section id="list" infinite-scroll="getMore()" infinite-scroll-distance="1" infinite-scroll-immediate-check="false" ng-show="$state.current.name === \'list\'" ng-if="$root.renderList"><div id="mobile-bar" class="visible-xs"><a href="#" ng-click="mobileSortList = !mobileSortList">Sorting: Suggested<i class="fa fa-chevron-down"></i></a><ul ng-show="mobileSortList" ng-click="mobileSortList = !mobileSortList"><li><a href="#" ui-sref="list({sortBy: \'popularity\'})">Popularity</a></li><li><a href="#" ui-sref="list({sortBy: \'\'})">Date</a></li></ul></div><section id="sidebar" style="margin-top:66px" ng-controller="SidebarCtrl" class="hidden-xs col-sm-2 col-md-2 col-lg-2"><ul class="nav navbar-nav row"><li class="search"><i class="fa fa-search"></i><input type="text" placeholder="Type a city or location" typeahead="address.formatted_address for address in getLocation($viewValue)" typeahead-on-select="onSelect($item, $model, $label)" ng-model="locationSelected" ng-controller="LocationpickerCtrl"></li><li class="sort"><a href="#" ng-click="isCollapsed = !isCollapsed"><i class="fa fa-bar-chart-o"></i>Sort by<i ng-class="{\'fa-chevron-right\': isCollapsed, \'fa-chevron-down\': !isCollapsed}" class="pull-right fa"></i></a><ul collapse="isCollapsed" class="nav nav-collapse"><li><a href="#" ui-sref="list({sortBy: \'popularity\'})"><i class="fa fa-group"> </i>Popularity</a></li><li><a href="#" ui-sref="list({sortBy: \'\'})"><i class="fa fa-calendar"></i>Date</a></li></ul></li><li><a href="#"><i class="fa fa-calendar"></i>Today</a></li><li ng-if="today.getTime() === Date.sun().getTime()"><a href="#"><i class="fa fa-calendar"></i>This weekend</a></li><li ng-if="today.getTime() !== Date.sun().getTime()"><a href="#"><i class="fa fa-calendar"></i>Next weekend</a></li><li class="date"><datepicker ng-change="$state.go(\'list\', {since: getStringDate(date)})" ng-model="date" show-weeks="false"></datepicker></li><li class="tags">Explore by category<div class="tag-list"><a ng-repeat="tag in tags" ui-sref="list({tags: [tag]})" class="tag {{tag}}">{{tag}}</a></div></li></ul></section><div class="events col-xs-12 col-sm-10 col-md-10 col-lg-10"><div ng-repeat="ev in events track by ev.eid" id="{{::$index}}" isotope ui-sref="list.view({slug: ev.slug, eid: ev.eid})" class="wrapper col-xs-12 col-sm-6 col-md-4 col-lg-3"><div background class="event"><div class="top"><div class="background"></div><a ui-sref="list.view({slug: ev.slug, eid: ev.eid})" class="title truncate">{{::ev.name}}<span class="title truncate">{{::ev.description}}</span></a><div class="tag-list"><span ng-repeat="tag in ev.tags" ng-if="$index &lt; 3" ng-click="openTag($event, ev)" class="tag {{::tag}}">{{::tag}}</span></div></div><div class="image-container"><div class="image"><div ng-if="ev.price.num === 0" class="ribbon-wrapper-green"><div class="ribbon-green">{{::ev.price.full}}</div></div><img ng-src="{{::ev.pic_cover.source}}"></div></div><div class="bottom"><span class="datetime"><span class="date"><i class="fa fa-clock-o"></i><span>{{::ev.start_time | amCalendar}}</span></span></span><div ng-if="ev.attending_count &gt; 0" ev.attending_count="ev.attending_count" class="attending pull-right"><i class="fa fa-group"></i><span>{{::ev.attending_count}}</span></div><div class="place-info"><div ng-if="ev.price" class="user price pull-right">{{::ev.price.full}}</div><div ng-click="openMap($event, ev)" ng-if="ev.location" class="span place"><i class="fa fa-map-marker"></i><span class="location">{{::\' \' + ev.location | characters:20}}{{::ev.location && ev.venue.city ? \', \' + ev.venue.city : \'\'}}</span></div></div></div><div class="box-shadow"></div></div></div></div></section><ui-view></ui-view>');
  $templateCache.put('event/mobile-bar',
    '<div id="mobile-bar" class="visible-xs"><a href="#" ng-click="mobileSortList = !mobileSortList">Sorting: Suggested<i class="fa fa-chevron-down"></i></a><ul ng-show="mobileSortList" ng-click="mobileSortList = !mobileSortList"><li><a href="#" ui-sref="list({sortBy: \'popularity\'})">Popularity</a></li><li><a href="#" ui-sref="list({sortBy: \'\'})">Date</a></li></ul></div>');
  $templateCache.put('event/promote_form',
    '<form class="event-form form-horizontal"><div class="modal-header">Event Promotion<div class="modal-body"><div class="control-group"><label class="control-label">Reward</label><input id="reward" required="required" type="text" ng-model="ev.promotion.reward" placeholder="Reward for the game" class="form-control"></div><div class="control-group date"><label class="control-label">Date of end of the game</label></div><div ng-controller="DatepickerCtrl" class="input-group"><input id="datepick" size="50" type="text"><script type="text/javascript">new datepickr(\'datepick\');</script><label class="control-label">End Time<input type="text"></label></div><div class="control-group"><label class="control-label">Commentary</label><textarea id="description" required="required" ng-model="ev.promotion.commentary" cols="30" rows="5" placeholder="Content" class="form-control"></textarea><input type="hidden" name="in_promotion" ng-model="ev.in_promotion" value="value"></div></div><div class="modal-footer"><button ng-click\'submit() class="btn btn-primary"><i class="fui-check"></i>OK</button><button ng-click="cancel()" class="btn btn-warning"><i class="fui-cross"></i>Cancel</button></div></div></form>');
  $templateCache.put('event/sidebar',
    '<section id="sidebar" style="margin-top:66px" ng-controller="SidebarCtrl" class="hidden-xs col-sm-2 col-md-2 col-lg-2"><ul class="nav navbar-nav row"><li class="search"><i class="fa fa-search"></i><input type="text" placeholder="Type a city or location" typeahead="address.formatted_address for address in getLocation($viewValue)" typeahead-on-select="onSelect($item, $model, $label)" ng-model="locationSelected" ng-controller="LocationpickerCtrl"></li><li class="sort"><a href="#" ng-click="isCollapsed = !isCollapsed"><i class="fa fa-bar-chart-o"></i>Sort by<i ng-class="{\'fa-chevron-right\': isCollapsed, \'fa-chevron-down\': !isCollapsed}" class="pull-right fa"></i></a><ul collapse="isCollapsed" class="nav nav-collapse"><li><a href="#" ui-sref="list({sortBy: \'popularity\'})"><i class="fa fa-group"> </i>Popularity</a></li><li><a href="#" ui-sref="list({sortBy: \'\'})"><i class="fa fa-calendar"></i>Date</a></li></ul></li><li><a href="#"><i class="fa fa-calendar"></i>Today</a></li><li ng-if="today.getTime() === Date.sun().getTime()"><a href="#"><i class="fa fa-calendar"></i>This weekend</a></li><li ng-if="today.getTime() !== Date.sun().getTime()"><a href="#"><i class="fa fa-calendar"></i>Next weekend</a></li><li class="date"><datepicker ng-change="$state.go(\'list\', {since: getStringDate(date)})" ng-model="date" show-weeks="false"></datepicker></li><li class="tags">Explore by category<div class="tag-list"><a ng-repeat="tag in tags" ui-sref="list({tags: [tag]})" class="tag {{tag}}">{{tag}}</a></div></li></ul></section>');
  $templateCache.put('event/view',
    '<section id="view"><div class="container"><section class="header row"><div class="col-xs-12 col-sm-4 col-md-4 col-lg-4"><img src="{{::ev.pic_cover.source}}"></div><div class="col-xs-12 col-sm-8 col-md-8 col-lg-8"><h3 class="title truncate">{{::ev.name}}</h3><a ui-sref="promote({eid: ev.eid})" class="promote">Promote event</a><a target="_blank" ng-href="https://www.facebook.com/events/{{::ev.eid}}/" class="facebook-link">Facebook event</a><div class="tag-list"><span ng-repeat="tag in ev.tags" ng-if="$index &lt; 3" class="tag {{::tag}}">{{::tag}}</span></div><div class="title"><div class="attending">{{::ev.attending_count}}<i class="icon-group"></i></div><div class="price">{{::ev.price.full}}</div></div><div class="datetime"><span class="date"><i class="fa fa-calendar"></i><span>{{::ev.start_time | amDateFormat:\'D MMM\'}} </span></span><span class="time"><i class="fa fa-clock-o"></i><span>{{::ev.start_time | amDateFormat:"LT"}}</span><span>{{::ev.start_time | amCalendar}}</span></span></div></div></section><section class="description row"><p ng-bind-html="ev.description | linky" class="description"></p></section><section class="location row"><a href="https://maps.google.com/maps?q={{::ev.location + \' \' + ev.venue.street + \' \' + ev.venue.city + \' \' + ev.venue.country}}" target="_blank"><div ng-if="ev.location" class="place"><i class="fa fa-map-marker"></i>{{::ev.location}} - {{::ev.venue.street}}{{::ev.venue.street && ev.venue.city ? \', \' : \'\'}}{{::ev.venue.city}}{{::ev.venue.city && ev.venue.country ? \', \' : \'\'}} {{::ev.venue.country}}</div></a><div style="background-image: url(https://maps.googleapis.com/maps/api/staticmap?center={{::ev.venue.coord.lat + \',\' + ev.venue.coord.lng}}&amp;zoom=14&amp;size={{::mapImageWidth}}x200&amp;markers=color:blue|{{::ev.venue.coord.lat + \',\' + ev.venue.coord.lng}})" class="map"></div></section><section class="media row"><div ng-repeat="video in videos" ng-if="$index &lt; 3" class="youtube-videos"><object type="text/html" data="{{::video}}"></object></div><div class="facebook-pictures"><img ng-repeat="pics in fbpics" ng-if="$index &lt; 3" ng-src="{{::pics.source}}" class="col-xs-6 col-sm-4 col-md-3 col-lg-4 img-rounded"></div><div class="instagram-photos"><img ng-repeat="photo in instagramPhotos" ng-if="$index &lt; 3" ng-src="{{::photo.images.low_resolution.url}}" class="col-xs-6 col-sm-4 col-md-3 col-lg-4 img-rounded"></div></section></div></section>');
}]);
