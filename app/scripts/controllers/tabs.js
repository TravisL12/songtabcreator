'use strict';

/**
 * @ngdoc function
 * @name songtabcreatorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the songtabcreatorApp
 */
angular.module('songtabcreatorApp')
  .controller('TabCtrl', function ($scope, Chords) {
    $scope.Chords = Chords;
    $scope.columnCount = 110;
    $scope.cells = {};
    $scope.buildArray = function(num) {
      var a = new Array(num);
      for(var i=1; i<=a.length; i++){ 
        a[i-1] = i;
      }
      return a;
    };
  });
