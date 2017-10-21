export class DowntownController implements ng.IComponentController {
  total: number;
  newNumber: number;
  numbers: number[];

  $onInit() {
    console.log('Downtown Initiated.');
    this.newNumber = undefined;
    this.numbers = [1, 2, 3];
    this.calcTotal(this.numbers);
  }

  add(): void {
    if (typeof this.newNumber !== 'number') {
      alert('Please input a number!');
    }
    this.numbers.push(this.newNumber);
    this.calcTotal(this.numbers);
  }

  calcTotal(numbers: number[]): void {
    this.total = numbers.reduce((a: number, b: number) => a += b);
  }
}
