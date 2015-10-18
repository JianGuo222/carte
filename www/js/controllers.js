angular.module('starter.controllers')

.controller('DashCtrl', function($scope, Posts) {

  var promise = Posts.getAll();
  promise.then(function (response) {
    $scope.items = response;
    $scope.paging = Posts.getPaging();
  });
  $scope.loadMore = function() {
    console.log('called');
    if(typeof $scope.paging != "undefined" && typeof $scope.paging.next != "undefined"){
      var promise2 = Posts.loadmore();
      promise2.then(function(response){
        $scope.items = response;

        $scope.$broadcast('scroll.infiniteScrollComplete');
        // $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    }
  };

  $scope.moreDataCanBeLoaded = function() {
    return Posts.hasmore();
  };

  // $scope.$on('$stateChangeSuccess', function() {
  //   $scope.loadMore();
  // });

  $scope.doRefresh = function() {
    var promise3 = Posts.getAll();
    promise3.then(function (response) {
      $scope.items = response;
      $scope.paging = Posts.getPaging();
      $scope.$broadcast('scroll.refreshComplete');
    });
  };
})

.controller('PostDetailCtrl', function($scope, $stateParams, Posts, $ionicHistory) {
  $scope.post = Posts.get($stateParams.postId);

  $scope.swipe = function (direction) {
    if(direction == 'right')
    $ionicHistory.goBack();
  }
})

.controller('DiscountCtrl', function($scope, $state, $cordovaDevice, $cordovaBarcodeScanner, $http, Discount, $ionicModal,  $ionicPopup, $ionicPlatform) {
  var uuid;
  var member;

  var promiseC = Discount.getPage('discount');
  promiseC.then(function(response){
    $scope.discountC = response[0].content;
  });

  $scope.$on('$ionicView.enter', function(e) {
    var promiseC = Discount.getPage('discount');
    promiseC.then(function(response){
      $scope.discountC = response[0].content;
    });
  });

  // dev only
  // uuid = 'xxx';
  // var promise = Discount.getCount(uuid);
  // promise.then(function (response) {
  //   $scope.count = response.count;
  //   member = response;
  // }, function(res){
  //   var promiseN = Discount.createNewMember(uuid);
  //   promiseN.then(function(response){
  //     $scope.count = response.count;
  //     member = response;
  //   });
  // });
  //
  // $scope.$on('$ionicView.enter', function(e) {
  //   var promise = Discount.getCount(uuid);
  //   promise.then(function (response) {
  //     $scope.count = response.count;
  //     member = response;
  //   });
  // });

  // dev only end

  document.addEventListener("deviceready", function () {
    uuid = $cordovaDevice.getUUID();
    var promise = Discount.getCount(uuid);
    promise.then(function (response) {
      $scope.count = response.count;
      member = response;
    }, function(res){
      var promiseN = Discount.createNewMember(uuid);
      promiseN.then(function(response){
        $scope.count = response.count;
        member = response;
      });
    });

    $scope.$on('$ionicView.enter', function(e) {
      var promise = Discount.getCount(uuid);
      promise.then(function (response) {
        $scope.count = response.count;
        member = response;
      });
    });
  }, false);

  $scope.scan = function() {

    // dev only
    // Discount.updateCount(member);
    // $state.go($state.current, {}, {reload: true});
    // dev only end

    document.addEventListener("deviceready", function () {
      var uuid = $cordovaDevice.getUUID();
      console.log('uuid: '+uuid);
      $cordovaBarcodeScanner.scan().then(function(imageData) {
        // alert(imageData.text);
        if(typeof imageData != 'undefined' && typeof imageData.text != 'undefined'){
          var promiseQr = Discount.getPage('discount-qr');
          promiseQr.then(function(response){
            if(imageData.text == response[0].content){
              Discount.updateCount(member);
              $state.go($state.current, {}, {reload: true});
            }else{
              alert('Please try again!');
            }
          });
        }else{
          alert('Please try again!');
        }
        console.log("Barcode Format -> " + imageData.format);
        console.log("Cancelled -> " + imageData.cancelled);
      }, function(error) {
        console.log("An error happened -> " + error);
      });
    });
  }
})

.controller('Discount2Ctrl', function($scope, $state, $cordovaDevice, $cordovaBarcodeScanner, $http, Discount, $ionicModal,  $ionicPopup) {
  var uuid;
  var member;

  var promiseC = Discount.getPage('discount-carte');
  promiseC.then(function(response){
    $scope.discountC = response[0].content;
  });

  $scope.$on('$ionicView.enter', function(e) {
    var promiseC = Discount.getPage('discount-carte');
    promiseC.then(function(response){
      $scope.discountC = response[0].content;
    });
  });

  // dev only
  // uuid = 'xxx';
  // var promise = Discount.getCount(uuid);
  // promise.then(function (response) {
  //   $scope.count = response.count2;
  //   member = response;
  // }, function(res){
  //   var promiseN = Discount.createNewMember(uuid);
  //   promiseN.then(function(response){
  //     $scope.count = response.count2;
  //     member = response;
  //   });
  // });
  //
  // $scope.$on('$ionicView.enter', function(e) {
  //   var promise = Discount.getCount(uuid);
  //   promise.then(function (response) {
  //     $scope.count = response.count2;
  //     member = response;
  //   });
  // });

  // dev only end

  document.addEventListener("deviceready", function () {
    uuid = $cordovaDevice.getUUID();
    var promise = Discount.getCount(uuid);
    promise.then(function (response) {
      $scope.count = response.count2;
      member = response;
    }, function(res){
      var promiseN = Discount.createNewMember(uuid);
      promiseN.then(function(response){
        $scope.count = response.count2;
        member = response;
      });
    });

    $scope.$on('$ionicView.enter', function(e) {
      var promise = Discount.getCount(uuid);
      promise.then(function (response) {
        $scope.count = response.count2;
        member = response;
      });
    });
  });

  $scope.scan = function() {

    // dev only
    // Discount.updateCount2(member);
    // $state.go($state.current, {}, {reload: true});
    // dev only end

    document.addEventListener("deviceready", function () {
      var uuid = $cordovaDevice.getUUID();
      console.log('uuid: '+uuid);
      $cordovaBarcodeScanner.scan().then(function(imageData) {
        // alert(imageData.text);
        if(typeof imageData != 'undefined' && typeof imageData.text != 'undefined'){
          var promiseQr = Discount.getPage('discount-qr2');
          promiseQr.then(function(response){
            if(imageData.text == response[0].content){
              Discount.updateCount2(member);
              $state.go($state.current, {}, {reload: true});
            }else{
              alert('Please try again!');
            }
          });
        }else{
          alert('Please try again!');
        }
        console.log("Barcode Format -> " + imageData.format);
        console.log("Cancelled -> " + imageData.cancelled);
      }, function(error) {
        console.log("An error happened -> " + error);
      });
    });
  }
})

.controller('FreeCtrl', function($scope, Free, ngFB, $state) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});


  var promise_switch = Free.getFreeSwitch();
  $scope.showContent = false;
  $scope.showCountdown = false;

  $scope.differenceInDays = function() {
      var dt1 = $scope.firstdate.split('/'),
          dt2 = $scope.seconddate.split('/'),
          one = new Date(dt1[2], dt1[1]-1, dt1[0]),
          two = new Date(dt2[2], dt2[1]-1, dt2[0]);

      var millisecondsPerDay = 1000 * 60 * 60 * 24;
      var millisBetween = two.getTime() - one.getTime();
      var days = millisBetween / millisecondsPerDay;

      return Math.floor(days);
  };

  // Free.activateUser();

  $scope.fbLogin = function () {
    ngFB.login({scope: 'email,public_profile,user_likes'}).then(
      function (response) {
        if (response.status === 'connected') {
          console.log('Facebook login succeeded');

          $state.go('tab.free-upload-timetable');
        } else {
          alert('Facebook login failed');
          $state.go('tab.dash');
        }
      });
    };

    promise_switch.then(function(data){
      if(data.status == 'on'){
        var promise = Free.getPage('intro');
        promise.then(function(response){
          $scope.free = response[0].content;
          $scope.showContent = true;
          $scope.showCountdown = false;
        });

      }else{
        $scope.info = data.info;
        $scope.showContent = false;
        $scope.showCountdown = true;

        var promiseC = Free.getPage('countdown');
        promiseC.then(function(response){
          $scope.firstdate = new Date().getDate()+'/'+(new Date().getMonth()+1)+'/'+new Date().getFullYear();
          $scope.seconddate = response[0].content;
          $scope.diff = $scope.differenceInDays();
        });
      }
    });

    $scope.$on('$ionicView.enter', function(e) {
      var promise_switch = Free.getFreeSwitch();
      $scope.showContent = false;
      promise_switch.then(function(data){
        if(data.status == 'on'){
          var promise = Free.getPage('intro');
          promise.then(function(response){
            $scope.free = response[0].content;
            $scope.showContent = true;
            $scope.showCountdown = false;
          });
        }else{
          $scope.info = data.info;
          $scope.showContent = false;
          $scope.showCountdown = true;

          var promiseC = Free.getPage('countdown');
          promiseC.then(function(response){
            $scope.firstdate = new Date().getDate()+'/'+(new Date().getMonth()+1)+'/'+new Date().getFullYear();
            $scope.seconddate = response[0].content;
            $scope.diff = $scope.differenceInDays();
          });
        }
      });
    });

  })

  .controller('UploadCtrl', function($scope, ngFB, $state, $cordovaCamera, $http, $ionicModal,  $ionicPopup, $timeout, Free) {
    $scope.uploadbtn = "Take a picture";
    $scope.uploadbtn2 = "Pick a picture";
    $scope.skip = false;
    $scope.user = {};
    ngFB.api({
      path: '/me',
      params: {fields: 'id,name,email,gender,age_range'}
    }).then(
      function (user) {
        $scope.user = user;

        // check if user is in blacklist
        var promiseB = Free.getUserById($scope.user.id);
        promiseB.then(function(response){
          if(response[0] && typeof response[0].images != 'undefined' && response[0].images != ''){
            // already have image uploaded
            $scope.skip = true;
          }
          if(response[0] && response[0].blacklist == 'yes'){
            // the user is in blacklist, prevent him from continuing
            var alertPopup = $ionicPopup.alert({
              title: 'Warning',
              template: 'Access denied! Please contact our store staff for help.',
              okText: 'Okay',
              okType: 'button-assertive'
            });

            alertPopup.then(function(res) {
              $state.go('tab.free');
            });
          }else{
            // user is not in blacklist

            // check if user has already attended this event
            if(response[0] && response[0].counter == '1'){
              var alertPopup = $ionicPopup.alert({
                title: 'Oops!',
                template: 'You\'ve already claimed your free crepes for this event. Please follow us for our next free event.',
                okText: 'Okay',
                okType: 'button-assertive'
              });

              alertPopup.then(function(res) {
                $state.go('tab.free');
              });
            }else{


              // check if user has entered student.unimelb.edu.au email
              if(response[0] && response[0].unimelb){
                var promise = Free.getPage('step2');
                promise.then(function(response){
                  $scope.free = response[0].content;
                });

                $scope.$on('$ionicView.enter', function(e) {
                  var promise = Free.getPage('step2');
                  promise.then(function(response){
                    $scope.free = response[0].content;
                  });
                  var promiseB2 = Free.getUserById($scope.user.id);
                  promiseB2.then(function(response){
                    if(response[0] && typeof response[0].images != 'undefined' && response[0].images != ''){
                      // already have image uploaded
                      $scope.skip = true;
                    }
                    if(response[0] && response[0].counter == '1'){
                      var alertPopup = $ionicPopup.alert({
                        title: 'Oops!',
                        template: 'You\'ve already claimed your free crepes for this event. Please follow us for our next free event.',
                        okText: 'Okay',
                        okType: 'button-assertive'
                      });

                      alertPopup.then(function(res) {
                        $state.go('tab.free');
                      });
                    }
                  });
                });

                // 1. make user like the page
                var alertPopup = $ionicPopup.alert({
                  title: 'Like us on facebook to continue',
                  template: '<div style="text-align: center"><iframe width="49" height="20" scroll="no" src="https://www.facebook.com/v2.4/plugins/like.php?action=like&app_id=176740972660104&channel=http%3A%2F%2Fstatic.ak.facebook.com%2Fconnect%2Fxd_arbiter%2F44OwK74u0Ie.js%3Fversion%3D41%23cb%3Df209f4f774%26domain%3Dlocalhost%26origin%3Dhttp%253A%252F%252Flocalhost%253A8100%252Ff70f43d4%26relation%3Dparent.parent&container_width=230&href=https%3A%2F%2Fwww.facebook.com%2Fcartecrepes&layout=button&locale=en_US&sdk=joey&share=false&show_faces=false"></iframe></div>',
                  okText: 'Okay',
                  okType: 'button-calm'
                });

                // $timeout(function(){
                //   FB.XFBML.parse();
                // }, 0);

                alertPopup.then(function(res) {
                  // 2. check user permission
                  ngFB.api({
                    path: '/'+$scope.user.id+'/permissions'
                  }).then(
                    function (res) {
                      // console.log(res);
                      res = res.data;
                      if(res.length)
                      {
                        var isGranted = false;
                        for(var i=0; i<res.length; i++){
                          if(res[i].permission && res[i].permission == 'user_likes'){
                            if(res[i].status=='granted'){
                              // user has granted user_likes permission
                              isGranted = true;
                              break;
                            }
                          }
                        }

                        if(isGranted){
                          // 3. check if the user liked the page
                          ngFB.api({
                            path: '/'+$scope.user.id+'/likes'
                          }).then(
                            function (res) {
                              // console.log(res);
                              var hasLiked = false;
                              res = res.data;
                              for(var i=0; i<res.length; i++){
                                if(res[i].name && res[i].name.indexOf('Carte')>=0){
                                  hasLiked = true;
                                  break;
                                }
                              }
                              if(!hasLiked){
                                // re-asking user to like the page
                                var alertPopup2 = $ionicPopup.alert({
                                  title: 'Please like us by clicking the Like below to continue',
                                  template: '<div style="text-align: center"><iframe width="49" height="20" scroll="no" src="https://www.facebook.com/v2.4/plugins/like.php?action=like&app_id=176740972660104&channel=http%3A%2F%2Fstatic.ak.facebook.com%2Fconnect%2Fxd_arbiter%2F44OwK74u0Ie.js%3Fversion%3D41%23cb%3Df209f4f774%26domain%3Dlocalhost%26origin%3Dhttp%253A%252F%252Flocalhost%253A8100%252Ff70f43d4%26relation%3Dparent.parent&container_width=230&href=https%3A%2F%2Fwww.facebook.com%2Fcartecrepes&layout=button&locale=en_US&sdk=joey&share=false&show_faces=false"></iframe></div>',
                                  okText: 'Okay',
                                  okType: 'button-calm'
                                });

                                // $timeout(function(){
                                //   FB.XFBML.parse();
                                // }, 0);

                                alertPopup2.then(function(res){
                                  // 4. re check if user liked the page
                                  ngFB.api({
                                    path: '/'+$scope.user.id+'/likes'
                                  }).then(
                                    function (res) {
                                      // console.log(res);
                                      var hasLiked = false;
                                      res = res.data;
                                      for(var i=0; i<res.length; i++){
                                        if(res[i].name && res[i].name.indexOf('Carte')>=0){
                                          hasLiked = true;
                                          break;
                                        }
                                      }
                                      if(!hasLiked){
                                        // re-asking user to like the page
                                        var alertPopup3 = $ionicPopup.alert({
                                          title: 'Please like us by clicking the Like below to continue',
                                          template: '<div style="text-align: center"><iframe width="49" height="20" scroll="no" src="https://www.facebook.com/v2.4/plugins/like.php?action=like&app_id=176740972660104&channel=http%3A%2F%2Fstatic.ak.facebook.com%2Fconnect%2Fxd_arbiter%2F44OwK74u0Ie.js%3Fversion%3D41%23cb%3Df209f4f774%26domain%3Dlocalhost%26origin%3Dhttp%253A%252F%252Flocalhost%253A8100%252Ff70f43d4%26relation%3Dparent.parent&container_width=230&href=https%3A%2F%2Fwww.facebook.com%2Fcartecrepes&layout=button&locale=en_US&sdk=joey&share=false&show_faces=false"></iframe></div>',
                                          okText: 'Okay',
                                          okType: 'button-calm'
                                        });
                                        alertPopup3.then(function(res){
                                          ngFB.api({
                                            path: '/'+$scope.user.id+'/likes'
                                          }).then(
                                            function (res) {
                                              // console.log(res);
                                              var hasLiked = false;
                                              res = res.data;
                                              for(var i=0; i<res.length; i++){
                                                if(res[i].name && res[i].name.indexOf('Carte')>=0){
                                                  hasLiked = true;
                                                  break;
                                                }
                                              }
                                              if(!hasLiked){
                                                user.liked = 'no';
                                                Free.saveUserToDB(user);
                                              }else{
                                                // all good
                                                user.liked = 'yes';
                                                Free.saveUserToDB(user);
                                              }
                                            }
                                          );

                                        });

                                        // $timeout(function(){
                                        //   FB.XFBML.parse();
                                        // }, 0);

                                      }else{
                                        // all good
                                        user.liked = 'yes';
                                        Free.saveUserToDB(user);
                                      }
                                    }
                                  );
                                });
                              }else{
                                // all good
                                // save some data to db
                                user.liked = 'yes';
                                Free.saveUserToDB(user);
                              }
                            }
                          );
                        }else{
                          // user_likes permission not granted, can't check use likes
                          console.log('no user_likes permission granted');

                          // save some data to db
                          user.liked = 'n/a';
                          Free.saveUserToDB(user);
                        }
                      }
                    }
                  );

                });
              }else{
                // ask user for unimelb email
                var myPopup = $ionicPopup.show({
                  template: '<input type="email" id="unimelb" style="width: 60px; display: inline-block;"> @student.unimelb.edu.au',
                  title: 'Enter your email',
                  subTitle: 'Please use your student email name',
                  scope: $scope,
                  buttons: [
                    {
                      text: '<b>Save</b>',
                      type: 'button-positive',
                      onTap: function(e) {
                        if (document.getElementById('unimelb').value == '') {
                          //don't allow the user to close unless he enters wifi password
                          e.preventDefault();
                        } else {
                          return document.getElementById('unimelb').value;
                        }
                      }
                    }
                  ]
                });
                myPopup.then(function(res) {
                  // console.log('Tapped!', res);
                  // $state.go($state.current, {}, {reload: true});
                  user.unimelb = res+'@student.unimelb.edu.au';

                  // send activation email to this email address
                  var eo = {};
                  eo.email = res+'@student.unimelb.edu.au';
                  // eo.email = 'chalmers.chester@gmail.com';
                  eo.id = user.id;
                  Free.sendEmail(eo);

                  alert('An activiation email has been sent to '+res+'@student.unimelb.edu.au');

                  var promise = Free.getPage('step2');
                  promise.then(function(response){
                    $scope.free = response[0].content;
                  });

                  $scope.$on('$ionicView.enter', function(e) {
                    var promise = Free.getPage('step2');
                    promise.then(function(response){
                      $scope.free = response[0].content;
                    });
                    var promiseB2 = Free.getUserById($scope.user.id);
                    promiseB2.then(function(response){
                      if(response[0] && typeof response[0].images != 'undefined' && response[0].images != ''){
                        // already have image uploaded
                        $scope.skip = true;
                      }
                      if(response[0] && response[0].counter == '1'){
                        var alertPopup = $ionicPopup.alert({
                          title: 'Oops!',
                          template: 'You\'ve already claimed your free crepes for this event. Please follow us for our next free event.',
                          okText: 'Okay',
                          okType: 'button-assertive'
                        });

                        alertPopup.then(function(res) {
                          $state.go('tab.free');
                        });
                      }
                    });
                  });

                  // 1. make user like the page
                  var alertPopup = $ionicPopup.alert({
                    title: 'Like us on facebook to continue',
                    template: '<div style="text-align: center"><iframe width="49" height="20" scroll="no" src="https://www.facebook.com/v2.4/plugins/like.php?action=like&app_id=176740972660104&channel=http%3A%2F%2Fstatic.ak.facebook.com%2Fconnect%2Fxd_arbiter%2F44OwK74u0Ie.js%3Fversion%3D41%23cb%3Df209f4f774%26domain%3Dlocalhost%26origin%3Dhttp%253A%252F%252Flocalhost%253A8100%252Ff70f43d4%26relation%3Dparent.parent&container_width=230&href=https%3A%2F%2Fwww.facebook.com%2Fcartecrepes&layout=button&locale=en_US&sdk=joey&share=false&show_faces=false"></iframe></div>',
                    okText: 'Okay',
                    okType: 'button-calm'
                  });

                  // $timeout(function(){
                  //   FB.XFBML.parse();
                  // }, 0);

                  alertPopup.then(function(res) {
                    // 2. check user permission
                    ngFB.api({
                      path: '/'+$scope.user.id+'/permissions'
                    }).then(
                      function (res) {
                        // console.log(res);
                        res = res.data;
                        if(res.length)
                        {
                          var isGranted = false;
                          for(var i=0; i<res.length; i++){
                            if(res[i].permission && res[i].permission == 'user_likes'){
                              if(res[i].status=='granted'){
                                // user has granted user_likes permission
                                isGranted = true;
                                break;
                              }
                            }
                          }

                          if(isGranted){
                            // 3. check if the user liked the page
                            ngFB.api({
                              path: '/'+$scope.user.id+'/likes'
                            }).then(
                              function (res) {
                                // console.log(res);
                                var hasLiked = false;
                                res = res.data;
                                for(var i=0; i<res.length; i++){
                                  if(res[i].name && res[i].name.indexOf('Carte')>=0){
                                    hasLiked = true;
                                    break;
                                  }
                                }
                                if(!hasLiked){
                                  // re-asking user to like the page
                                  var alertPopup2 = $ionicPopup.alert({
                                    title: 'Please like us by clicking the Like below to continue',
                                    template: '<div style="text-align: center"><iframe width="49" height="20" scroll="no" src="https://www.facebook.com/v2.4/plugins/like.php?action=like&app_id=176740972660104&channel=http%3A%2F%2Fstatic.ak.facebook.com%2Fconnect%2Fxd_arbiter%2F44OwK74u0Ie.js%3Fversion%3D41%23cb%3Df209f4f774%26domain%3Dlocalhost%26origin%3Dhttp%253A%252F%252Flocalhost%253A8100%252Ff70f43d4%26relation%3Dparent.parent&container_width=230&href=https%3A%2F%2Fwww.facebook.com%2Fcartecrepes&layout=button&locale=en_US&sdk=joey&share=false&show_faces=false"></iframe></div>',
                                    okText: 'Okay',
                                    okType: 'button-calm'
                                  });

                                  // $timeout(function(){
                                  //   FB.XFBML.parse();
                                  // }, 0);

                                  alertPopup2.then(function(res){
                                    // 4. re check if user liked the page
                                    ngFB.api({
                                      path: '/'+$scope.user.id+'/likes'
                                    }).then(
                                      function (res) {
                                        // console.log(res);
                                        var hasLiked = false;
                                        res = res.data;
                                        for(var i=0; i<res.length; i++){
                                          if(res[i].name && res[i].name.indexOf('Carte')>=0){
                                            hasLiked = true;
                                            break;
                                          }
                                        }
                                        if(!hasLiked){
                                          // re-asking user to like the page
                                          var alertPopup3 = $ionicPopup.alert({
                                            title: 'Please like us by clicking the Like below to continue',
                                            template: '<div style="text-align: center"><iframe width="49" height="20" scroll="no" src="https://www.facebook.com/v2.4/plugins/like.php?action=like&app_id=176740972660104&channel=http%3A%2F%2Fstatic.ak.facebook.com%2Fconnect%2Fxd_arbiter%2F44OwK74u0Ie.js%3Fversion%3D41%23cb%3Df209f4f774%26domain%3Dlocalhost%26origin%3Dhttp%253A%252F%252Flocalhost%253A8100%252Ff70f43d4%26relation%3Dparent.parent&container_width=230&href=https%3A%2F%2Fwww.facebook.com%2Fcartecrepes&layout=button&locale=en_US&sdk=joey&share=false&show_faces=false"></iframe></div>',
                                            okText: 'Okay',
                                            okType: 'button-calm'
                                          });
                                          alertPopup3.then(function(res){
                                            ngFB.api({
                                              path: '/'+$scope.user.id+'/likes'
                                            }).then(
                                              function (res) {
                                                // console.log(res);
                                                var hasLiked = false;
                                                res = res.data;
                                                for(var i=0; i<res.length; i++){
                                                  if(res[i].name && res[i].name.indexOf('Carte')>=0){
                                                    hasLiked = true;
                                                    break;
                                                  }
                                                }
                                                if(!hasLiked){
                                                  user.liked = 'no';
                                                  Free.saveUserToDB(user);
                                                }else{
                                                  // all good
                                                  user.liked = 'yes';
                                                  Free.saveUserToDB(user);
                                                }
                                              }
                                            );

                                          });

                                          // $timeout(function(){
                                          //   FB.XFBML.parse();
                                          // }, 0);

                                        }else{
                                          // all good
                                          user.liked = 'yes';
                                          Free.saveUserToDB(user);
                                        }
                                      }
                                    );
                                  });
                                }else{
                                  // all good
                                  // save some data to db
                                  user.liked = 'yes';
                                  Free.saveUserToDB(user);
                                }
                              }
                            );
                          }else{
                            // user_likes permission not granted, can't check use likes
                            console.log('no user_likes permission granted');

                            // save some data to db
                            user.liked = 'n/a';
                            Free.saveUserToDB(user);
                          }
                        }
                      }
                    );

                  });
                });
              }
            }

          }
        });



      },
      function (error) {
        alert('Facebook error: ' + error.error_description);
        $state.go('tab.free');
      });

      $scope.gotoNext = function(){
        $state.go('tab.free-scan');
      }

      $scope.openPhotoLibrary = function(st) {
        // var imageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCNEQ0MkU0QkU4MUQxMUUyQjM2ODkyQTRBQUQwNzkwQSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCNEQ0MkU0Q0U4MUQxMUUyQjM2ODkyQTRBQUQwNzkwQSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjg2RDQ1QzM2RTgxRDExRTJCMzY4OTJBNEFBRDA3OTBBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkI0RDQyRTRBRTgxRDExRTJCMzY4OTJBNEFBRDA3OTBBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+xXvzHgAAB3lJREFUeNrsWwls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';
        // dev only
        // var userData = $scope.user;
        // userData.images = '55f6c1a44854f.jpeg';
        // var promise = Free.getPage('date');
        // promise.then(function(response){
        //   var sel = response[0].content;
        //   if(sel==''){
        //     Free.updateUser(userData);
        //     $state.go('tab.free-scan');
        //   }else{
        //     // select last exam Date
        //     var myPopup = $ionicPopup.show({
        //       template: sel,
        //       title: 'Select your last exam date',
        //       subTitle: 'Please ensure it\'s consistent with the timetable you uploaded',
        //       scope: $scope,
        //       buttons: [
        //         {
        //           text: '<b>Save</b>',
        //           type: 'button-positive',
        //           onTap: function(e) {
        //             if (document.getElementById('examDate').value == '') {
        //               //don't allow the user to close unless he enters wifi password
        //               e.preventDefault();
        //             } else {
        //               return document.getElementById('examDate').value;
        //             }
        //           }
        //         }
        //       ]
        //     });
        //     myPopup.then(function(res) {
        //       // save date to
        //       userData.date = res;
        //       Free.updateUser(userData);
        //       $state.go('tab.free-scan');
        //     });
        //
        //   }
        // });

        // dev only ends

        document.addEventListener("deviceready", function () {
          var options = {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: st==0?Camera.PictureSourceType.CAMERA:Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 1024,
            targetHeight: 1024,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
          };

          $cordovaCamera.getPicture(options).then(function(imageData) {
            // var image = document.getElementById('myImage');
            // image.src = "data:image/jpeg;base64," + imageData;

            // $scope.img = imageData;
            var url = 'http://www.cartecrepes.com.au/upload.php';
            $scope.uploadbtn = "Uploading";
            $scope.uploadbtn2 = "Uploading";
            $http.post(url, {img: "data:image/jpeg;base64," + imageData}).success(function (data, status) {
              // console.log('upload successfully' + data);
              // save data to db
              var userData = $scope.user;
              userData.images = data;

              var promise = Free.getPage('date');
              promise.then(function(response){
                var sel = response[0].content;
                if(sel==''){
                  Free.updateUser(userData);
                  $state.go('tab.free-scan');
                }else{
                  // select last exam Date
                  var myPopup = $ionicPopup.show({
                    template: sel,
                    title: 'Select your last exam date',
                    subTitle: 'Please ensure it\'s consistent with the timetable you uploaded',
                    scope: $scope,
                    buttons: [
                      {
                        text: '<b>Save</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                          if (document.getElementById('examDate').value == '') {
                            //don't allow the user to close unless he enters wifi password
                            e.preventDefault();
                          } else {
                            return document.getElementById('examDate').value;
                          }
                        }
                      }
                    ]
                  });
                  myPopup.then(function(res) {
                    // save date to database
                    userData.date = res;
                    Free.updateUser(userData);
                    $scope.uploadbtn = "Take a picture";
                    $scope.uploadbtn2 = "Pick a picture";
                    $state.go('tab.free-scan');
                  });
                }
              });

            }).error(function (data, status) {
              alert('Photo upload failed! Please make sure you have an internet connection and try again.');
            });

          }, function(err) {
            // error
          });

        }, false);

      }
    })

    .controller('ScanCtrl', function($scope, ngFB, $state, $cordovaBarcodeScanner, $http, Free, $ionicModal,  $ionicPopup) {
      ngFB.api({
        path: '/me',
        params: {fields: 'id,name,email,location,birthday,gender,age_range'}
      }).then(
        function (user) {
          $scope.user = user;
        },
        function (error) {
          alert('Facebook error: ' + error.error_description);
          $state.go('tab.free');
        });

        var promise = Free.getPage('step3');
        promise.then(function(response){
          $scope.free = response[0].content;
        });

        $scope.$on('$ionicView.enter', function(e) {
          var promise = Free.getPage('step3');
          promise.then(function(response){
            $scope.free = response[0].content;
          });
        });

        $scope.scan = function() {
          // var imageData = {};
          // imageData.text = 'carte';
          // if(typeof imageData != 'undefined' && typeof imageData.text != 'undefined'){
          //   if(imageData.text == 'carte'){


          //   }
          // }

          // check if already scanned
          var promiseB = Free.getUserById($scope.user.id);
          promiseB.then(function(response){
            if(response[0] && response[0].counter == '1'){
              var alertPopup = $ionicPopup.alert({
                title: 'Oops!',
                template: 'You\'ve already claimed your free crepes for this event. Please follow us for our next free event.',
                okText: 'Okay',
                okType: 'button-assertive'
              });

              alertPopup.then(function(res) {
                $state.go('tab.free');
              });
            }else{
              var exam_date = '';
              if(response[0] && typeof response[0].date != 'undefined' && response[0].date != ''){
                exam_date = response[0].date;
              }
              // check if it's exam event
              var promise = Free.getPage('date');
              promise.then(function(response){
                var sel = response[0].content;
                // check if date match
                var current_date = new Date().getDate()+'/'+(new Date().getMonth()+1)+'/'+new Date().getFullYear();
                if(sel != '' && exam_date != current_date){
                  var alertPopup = $ionicPopup.alert({
                    title: 'Oops!',
                    template: 'Please claim your free crepes on the date you selected.',
                    okText: 'Okay',
                    okType: 'button-assertive'
                  });

                  alertPopup.then(function(res) {
                    $state.go('tab.free');
                  });
                }else{
                  // dev only
                  // var promiseQr = Free.getPage('qr');
                  // promiseQr.then(function(response){
                  //   if('carte' == response[0].content){
                  //     var userData = $scope.user;
                  //     userData.counter = '1';
                  //     userData.done = 'waiting';
                  //
                  //     // ask user to order
                  //     var promise = Free.getPage('orders');
                  //     promise.then(function(response){
                  //       var sel = response[0].content;
                  //       if(sel==''){
                  //         Free.updateUser(userData);
                  //         $state.go('tab.free-thankyou');
                  //       }else{
                  //         // select last exam Date
                  //         var myPopup = $ionicPopup.show({
                  //           template: sel,
                  //           title: 'Select your order',
                  //           subTitle: 'Please select the type of crepes you like',
                  //           scope: $scope,
                  //           buttons: [
                  //             {
                  //               text: '<b>Save</b>',
                  //               type: 'button-positive',
                  //               onTap: function(e) {
                  //                 if (document.getElementById('orders').value == '') {
                  //                   //don't allow the user to close unless he enters wifi password
                  //                   e.preventDefault();
                  //                 } else {
                  //                   return document.getElementById('orders').value;
                  //                 }
                  //               }
                  //             }
                  //           ]
                  //         });
                  //         myPopup.then(function(res) {
                  //           // save date to
                  //           userData.order = res;
                  //           Free.updateUser(userData);
                  //           $state.go('tab.free-thankyou');
                  //         });
                  //
                  //       }
                  //     });
                  //
                  //
                  //   }else{
                  //     alert('Please try again!');
                  //   }
                  // });

                  // dev only ends


                  document.addEventListener("deviceready", function () {
                    $cordovaBarcodeScanner.scan().then(function(imageData) {
                      // alert(imageData.text);
                      if(typeof imageData != 'undefined' && typeof imageData.text != 'undefined'){
                        var promiseQr = Free.getPage('qr');
                        promiseQr.then(function(response){
                          if(imageData.text == response[0].content){
                            var userData = $scope.user;
                            userData.counter = '1';
                            userData.done = 'waiting';
                            // ask user to order
                            var promise = Free.getPage('orders');
                            promise.then(function(response){
                              var sel = response[0].content;
                              if(sel==''){
                                Free.updateUser(userData);
                                $state.go('tab.free-thankyou');
                              }else{
                                // select last exam Date
                                var myPopup = $ionicPopup.show({
                                  template: sel,
                                  title: 'Select your order',
                                  subTitle: 'Please select the type of crepes you like',
                                  scope: $scope,
                                  buttons: [
                                    {
                                      text: '<b>Save</b>',
                                      type: 'button-positive',
                                      onTap: function(e) {
                                        if (document.getElementById('orders').value == '') {
                                          //don't allow the user to close unless he enters wifi password
                                          e.preventDefault();
                                        } else {
                                          return document.getElementById('orders').value;
                                        }
                                      }
                                    }
                                  ]
                                });
                                myPopup.then(function(res) {
                                  // save date to
                                  userData.order = res;
                                  Free.updateUser(userData);
                                  $state.go('tab.free-thankyou');
                                });

                              }
                            });
                          }else{
                            alert('Please try again!');
                          }
                        });
                      }else{
                        alert('Please try again!');
                      }
                      console.log("Barcode Format -> " + imageData.format);
                      console.log("Cancelled -> " + imageData.cancelled);
                    }, function(error) {
                      console.log("An error happened -> " + error);
                    });
                  });
                }
              });

            }
          });
        }
      })

      .controller('ThankyouCtrl', function($scope, ngFB, $state, $cordovaBarcodeScanner, $http, Free) {
        var promise = Free.getPage('step4');
        promise.then(function(response){
          $scope.free = response[0].content;
        });

        $scope.$on('$ionicView.enter', function(e) {
          var promise = Free.getPage('step4');
          promise.then(function(response){
            $scope.free = response[0].content;
          });
        });
      })

      .controller('AccountCtrl', function($scope, About, $state, $ionicModal,  $ionicPopup, $timeout) {
        // $scope.settings = {
        //   enableFriends: true
        // };
        var promise = About.getPage();
        promise.then(function(response){
          $scope.about = response[0].content;
        });

        $scope.$on('$ionicView.enter', function(e) {
          var promise = About.getPage();
          promise.then(function(response){
            $scope.about = response[0].content;
          });

          $scope.checkbtn='Check for updates';
        });

        // document.addEventListener("deviceready", function () {
          var deploy = new Ionic.Deploy();
          // $scope.hasUpdate = true;
          $scope.checkbtn='Check for updates';

          // Check Ionic Deploy for new code
          $scope.checkForUpdates = function() {
            console.log('Ionic Deploy: Checking for updates');
            $scope.checkbtn='Checking for updates';

            deploy.check().then(function(hasUpdate) {
              if(hasUpdate){
                alert('Update available! Please click ok to install and donot close this window.');
                document.getElementById('updateButton').innerHTML = 'Downloading update';
                deploy.update().then(function(res) {
                  alert('Update Success');
                  // console.log('Ionic Deploy: Update Success! ', res);
                }, function(err) {
                  document.getElementById('updateButton').innerHTML='No updates';
                  // console.log('Ionic Deploy: Update error! ', err);
                }, function(prog) {
                  document.getElementById('updateButton').innerHTML = 'Downloading update - '+prog + '%';
                  // console.log('Ionic Deploy: Progress... ', prog);
                });
              }else{
                document.getElementById('updateButton').innerHTML='No updates';
              }

            }, function(err) {
              // $scope.checkbtn='Check for updates';
              document.getElementById('updateButton').innerHTML='No updates';
              alert('Ionic Deploy: Unable to check for updates', err);
            });
          }
        // });

      });
