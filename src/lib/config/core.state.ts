import { UrlService } from '@uirouter/angularjs';

export function state(
  $urlServiceProvider: UrlService
) {
  // Default to home state
  $urlServiceProvider.rules.otherwise('/');
}

state.$inject = ['$urlServiceProvider'];
