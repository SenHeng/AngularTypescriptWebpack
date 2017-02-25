/// <reference path="../../typings/tsd.d.ts" />

import './app.assets';
import {HomeModule} from './components/home';

angular
  .module('app', [
    'ui.router',
    HomeModule.name
  ])
  .config((
      $urlRouterProvider: ng.ui.IUrlRouterProvider
      ) => {
    $urlRouterProvider.otherwise('/');
  })
  ;
