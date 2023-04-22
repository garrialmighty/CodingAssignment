import {shuffle} from '../shuffle';

describe('shuffle', () => {
  it('shuffles an array', () => {
    const inputArray = [0, 1, 2, 3, 4];
    const shuffledArray = shuffle([...inputArray]);
    expect(shuffledArray).not.toEqual(inputArray);
  });
});
