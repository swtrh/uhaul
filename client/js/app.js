var app = angular.module('uhaul', ['ui.router', 'ui.bootstrap','ngResource']);

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
        orderPromise: ['Resources', function(Resources){
          return Resources.Orders.query();
        }]
      }
    })
    .state('orders', {
      url: '/orders/{id}',
      templateUrl: '/order.html',
      controller: 'OrdersCtrl',
      resolve: {
        order: ['$stateParams', 'Resources', function($stateParams, Resources) {
          return Resources.Orders.get($stateParams.id);
        }]
      }
    })
    .state('new-order', {
      url: '/new-order',
      templateUrl: '/new-order.html',
      controller: 'OrdersCtrl'
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

app.controller('MainCtrl', [ '$scope', 'Resources', function ($scope, Resources) {
    var getAllOrders = function () {
      Resources.Orders.query().$promise.then(function (result) {
        $scope.orders = result;
      });
    };

    getAllOrders();

    $scope.deleteOrder = function (order) {
      console.log("In deleteOrder function", order);
      //if (popupService.showPopup('Really delete this?')) {
        Resources.Orders.delete({ id: order._id }).$promise.then(function (result) {
          getAllOrders();
        });
      //}
    };

}]);

function resetOrderVariables (order) {
  if (! typeof order ===  "object") { return order };
  order.date = new Date();
  order.type = "single";
  order.mover = {
    name: '',
    organization: ''
  };
  order.location = {};
  order.from = {};
  order.to = {};
}

app.controller('OrdersCtrl', [ '$scope', 'Resources', function ($scope, Resources) {
    resetOrderVariables($scope);

    Resources.Locations.query().$promise.then(function (result) {
      console.log("Populating locations", result);
      $scope.sites = result;
      $scope.siteCodes = [];
      result.map(function (loc) {
          loc.sites.forEach(function (siteCode) {
            $scope.siteCodes.push(siteCode);
          });
      });
    });

    $scope.addOrder = function () {
      var newOrder = new Resources.Orders({
        registeredBy: 'Anonymous',
        date: $scope.date,
        type: $scope.type,
        location: $scope.location,
        mover: $scope.mover,
        from: $scope.from,
        to: $scope.to
      });
      if ($scope.type === "Single") {
        newOrder.single = true;
      }
      newOrder.$save();
      resetOrderVariables($scope);
    };

}]);

app.directive('ngConfirmClick', [
  function(){
    return {
      priority: -1,
      restrict: 'A',
      link: function(scope, element, attrs){
        element.bind('click', function(e){
          var message = attrs.ngConfirmClick;
          if(message && !confirm(message)){
            e.stopImmediatePropagation();
            e.preventDefault();
          }
        });
      }
    }
  }
]);

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
      Orders: $resource('/api/relocationRequest/:id'),
      Locations: $resource('/api/location/:id')
  };
}]);
