'use strict';

angular.module('songtabcreatorApp').factory('PrintTab', function (CurrentTab) {

    var strings = ['chords','e','b','g','d','a','E'];

    return function () {
        var output = [];
        angular.forEach(CurrentTab.tablature, function(row) {
            for (var j in strings) {
                var stringOutput = [];
                var blank = '-';
                if (strings[j] === 'chords') {
                    blank = ' ';
                }
                for (var i = 1; i < CurrentTab.options.columnCount; i++) {
                    var cell = row.cells[strings[j] + '-' + i] || blank;
                    stringOutput.push(cell);
                }
                output.push(stringOutput.join(''));
            }
            output.push(row.lyrics);  
        });
        output = output.join('\r\n');

        var a = document.createElement('a');
        document.body.appendChild(a);
        var blob = new Blob([output], {type: 'text/plain'});
        a.href = window.URL.createObjectURL(blob);
        a.download = CurrentTab.options.title + '.txt';
        a.click();
    };
});
