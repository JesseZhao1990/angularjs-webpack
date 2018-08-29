// import angular from 'angular';
import 'angular';
import 'angular-route';

import './views/view1/view1.js';
import './views/view2/view2.js';

let app = angular.module('app', [
  'ngRoute',
  'app.view1',
  'app.view2'
])

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}]);


app.controller("HelloCtrl", function($scope) {
    $scope.text = "Hello AngularJS!!!!";
});

angular.bootstrap(document, ['app']);

export default app;