export class HomeController {
  hello: string;
  newGreeting: string = '';

  $onInit() {
    console.log('Home Controller Initiated.', this.hello);
  }

  public change() {
    this.hello = this.newGreeting;
  }
}
