'use strict';

/**
 * @ngdoc overview
 * @name homealoneApp
 * @description
 * # homealoneApp
 *<script src="bower_components/angular-ui-router/release/angular-ui-router.js"></script>
    <script src="bower_components/angular-bootstrap/ui-bootstrap-tpls.js"></script>
 * Main module of the application.
 */
angular
  .module('payUApp', ['ngAnimate','ngCookies','ui.router','ngResource',
    'ui.bootstrap','ngRoute','ngSanitize','ngTouch','kendo.directives'
  ]).config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');

    $stateProvider 
        .state('/', {
            url: '/',
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardCtrl'
        })
        // .state('home', {
        //     url: '/home/?location',
        //     templateUrl: 'views/home.html',
        //     controller: 'HomeCtrl'
        // }) 
    // $routeProvider
    //   .when('/', {
    //     templateUrl: 'views/main.html',
    //     controller: 'MainCtrl'
    //   })
    //   .when('/about', {
    //     templateUrl: 'views/about.html',
    //     controller: 'AboutCtrl'
    //   })
    //   .otherwise({
    //     redirectTo: '/'
    //   });
  });
