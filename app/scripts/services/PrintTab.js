'use strict';

angular.module('songtabcreatorApp').factory('PrintTab', function (CurrentTab) {

    var strings = ['chords','e','b','g','d','a','E'];

    return function () {
        var output = [];
        angular.forEach(CurrentTab.tablature, function(row) {
            for (var i in strings) {
                var stringOutput = [],
                    blank = strings[i] === 'chords' ? ' ' : '-';

                for (var j = 1; j < CurrentTab.options.columnCount; j++) {
                    var cell = row.cells[strings[i] + '-' + j] || blank;
                    stringOutput.push(cell);
                }
                output.push(stringOutput.join(''));
            }
            output.push(row.lyrics);  
        });
        output = output.join('\r\n');

        var downloadLink  = document.createElement('a');
        var downloadBlob  = new Blob([output], {type: 'text/plain'});
        downloadLink.href = window.URL.createObjectURL(downloadBlob);
        downloadLink.download = CurrentTab.options.title + '.txt';
        document.body.appendChild(downloadLink);
        downloadLink.click();
    };

});
