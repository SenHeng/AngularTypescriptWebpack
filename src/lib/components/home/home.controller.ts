export class HomeController {
  hello: string;

  $onInit() {
    console.log('Home Controller Initiated.', this.hello);
  }

  public change() {
    this.hello = 'Goodbye World';
  }
}
