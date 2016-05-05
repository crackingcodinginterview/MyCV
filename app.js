/**
 * Created by Administrator on 25/04/2016.
 */
var App = angular.module('myApp', []);
App.controller('myCtrl', function($scope, $http) {
    $http.get('data.json')
        .then(function(res){
            $scope.data = res.data;
        });

    $scope.years = [2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016];
    $scope.show_more_info=false;
    $scope.current_index=-1;
    $scope.form_info={
        "form0" : {"show" : false, "properties" : {"myimage":""}, "first-time" : "true"},
        "form1" : {"show" : false, "properties" : {"name":""}, "first-time" : "true"},
        "form2" : {"show" : false, "properties" : {"headline":""}, "first-time" : "true"},
        "form3" : {"show" : false, "properties" : {"country":"","postalcode":"","industry":""}, "first-time" : "true"},
        "form4" : {"show" : false, "properties" : {"email":""}, "first-time" : "true"},
        "form5" : {"show" : false, "properties" : {"im":""}, "first-time" : "true"},
        "form6" : {"show" : false, "properties" : {"phone":""}, "first-time" : "true"},
        "form7" : {"show" : false, "properties" : {"address":""}, "first-time" : "true"},
        "form8" : {"show" : false, "properties" : {"twitter":""}, "first-time" : "true"},
        "form9" : {"show" : false, "properties" : {"wechat":""}, "first-time" : "true"},
        "form10" : {"show" : false, "properties" : {"website":""}, "first-time" : "true"},
        "form11" : {"show" : false, "properties" : {"summary":""}, "first-time" : "true"},
        "form12" : {"show" : false, "properties" : {"company-name":"","title":"","location":"","start-year":"","end-year":"","imageurl":"","description":""}, "first-time" : "true"},
        "form13" : {"show" : false, "properties" : {"school":"","start-year":"","end-year":"","degree":"","field":""}, "first-time" : "true"},
        "form14" : {"show" : false, "properties" : {"name":"","occupation":"","year":"","imageurl":"","description":""}, "first-time" : "true"},
        "form15" : {"show" : false, "properties" : {"name":""}, "first-time" : "true"},
    };

    $scope.open_form=function(form_name){
        $scope.form_info[form_name]["show"] = true;
    };

    $scope.close_form=function(form_name){
        $scope.form_info[form_name]["show"] = false;
    };

    $scope.edit=function(form_name,element,index){
        $scope.current_index = index;
        $scope.open_form(form_name);
        if(typeof element === "undefined"){
            if($scope.form_info[form_name]["first-time"]){
                for(var property in $scope.form_info[form_name]["properties"])
                    $scope.form_info[form_name]["properties"][property] = $scope.data[property];
                $scope.form_info[form_name]["first-time"]=false;
            }
        }
        else{
            if(index > $scope.data[element].length-1) {
                for(var property in $scope.form_info[form_name]["properties"])
                    $scope.form_info[form_name]["properties"][property] = "";
                return;
            }
            for(var property in $scope.form_info[form_name]["properties"])
                $scope.form_info[form_name]["properties"][property] = $scope.data[element][index][property];
        }
    };

    $scope.save = function(form_name,element){
        $scope.close_form(form_name);
        if(typeof element === "undefined") {
            for (var property in $scope.form_info[form_name]["properties"])
                $scope.data[property] = $scope.form_info[form_name]["properties"][property];
        }
        else{
            if($scope.current_index > $scope.data[element].length-1){
                var newobj = {};
                for(var property in $scope.form_info[form_name]["properties"])
                    newobj[property] = $scope.form_info[form_name]["properties"][property];
                newobj["id"] = $scope.current_index;
                $scope.data[element].push(newobj);
                return;
            }
            for(var property in $scope.form_info[form_name]["properties"])
                $scope.data[element][$scope.current_index][property] = $scope.form_info[form_name]["properties"][property];
        }
    };

    $scope.cancel = function(form_name){
        $scope.close_form(form_name);
    };

    $scope.delete = function(form_name,element){
        $scope.close_form(form_name);
        if($scope.current_index < $scope.data[element].length)
            $scope.data[element].splice($scope.current_index, 1);
    }
});