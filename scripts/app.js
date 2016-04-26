/**
 * Created by Administrator on 25/04/2016.
 */
var app = angular.module('myApp', []);
app.filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);
app.controller('myCtrl', function($scope, $http) {
    $scope.showmore=false;
    $http({
        method : "GET",
        url : "data.json"
    }).then(function mySucces(response) {
        $scope.data = response.data;
    }, function myError(response) {
        $scope.data = response.statusText;
    });
});