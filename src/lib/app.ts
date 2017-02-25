// Angular and related libraries
import * as angular from 'angular';
import 'angular-ui-router';

// Configurate Angular
angular
  .module('app', [
    'ui.router'
  ])
  ;

// Bootstrap angular
angular.bootstrap(document, ['app'], { strictDi: true });
