import { StateProvider } from '@uirouter/angularjs';

export function router(
  $stateProvider: StateProvider
) {
  $stateProvider.state('downtown', {
    url: '/downtown',
    component: 'downtownComponent',
  });
}

router.$inject = ['$stateProvider'];
