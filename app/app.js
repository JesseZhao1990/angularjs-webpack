let app = angular.module("app", []);
app.controller("HelloCtrl", function($scope) {
    $scope.text = "Hello AngularJS!";
});

export default app;