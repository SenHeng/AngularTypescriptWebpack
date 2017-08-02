import { UrlService } from '@uirouter/angularjs';

export function state(
  $urlServiceProvider: UrlService
) {
  // Default to login state
  $urlServiceProvider.rules.otherwise('/');
}

state.$inject = ['$urlServiceProvider'];
