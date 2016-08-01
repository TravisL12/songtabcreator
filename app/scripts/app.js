'use strict';

/**
 * @ngdoc overview
 * @name songtabcreatorApp
 * @description
 * # songtabcreatorApp
 *
 * Main module of the application.
 */
angular
  .module('songtabcreatorApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ]).constant('Strings', {strings: ['chords','e','b','g','d','a','E']})
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/tabs.html',
        controller: 'TabCtrl'
      })
      .when('/chord_dictionary', {
        templateUrl: 'views/chord_dictionary.html',
        controller: 'ChordDictionaryCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
