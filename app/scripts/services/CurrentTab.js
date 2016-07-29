'use strict';

angular.module('songtabcreatorApp').factory('CurrentTab', function () {
    return {
        tablature: [
            { cells: {}, lyrics: '' }
        ],
        options: {
            columnCount: 110,
            title: 'My New Song',
            tab: 4,
            measure: 4
        }
    };
});
