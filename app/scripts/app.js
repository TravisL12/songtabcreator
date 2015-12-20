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
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/tabs.html',
        controller: 'TabCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
