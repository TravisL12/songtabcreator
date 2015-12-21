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
    $scope.tabRows = [
      { cells: {}, lyrics: 'Lyrics go here!' }
    ];

    function updateEditRow(index) {
      $scope.editRow = $scope.tabRows[index];      
    }
    updateEditRow(0);

    $scope.activeEditRow = function() {
      updateEditRow(this.$index);
    };

    $scope.addTabRow = function() {
      $scope.tabRows.push({ cells: {}, lyrics: 'Lyrics go here!' });
      updateEditRow($scope.tabRows.length - 1);
    };

    $scope.highlightView = function(color) {
      var view = angular.element.find('.tab-view .active-row ul.chord')[this.column-1];
      view.style.background = color;
    };

    $scope.lookupChord = function() {
      // Capitalize the first letter of the chord
      $scope.editRow.cells['chords'+this.column] = $scope.editRow.cells['chords'+this.column][0].toUpperCase() + $scope.editRow.cells['chords'+this.column].slice(1);
      var matchedChord = Chords[$scope.editRow.cells['chords'+this.column]];
      if (matchedChord !== undefined) {
        $scope.editRow.cells['e'+this.column] = matchedChord[5];
        $scope.editRow.cells['b'+this.column] = matchedChord[4];
        $scope.editRow.cells['g'+this.column] = matchedChord[3];
        $scope.editRow.cells['d'+this.column] = matchedChord[2];
        $scope.editRow.cells['a'+this.column] = matchedChord[1];
        $scope.editRow.cells['E'+this.column] = matchedChord[0];
      }
    };

    $scope.buildArray = function(num) {
      var a = new Array(num);
      for(var i=1; i<=a.length; i++){ 
        a[i-1] = i;
      }
      return a;
    };
  });
