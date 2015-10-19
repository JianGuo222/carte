// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ionic.service.core', 'config', 'ionic.service.analytics', 'starter.controllers', 'starter.services', 'angular-loading-bar', 'ngOpenFB', 'ngCordova'])

.run(function($ionicPlatform, $rootScope, ngFB, $ionicAnalytics, $ionicModal,  $ionicPopup) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    $ionicAnalytics.register();

    ionic.Platform.fullScreen(true,false);

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required

      StatusBar.styleDefault();
      StatusBar.overlaysWebView(false);
      StatusBar.hide();
      // StatusBar.backgroundColorByHexString("#000000");

    }

    // var push = new Ionic.Push();
    //
    // push.register(function(token) {
    //   var user = Ionic.User.current();
    //   alert('Registered token:', token.token);
    //   push.addTokenToUser(user);
    //   //persist the user
    //   user.save();
    // });

    var deploy = new Ionic.Deploy();
    deploy.check().then(function(hasUpdate) {
      if(hasUpdate){
        alert('An update is available! Please click ok to install.');
        var percentage = 0;
        var myPopup = $ionicPopup.show({
          title: 'Downloading Progress',
          template: '<h3 class="text-center" id="percetage">0 %</h3>',
          buttons: [
            {
              text: '<b>Ok</b>',
              type: 'button-stable',
              onTap: function(e) {
                if (document.getElementById('percetage').innerHTML == '100 %') {
                  return '';
                } else {
                  e.preventDefault();
                }
              }
            }
          ]
        });
        myPopup.then(function(res) {
        });
        deploy.update().then(function(res) {
          alert('Update Success');
          // console.log('Ionic Deploy: Update Success! ', res);
        }, function(err) {
          // console.log('Ionic Deploy: Update error! ', err);
        }, function(prog) {
          document.getElementById('percetage').innerHTML = Math.round(prog) + ' %';
          // console.log('Ionic Deploy: Progress... ', prog);
        });
      }
    }, function(err) {
    });

    // kick off the platform web client
    Ionic.io();

    // this will give you a fresh user or the previously saved 'current user'
    var user = Ionic.User.current();

    // if the user doesn't have an id, you'll need to give it one.
    if (!user.id) {
      user.id = Ionic.User.anonymousId();
      // user.id = 'your-custom-user-id';
      user.save();
    }else{
      console.log(user.id);
    }

    if(window.PushNotification){
      var push = new Ionic.Push({});
      push.register(function(token) {
        // Log out your device token (Save this!)
        push.addTokenToUser(user);
        // user.save();
        // alert("Got Token:  "+token.token);
        // alert(user.id);
        user.save();
      });
    }
  });

  $rootScope.mainSwitch = true;
  $rootScope.mainSwitchInfo = '';
  $rootScope.hasInternet = true;

  ngFB.init({appId: '176740972660104'});
})

.config(function($stateProvider, $urlRouterProvider, cfpLoadingBarProvider,$ionicConfigProvider) {
  cfpLoadingBarProvider.includeSpinner = false;
  $ionicConfigProvider.backButton.previousTitleText(false).text('Back').icon('ion-chevron-left');
  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.tabs.style("standard");
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'GlobalCtrl'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })
  .state('tab.dash-detail', {
    url: '/dash/:postId',
    views: {
      'tab-dash': {
        templateUrl: 'templates/post-detail.html',
        controller: 'PostDetailCtrl'
      }
    }
  })

  .state('tab.free', {
    url: '/free',
    views: {
      'tab-free': {
        templateUrl: 'templates/tab-free.html',
        controller: 'FreeCtrl'
      }
    }
  })

  .state('tab.free-upload-timetable', {
    url: '/free/upload',
    views: {
      'tab-free': {
        templateUrl: 'templates/tab-free-upload.html',
        controller: 'UploadCtrl'
      }
    }
  })

  .state('tab.free-scan', {
    url: '/free/scan',
    views: {
      'tab-free': {
        templateUrl: 'templates/tab-free-scan.html',
        controller: 'ScanCtrl'
      }
    }
  })

  .state('tab.free-thankyou', {
    url: '/free/thankyou',
    views: {
      'tab-free': {
        templateUrl: 'templates/tab-free-thankyou.html',
        controller: 'ThankyouCtrl'
      }
    }
  })

  .state('tab.discount', {
    url: '/discount',
    views: {
      'tab-discount': {
        templateUrl: 'templates/tab-discount.html',
        controller: 'DiscountCtrl'
      }
    }
  })

  .state('tab.discount2', {
    url: '/discount2',
    views: {
      'tab-discount2': {
        templateUrl: 'templates/tab-discount2.html',
        controller: 'Discount2Ctrl'
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});

angular.module("starter.controllers", ['ngOpenFB']);
