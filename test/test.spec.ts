import { assert } from 'chai';

const foo = 'bar';
const beverages = {tea: [
  'chai',
  'matcha',
  'oolong',
]};

describe('Chai', () => {
  describe('assert', () => {
    it('should return true', () => {
      assert.typeOf(foo, 'string');
    });
    it('should return string', () => {
      assert.typeOf(foo, 'string', 'foo is a string');
    });
    it('should return true', () => {
      assert.equal(foo, 'bar', 'foo equal `bar`');
    });
    it('should return true', () => {
      assert.lengthOf(foo, 3, 'foo`s value has a length of 3');
    });
    it('should return 3', () => {
      assert.lengthOf(beverages.tea, 3, 'beverages has 3 types of tea');
    });
  });
});
