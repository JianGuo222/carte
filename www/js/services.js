angular.module('starter.services', ['config'])
.factory('Posts', function($http, $q, ENV, $rootScope) {
  var name = 'cartecrepes',
  accessToken = '176740972660104',
  secretKey = '99a32e0c87fe01a08686f20154102e04';
  var posts = [];
  var paging = {};

  var haveMore=true;

  var checkMainSwitch = function(){
    var url =  ENV.apiEndpoint + 'api/mainSwitchs/main';
    $http.get(url, {ignoreLoadingBar: true}).success(function (data) {
      if(data.status == 'on'){

      }else{
        $rootScope.mainSwitch = false;
        $rootScope.mainSwitchInfo = data.info;
      }
    }).error(function (data) {

    });
  };

  return {
    getAll: function() {
      checkMainSwitch();
      var deferred = $q.defer();

      $http.get('https://graph.facebook.com/v2.4/' + name + '/posts?fields=id,name,picture,full_picture,message,created_time&limit=30&access_token=' + accessToken + '|' + secretKey)
      .success(function(data){
        $rootScope.hasInternet = true;
        var items = data.data;
        paging = data.paging;
        angular.forEach(items, function(item, key){
          if(typeof item.message != "undefined"){
            item.message = item.message.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g,'');
            item.message = item.message.replace('🙌','');
            item.message = item.message.replace('😊','');
          }

          if(typeof item.picture=="undefined"){
            item.picture="img/c-logo.png";
          }else if(item.picture.indexOf('safe_image')>-1){
            item.picture="img/c-logo.png";
          }
        });
        posts = items;
        deferred.resolve(items);

      }).error(function(){
        $rootScope.hasInternet = false;
        var items = [{
          "message": "Opps! There was a problem loading the feed!",
        }];
        deferred.reject(items);
      });

      return deferred.promise;
    },

    getPaging: function(){
      return paging;
    },

    hasmore: function(){
      return haveMore;
    },

    loadmore: function(){
      var deferred = $q.defer();

      $http.get(paging.next)
      .success(function(data){
        var items = data.data;
        if(items.length==0){
          haveMore=false;
        }else{
          paging = data.paging;
          angular.forEach(items, function(item, key){
            if(typeof item.message != "undefined"){
              item.message = item.message.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g,'');
              item.message = item.message.replace('🙌','');
              item.message = item.message.replace('😊','');
            }
            if(typeof item.picture=="undefined"){
              item.picture="img/c-logo.png";
            }else if(item.picture.indexOf('safe_image')>-1){
              item.picture="img/c-logo.png";
            }
          });
          posts = posts.concat(items);
        }
        deferred.resolve(posts);

      }).error(function(){
        var items = [{
          "message": "Opps! There was a problem loading the feed!",
        }];
        deferred.reject(items);
      });

      return deferred.promise;
    },

    get: function(postId) {
      for (var i = 0; i < posts.length; i++) {
        if (posts[i].id === postId) {
          return posts[i];
        }
      }
      return null;
    }
  };
})
.factory('About', function ($http,  $q, ENV) {

  return{
    getPage: function(){
      var deferred = $q.defer();

      $http.get(ENV.apiEndpoint+'api/pages/about').success(function (data) {
        deferred.resolve(data);
      }).error(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    }
  }
})
.factory('Discount', function ($http,  $q, ENV) {

  return{
    getCount: function(uuid){
      var deferred = $q.defer();

      $http.get(ENV.apiEndpoint+'api/discounts/'+uuid).success(function (data) {
        deferred.resolve(data);
      }).error(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    },

    createNewMember: function(uuid){
      var deferred = $q.defer();
      var member = {uuid: uuid, count: '', count2: ''};
      member.created_time = new Date().getDate()+'/'+(new Date().getMonth()+1)+'/'+new Date().getFullYear() + ' ' + new Date().getHours()+':'+new Date().getMinutes();
      $http.post(ENV.apiEndpoint+'api/discounts', member).success(function (data) {
        deferred.resolve(data);
      }).error(function (data) {
        deferred.reject(data);
      });
      return deferred.promise;
    },

    updateCount: function(member){
      var deferred = $q.defer();
      if(member.count == '8'){
        member.count = '0';
      }else if(member.count==''){
        member.count = 1;
      }else{
        member.count = parseInt(member.count)+1;
      }
      member.modified_time = new Date().getDate()+'/'+(new Date().getMonth()+1)+'/'+new Date().getFullYear() + ' ' + new Date().getHours()+':'+new Date().getMinutes();
      $http.put(ENV.apiEndpoint+'api/discounts/'+member._id, member).success(function (data) {
        deferred.resolve(data);
      }).error(function (data) {
        deferred.reject(data);
      });
      return deferred.promise;
    },

    updateCount2: function(member){
      var deferred = $q.defer();
      if(member.count2 == '8'){
        member.count2 = '0';
      }else if(member.count2==''){
        member.count2 = 1;
      }else{
        member.count2 = parseInt(member.count2)+1;
      }
      member.modified_time = new Date().getDate()+'/'+(new Date().getMonth()+1)+'/'+new Date().getFullYear() + ' ' + new Date().getHours()+':'+new Date().getMinutes();
      $http.put(ENV.apiEndpoint+'api/discounts/'+member._id, member).success(function (data) {
        deferred.resolve(data);
      }).error(function (data) {
        deferred.reject(data);
      });
      return deferred.promise;
    },

    getPage: function(category){
      var deferred = $q.defer();

      $http.get(ENV.apiEndpoint+'api/pages/'+category).success(function (data) {
        deferred.resolve(data);
      }).error(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    }
  }
})
.factory('Free', function ($http,  $q, ENV) {

  return{
    getPage: function(category){
      var deferred = $q.defer();

      $http.get(ENV.apiEndpoint+'api/pages/free-'+category).success(function (data) {
        deferred.resolve(data);
      }).error(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    },

    sendEmail: function(eo){
      $http.post(ENV.apiEndpoint+'api/sendUserEmail', eo).success(function (data) {

      }).error(function (data) {

      });
    },

    activateUser: function(){
      var data = {id: '829601767137815', activated: 'yes'};
      $http.post(ENV.apiEndpoint+'api/activateUser', data).success(function (data) {

      }).error(function (data) {

      });
    },

    getUserById: function(id){
      var deferred = $q.defer();

      $http.get(ENV.apiEndpoint+'api/students/'+id).success(function (data) {
        deferred.resolve(data);
      }).error(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    },


    getFreeSwitch: function(){
      var deferred = $q.defer();

      $http.get(ENV.apiEndpoint + 'api/mainSwitchs/free').success(function (data) {
        deferred.resolve(data);
      }).error(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    },

    saveUserToDB: function(user){
      var url =  ENV.apiEndpoint + 'api/students';
      if(typeof user.id == "undefined"){
        user.id = '';
      }
      if(typeof user.name == "undefined"){
        user.name = '';
      }
      if(typeof user.email == "undefined"){
        user.email = '';
      }
      if(typeof user.age_range == "undefined"){
        user.age_range = '';
      }else{
        if(typeof user.age_range.min != "undefined" && typeof user.age_range.max != "undefined"){
          user.age_range = 'min:'+user.age_range.min+' max:'+user.age_range.max;
        }else if(typeof user.age_range.min != "undefined"){
          user.age_range = 'min:'+user.age_range.min;
        }else if(typeof user.age_range.max != "undefined"){
          user.age_range = 'max:'+user.age_range.max;
        }
      }

      if(typeof user.images == "undefined"){
        user.images = '';
      }
      user.modified_time = new Date().getDate()+'/'+(new Date().getMonth()+1)+'/'+new Date().getFullYear() + ' ' + new Date().getHours()+':'+new Date().getMinutes();
      $http.post(url, user).success(function (data) {

      }).error(function (data) {

      });
    },

    updateUser: function(user){
      var url =  ENV.apiEndpoint + 'api/students';
      if(typeof user.id == "undefined"){
        user.id = '';
      }
      if(typeof user.name == "undefined"){
        user.name = '';
      }
      if(typeof user.email == "undefined"){
        user.email = '';
      }
      if(typeof user.age_range == "undefined"){
        user.age_range = '';
      }else{
        if(typeof user.age_range.min != "undefined" && typeof user.age_range.max != "undefined"){
          user.age_range = 'min:'+user.age_range.min+' max:'+user.age_range.max;
        }else if(typeof user.age_range.min != "undefined"){
          user.age_range = 'min:'+user.age_range.min;
        }else if(typeof user.age_range.max != "undefined"){
          user.age_range = 'max:'+user.age_range.max;
        }
      }

      if(typeof user.images == "undefined"){
        user.images = '';
      }
      user.modified_time = new Date().getDate()+'/'+(new Date().getMonth()+1)+'/'+new Date().getFullYear() + ' ' + new Date().getHours()+':'+new Date().getMinutes();
      $http.put(url, user).success(function (data) {

      }).error(function (data) {

      });
    }
  }
})
;
