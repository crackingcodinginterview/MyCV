/**
 * Created by Administrator on 25/04/2016.
 */
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
    $scope.show=false;
    $scope.showedit=function(){
      setTimeout(function(){
          $scope.show=true;
      },1000);
    };
    $scope.cancel=function(){

    };
});