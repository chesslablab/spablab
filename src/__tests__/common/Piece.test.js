import Piece from 'common/Piece.js';
import Pgn from 'common/Pgn.js';

describe('color()', () => {
  it('r is b', () => {
    expect(Piece.color(' r ')).toBe(Pgn.symbol.BLACK);
  });
  it('n is b', () => {
    expect(Piece.color(' n ')).toBe(Pgn.symbol.BLACK);
  });
  it('R is w', () => {
    expect(Piece.color(' R ')).toBe(Pgn.symbol.WHITE);
  });
  it('N is w', () => {
    expect(Piece.color(' N ')).toBe(Pgn.symbol.WHITE);
  });
});
