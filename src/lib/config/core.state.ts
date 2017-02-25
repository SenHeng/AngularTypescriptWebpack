import { UrlService } from 'angular-ui-router';

export function state(
  $urlServiceProvider: UrlService
) {
  // Default to login state
  $urlServiceProvider.rules.otherwise('/');
}

state.$inject = ['$urlServiceProvider'];
