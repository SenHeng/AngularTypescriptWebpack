import { StateProvider } from '@uirouter/angularjs';
import { HelloService } from '../../services/hello.service';

export function router(
  $stateProvider: StateProvider
) {
  $stateProvider.state('home', {
    url: '/',
    component: 'homeComponent',
    resolve: {
      hello: ['HelloService', (HelloService) => HelloService.get().then(res => res)]
    }
  });
}

router.$inject = ['$stateProvider'];
