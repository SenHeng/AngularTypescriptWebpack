declare function require(name: string);
import HomeController from './home.controller';

export let HomeModule = angular.module('app.home', [])
  .directive('appHome', () => {
    return {
      template: require('./home.html'),
      controllerAs: 'ctrl',
      controller: HomeController
    };
  })
  .config(($stateProvider: any) => {
    $stateProvider
      .state('home', {
        url: '/',
        template: '<app-home></app-home>'
      });
  })
  ;
