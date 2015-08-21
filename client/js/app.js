var app = angular.module('uhaul', ['ui.router', 'ngResource']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl',
      resolve: {
        postPromise: ['Resources', function(Resources){
          return Resources.Orders.query();
        }]
      }
    })
    .state('orders', {
      url: '/orders/{id}',
      templateUrl: '/orders.html',
      controller: 'OrdersCtrl',
      resolve: {
        post: ['$stateParams', 'Resources', function($stateParams, Resources) {
          return Resources.Orders.get($stateParams.id);
        }]
      }
    })
    // .state('login', {
    //   url: '/login',
    //   templateUrl: '/login.html',
    //   controller: 'AuthCtrl',
    //   onEnter: ['$state', 'auth', function($state, auth){
    //     if(auth.isLoggedIn()){
    //       $state.go('home');
    //     }
    //   }]
    // })
    // .state('register', {
    //   url: '/register',
    //   templateUrl: '/register.html',
    //   controller: 'AuthCtrl',
    //   onEnter: ['$state', 'auth', function($state, auth){
    //     if(auth.isLoggedIn()){
    //       $state.go('home');
    //     }
    //   }]
    // });
  $urlRouterProvider.otherwise('home');
}]);

// app.controller('AuthCtrl', [
// '$scope',
// '$state',
// 'auth',
// function($scope, $state, auth){
//   $scope.user = {};

//   $scope.register = function(){
//     auth.register($scope.user).error(function(error){
//       $scope.error = error;
//     }).then(function(){
//       $state.go('home');
//     });
//   };

//   $scope.logIn = function(){
//     auth.logIn($scope.user).error(function(error){
//       $scope.error = error;
//     }).then(function(){
//       $state.go('home');
//     });
//   };
// }]);

// app.controller('NavCtrl', [
// '$scope',
// 'auth',
// function($scope, auth){
//   $scope.isLoggedIn = auth.isLoggedIn;
//   $scope.currentUser = auth.currentUser;
//   $scope.logOut = auth.logOut;
// }]);

app.controller('MainCtrl', [ '$scope', 'orders', function ($scope, orders) {
    $scope.title = '';
    $scope.link = '';
    $scope.posts = posts.posts;

    $scope.addPost = function () {
      if (!$scope.title || $scope.title === '') {return;}
      posts.create({
        title: $scope.title,
        link: $scope.link,
        upvotes: 0,
        comments: []
      });
      $scope.title = '';
      $scope.link = '';
    };

    $scope.incrementUpvotes = function (post) {
        posts.upvote(post);
    };

    $scope.isLoggedIn = auth.isLoggedIn;
}]);

//app.factory('auth', ['$http', '$window', function($http, $window){
//  var auth = {};

//  auth.saveToken = function (token){
//    $window.localStorage['flapper-news-token'] = token;
//  };

//  auth.getToken = function (){
//    return $window.localStorage['flapper-news-token'];
//  };

//  auth.isLoggedIn = function(){
//    var token = auth.getToken();

//    if(token){
//      var payload = JSON.parse($window.atob(token.split('.')[1]));

//      return payload.exp > Date.now() / 1000;
//    } else {
//      return false;
//    }
//  };

//  auth.currentUser = function(){
//    if(auth.isLoggedIn()){
//      var token = auth.getToken();
//      var payload = JSON.parse($window.atob(token.split('.')[1]));

//      return payload.username;
//    }
//  };

//  auth.register = function(user){
//    return $http.post('/register', user).success(function(data){
//      auth.saveToken(data.token);
//    });
//  };

//  auth.logIn = function(user){
//    return $http.post('/login', user).success(function(data){
//      auth.saveToken(data.token);
//    });
//  };

//  auth.logOut = function(){
//    $window.localStorage.removeItem('flapper-news-token');
//  };

//  return auth;
//}]);

app.factory('Resources', ['$resource', function ($resource) {
  return {
      Orders: $resource('/api/movingOrders/:id')
  };
}]);
