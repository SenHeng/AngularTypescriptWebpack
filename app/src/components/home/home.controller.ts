export default class HomeController {
  public name;

  constructor() {
    this.name = 'Homeasdf';

    // Just to show that _ works.
    console.log('_.first([1,2,3]): ', _.first([1, 2, 3]));
  }

  public changeName() {
    this.name = 'Universe';
  }
}
