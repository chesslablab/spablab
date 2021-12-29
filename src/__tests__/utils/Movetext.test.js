import Movetext from 'utils/Movetext.js';

describe('toRows()', () => {
  it('is 1.e4', () => {
    const string = '1.e4';
    const expected = [
      {
        w: 'e4',
        b: '',
      }
    ];
    expect(Movetext.toRows(string)).toEqual(expected);
  });
  it('is 1.e4 e5', () => {
    const string = '1.e4 e5';
    const expected = [
      {
        w: 'e4',
        b: 'e5',
      }
    ];
    expect(Movetext.toRows(string)).toEqual(expected);
  });
});
