import { HomeController } from './home.controller';
export class HomeComponent implements ng.IComponentOptions {
  bindings: any;
  controller: any;
  template: string;

  constructor() {
    this.bindings = {
      hello: '<'
    };

    this.controller = HomeController;
    this.template = require('./index.html');
  }
}
