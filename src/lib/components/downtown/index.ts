import * as angular from 'angular';

import { DowntownComponent } from './downtown.component';
import { router } from './router';

angular.module('component.downtown', [
  'ui.router'
]).config(router)
  .component('downtownComponent', new DowntownComponent())
  ;
