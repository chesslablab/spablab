import Ascii from 'utils/Ascii.js';

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
