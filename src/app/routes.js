angular.module('app')
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ( $stateProvider, $urlRouterProvider, $locationProvider ) {
  
  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('map', {
      url: '/',
      controller:'MapController',
      templateUrl: 'views/map.html',
      data: {
        pageTitle:'Map'
      }
  });

}]);