import Ascii from 'utils/Ascii.js';
import Pgn from 'utils/Pgn.js';

describe('toFen()', () => {
  it('is a starting position', () => {
    const board = [
      [ ' r ', ' n ', ' b ', ' q ', ' k ', ' b ', ' n ', ' r ' ],
      [ ' p ', ' p ', ' p ', ' p ', ' p ', ' p ', ' p ', ' p ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' P ', ' P ', ' P ', ' P ', ' P ', ' P ', ' P ', ' P ' ],
      [ ' R ', ' N ', ' B ', ' Q ', ' K ', ' B ', ' N ', ' R ' ]
    ];
    expect(Ascii.toFen(board)).toBe('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
  });
  it('is pseudo-castling short', () => {
    const board = [
      [ ' r ', ' . ', ' b ', ' q ', ' k ', ' . ', ' n ', ' r ' ],
      [ ' p ', ' p ', ' p ', ' p ', ' b ', ' p ', ' p ', ' p ' ],
      [ ' . ', ' . ', ' n ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' p ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' P ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' N ', ' . ', ' . ' ],
      [ ' P ', ' P ', ' P ', ' P ', ' B ', ' P ', ' P ', ' P ' ],
      [ ' R ', ' N ', ' B ', ' Q ', ' . ', ' . ', ' K ', ' R ' ]
    ];
    expect(Ascii.toFen(board)).toBe('r1bqk1nr/ppppbppp/2n5/4p3/4P3/5N2/PPPPBPPP/RNBQ2KR');
  });
  it('is castling short', () => {
    const board = [
      [ ' r ', ' . ', ' b ', ' q ', ' k ', ' . ', ' n ', ' r ' ],
      [ ' p ', ' p ', ' p ', ' p ', ' b ', ' p ', ' p ', ' p ' ],
      [ ' . ', ' . ', ' n ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' p ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' P ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' N ', ' . ', ' . ' ],
      [ ' P ', ' P ', ' P ', ' P ', ' B ', ' P ', ' P ', ' P ' ],
      [ ' R ', ' N ', ' B ', ' Q ', ' . ', ' R ', ' K ', ' . ' ]
    ];
    expect(Ascii.toFen(board)).toBe('r1bqk1nr/ppppbppp/2n5/4p3/4P3/5N2/PPPPBPPP/RNBQ1RK1');
  });
});

describe('flip()', () => {
  it('is a starting position for White', () => {
    const board = [
      [ ' r ', ' n ', ' b ', ' q ', ' k ', ' b ', ' n ', ' r ' ],
      [ ' p ', ' p ', ' p ', ' p ', ' p ', ' p ', ' p ', ' p ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' P ', ' P ', ' P ', ' P ', ' P ', ' P ', ' P ', ' P ' ],
      [ ' R ', ' N ', ' B ', ' Q ', ' K ', ' B ', ' N ', ' R ' ]
    ];
    const expected = board;
    expect(Ascii.flip(Pgn.symbol.WHITE, board)).toEqual(expected);
  });
  it('is a starting position for Black', () => {
    const board = [
      [ ' r ', ' n ', ' b ', ' q ', ' k ', ' b ', ' n ', ' r ' ],
      [ ' p ', ' p ', ' p ', ' p ', ' p ', ' p ', ' p ', ' p ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' P ', ' P ', ' P ', ' P ', ' P ', ' P ', ' P ', ' P ' ],
      [ ' R ', ' N ', ' B ', ' Q ', ' K ', ' B ', ' N ', ' R ' ]
    ];
    const expected = [
      [ ' R ', ' N ', ' B ', ' K ', ' Q ', ' B ', ' N ', ' R ' ],
      [ ' P ', ' P ', ' P ', ' P ', ' P ', ' P ', ' P ', ' P ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' p ', ' p ', ' p ', ' p ', ' p ', ' p ', ' p ', ' p ' ],
      [ ' r ', ' n ', ' b ', ' k ', ' q ', ' b ', ' n ', ' r ' ]
    ];
    expect(Ascii.flip(Pgn.symbol.BLACK, board)).toEqual(expected);
  });
  it('it is the Sicilian Defense for White', () => {
    const board = [
      [ ' r ', ' n ', ' b ', ' q ', ' k ', ' b ', ' n ', ' r ' ],
      [ ' p ', ' p ', ' . ', ' p ', ' p ', ' p ', ' p ', ' p ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' p ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' P ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' P ', ' P ', ' P ', ' P ', ' . ', ' P ', ' P ', ' P ' ],
      [ ' R ', ' N ', ' B ', ' Q ', ' K ', ' B ', ' N ', ' R ' ]
    ];
    const expected = board;
    expect(Ascii.flip(Pgn.symbol.WHITE, board)).toEqual(expected);
  });
  it('it is the Sicilian Defense for Black', () => {
    const board = [
      [ ' r ', ' n ', ' b ', ' q ', ' k ', ' b ', ' n ', ' r ' ],
      [ ' p ', ' p ', ' . ', ' p ', ' p ', ' p ', ' p ', ' p ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' p ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' P ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' P ', ' P ', ' P ', ' P ', ' . ', ' P ', ' P ', ' P ' ],
      [ ' R ', ' N ', ' B ', ' Q ', ' K ', ' B ', ' N ', ' R ' ]
    ];
    const expected = [
      [ ' R ', ' N ', ' B ', ' K ', ' Q ', ' B ', ' N ', ' R ' ],
      [ ' P ', ' P ', ' P ', ' . ', ' P ', ' P ', ' P ', ' P ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' P ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' p ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' p ', ' p ', ' p ', ' p ', ' p ', ' . ', ' p ', ' p ' ],
      [ ' r ', ' n ', ' b ', ' k ', ' q ', ' b ', ' n ', ' r ' ]
    ];
    expect(Ascii.flip(Pgn.symbol.BLACK, board)).toEqual(expected);
  });
});

describe('toAscii()', () => {
  it('is a starting position', () => {
    const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
    const expected = [
      [ ' r ', ' n ', ' b ', ' q ', ' k ', ' b ', ' n ', ' r ' ],
      [ ' p ', ' p ', ' p ', ' p ', ' p ', ' p ', ' p ', ' p ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' P ', ' P ', ' P ', ' P ', ' P ', ' P ', ' P ', ' P ' ],
      [ ' R ', ' N ', ' B ', ' Q ', ' K ', ' B ', ' N ', ' R ' ]
    ];
    expect(Ascii.toAscii(fen)).toEqual(expected);
  });
  it('is 1.e4 e5', () => {
    const fen = 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR';
    const expected = [
      [ ' r ', ' n ', ' b ', ' q ', ' k ', ' b ', ' n ', ' r ' ],
      [ ' p ', ' p ', ' p ', ' p ', ' . ', ' p ', ' p ', ' p ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' p ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' P ', ' . ', ' . ', ' . ' ],
      [ ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ', ' . ' ],
      [ ' P ', ' P ', ' P ', ' P ', ' . ', ' P ', ' P ', ' P ' ],
      [ ' R ', ' N ', ' B ', ' Q ', ' K ', ' B ', ' N ', ' R ' ]
    ];
    expect(Ascii.toAscii(fen)).toEqual(expected);
  });
});
