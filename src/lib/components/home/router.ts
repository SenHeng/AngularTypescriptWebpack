import { StateProvider } from 'angular-ui-router';
import { HelloService } from '../../services/hello.service';

export function router(
  $stateProvider: StateProvider
) {
  $stateProvider.state('home', {
    url: '/home',
    component: 'homeComponent',
    resolve: {
      hello: (HelloService) => {
        HelloService.get()
          .then(res => res);
      }
    }
  });
}

router.$inject = ['$stateProvider'];
