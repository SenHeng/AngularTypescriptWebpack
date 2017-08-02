// Angular and related libraries
import * as angular from 'angular';
import '@uirouter/angularjs';

// App modules
import { config } from './config/core.config';
import { run } from './config/core.run';
import { state } from './config/core.state';
import './config/app.assets';
import './components';
import './services';

// Configurate Angular
angular
  .module('app', [
    // modules
    'app.services',
    'app.components',

    // libraries and plugins
    'ui.router'
  ])
  .config(config)
  .config(state)
  .run(run)
  ;

// Bootstrap angular
angular.bootstrap(document, ['app'], { strictDi: true });
