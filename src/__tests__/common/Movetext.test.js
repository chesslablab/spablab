import Movetext from 'common/Movetext.js';

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
  it('is 1.e4 e5 2.Nf3', () => {
    const string = '1.e4 e5 2.Nf3';
    const expected = [
      {
        w: 'e4',
        b: 'e5',
      },
      {
        w: 'Nf3',
        b: '',
      }
    ];
    expect(Movetext.toRows(string)).toEqual(expected);
  });
  it('is 1.e4 e5 2.Nf3 Nc6', () => {
    const string = '1.e4 e5 2.Nf3 Nc6';
    const expected = [
      {
        w: 'e4',
        b: 'e5',
      },
      {
        w: 'Nf3',
        b: 'Nc6',
      }
    ];
    expect(Movetext.toRows(string)).toEqual(expected);
  });
});

describe('substring()', () => {
  it('is 1.e4', () => {
    const string = '1.e4 d5 2.exd5 Qxd5 3.Nc3 Qa5 4.d4 e5 5.dxe5 Nc6 6.Nf3 Bb4 7.Bd2';
    const expected = '1.e4';
    expect(Movetext.substring(string, -12)).toEqual(expected);
  });
  it('is 1.e4 d5', () => {
    const string = '1.e4 d5 2.exd5 Qxd5 3.Nc3 Qa5 4.d4 e5 5.dxe5 Nc6 6.Nf3 Bb4 7.Bd2';
    const expected = '1.e4 d5';
    expect(Movetext.substring(string, -11)).toEqual(expected);
  });
  it('is 1.e4 d5 2.exd5', () => {
    const string = '1.e4 d5 2.exd5 Qxd5 3.Nc3 Qa5 4.d4 e5 5.dxe5 Nc6 6.Nf3 Bb4 7.Bd2';
    const expected = '1.e4 d5 2.exd5';
    expect(Movetext.substring(string, -10)).toEqual(expected);
  });
});
