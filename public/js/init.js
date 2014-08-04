'use strict';

angular.element(document).ready(function() {
    //Fixing facebook bug with redirect
    // if (window.location.hash === '#_=_') window.location.hash = '#!';

    //Then init the app
    angular.bootstrap(document, ['wooepa']);

    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-48693864-1', 'wooepa.com');
      ga('send', 'pageview');

    // $('.dropdown-menu input, .dropdown-menu label').click(function(e) {
    //     e.stopPropagation();
    // });


    window.fbAsyncInit = function() {
      FB.init({
        appId      : '439472799532734',
        xfbml      : true,
        version    : 'v2.0'
      });
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));


     FB.ui(
     {
          method: "apprequests",
          message: "Choose a friend.",
          max_recipients: 1,
          title:"Invite a friend"
     });

});