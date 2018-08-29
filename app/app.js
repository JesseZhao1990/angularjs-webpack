let app = angular.module("app", []);
app.controller("HelloCtrl", function($scope) {
    $scope.text = "Hello AngularJS!!!!";
});

angular.bootstrap(document, ['app']);

export default app;