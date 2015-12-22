'use strict';

angular.module('songtabcreatorApp')
  .controller('ChordDictionaryCtrl', function ($scope, Chords) {
    $scope.Chords = Chords;

    $scope.splitChord = function(chord) {
      return chord.join('-');
    };

  });