'use strict';

angular.module('songtabcreatorApp')
  .controller('ChordDictionaryCtrl', function ($scope, ChordDictionary) {
    $scope.Chords = ChordDictionary;

    $scope.splitChord = function(chord) {
      return chord.join('-');
    };

  });
