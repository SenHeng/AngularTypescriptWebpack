import * as angular from 'angular';
import { HomeController } from './home.controller';
import { HomeComponent } from './home.component';
import { router } from './router';

angular.module('component.home', [
  'ui.router'
])
  .config(router)
  .component('homeComponent', new HomeComponent)
  .controller('homeController', HomeController)
  ;
