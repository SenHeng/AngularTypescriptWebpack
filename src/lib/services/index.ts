import * as angular from 'angular';

import { HelloService } from './hello.service';

angular.module('app.services', [])
  .service('HelloService', HelloService)
  ;
