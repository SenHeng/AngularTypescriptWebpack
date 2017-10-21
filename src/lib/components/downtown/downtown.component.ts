import { DowntownController } from './downtown.controller';
export class DowntownComponent implements ng.IComponentOptions {
  bindings: any;
  controller: any;
  template: string;

  constructor() {
    this.bindings = {};
    this.controller = DowntownController;
    this.template = require('./index.html');
  }
}
