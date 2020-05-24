import Pgn from 'utils/Pgn.js';

describe('PAWN valid', () => {

  it('d4', () => {
    let re = new RegExp(Pgn.move.PAWN);
    expect(re.test('d4')).toEqual(true);
  });

  it('d4+', () => {
    let re = new RegExp(Pgn.move.PAWN);
    expect(re.test('d4+')).toEqual(true);
  });

});

describe('PAWN_CAPTURES valid', () => {

  it('exd4', () => {
    let re = new RegExp(Pgn.move.PAWN_CAPTURES);
    expect(re.test('exd4')).toEqual(true);
  });

  it('exd4+', () => {
    let re = new RegExp(Pgn.move.PAWN_CAPTURES);
    expect(re.test('exd4+')).toEqual(true);
  });

});

describe('PAWN invalid', () => {

  it('foo', () => {
    let re = new RegExp(Pgn.move.PAWN);
    expect(re.test('foo')).toEqual(false);
  });

  it('bar', () => {
    let re = new RegExp(Pgn.move.PAWN);
    expect(re.test('bar')).toEqual(false);
  });

  it('d9', () => {
    let re = new RegExp(Pgn.move.PAWN);
    expect(re.test('d9')).toEqual(false);
  });

  it('i5', () => {
    let re = new RegExp(Pgn.move.PAWN_CAPTURES);
    expect(re.test('i5')).toEqual(false);
  });

});

describe('PAWN_CAPTURES invalid', () => {

  it('foo', () => {
    let re = new RegExp(Pgn.move.PAWN);
    expect(re.test('foo')).toEqual(false);
  });

  it('bar', () => {
    let re = new RegExp(Pgn.move.PAWN);
    expect(re.test('bar')).toEqual(false);
  });

  it('exi1', () => {
    let re = new RegExp(Pgn.move.PAWN_CAPTURES);
    expect(re.test('exi1')).toEqual(false);
  });

  it('nxd4', () => {
    let re = new RegExp(Pgn.move.PAWN_CAPTURES);
    expect(re.test('nxd4')).toEqual(false);
  });

});
