/// <reference path="../../typings/tsd.d.ts" />

import './app.assets';
import {HomeModule} from './components/home';

angular
  .module('app', [
    'ui.router',
    HomeModule.name
  ])
  .config((
      $urlRouterProvider: ng.ui.IUrlRouterProvider,
      $locationProvider: ng.ILocationProvider) => {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('home');
  })
  ;
