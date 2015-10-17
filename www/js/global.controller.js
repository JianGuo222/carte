angular.module('starter.controllers')
.controller('GlobalCtrl',  function($scope, $rootScope, $ionicModal,  $ionicPopup, $window) {
  $rootScope.$watch('hasInternet', function(newValue) {
    $scope.hasInternet = newValue;
    if(!newValue){
      var alertPopup = $ionicPopup.alert({
        title: 'Network Error',
        template: 'Please make sure you have internet access!',
        okText: 'Retry',
        okType: 'button-assertive'
      });
      alertPopup.then(function(res) {
        $window.location.href='#/tab/dash';
        $window.location.reload();
      });
    }
  });

  $rootScope.$watch('mainSwitch', function(newValue) {
    if(newValue==false){
      var alertPopup = $ionicPopup.alert({
        title: 'Oops!',
        template: $rootScope.mainSwitchInfo,
        okText: 'Close',
        okType: 'button-assertive'
      });
      alertPopup.then(function(res) {
        $window.location.href='#/tab/dash';
        $window.location.reload();
      });
    }
  });

});
