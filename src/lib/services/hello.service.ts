export class HelloService {
  constructor(
    private $http: ng.IHttpService,
    private $log: ng.ILogService
  ) {}

  get() {
    return this.$http.get('')
      .then(res => 'Hello World')
      .catch(err => err);
  }
}

HelloService.$inject = ['$http', '$log'];
